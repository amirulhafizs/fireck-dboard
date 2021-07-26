var admin = require("firebase-admin");
var jwt = require("jsonwebtoken");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION, PUT, DELETE",
};

if (admin.apps.length === 0) {
  const firebaseCredentials = {
    project_id: process.env["firebase_project_id"],
    private_key_id: process.env["firebase_private_key_id"],
    private_key: process.env["firebase_private_key"],
    client_email: process.env["firebase_client_email"],
    client_id: process.env["firebase_client_id"],
    auth_uri: process.env["firebase_auth_uri"],
    token_uri: process.env["firebase_token_uri"],
    auth_provider_x509_cert_url: process.env["firebase_auth_provider_x509_cert_url"],
    client_x509_cert_url: process.env["firebase_client_x509_cert_url"],
  };
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
    storageBucket: `${process.env["firebase_project_id"]}.appspot.com`,
  });
}

const db = admin.firestore();

const doAllow = async (user, collectionName, permission) => {
  let allow = false;
  if (user.role === "super-admin") {
    allow = true;
  } else {
    const res = await db.collection("RolesReservedCollection").where("name", "==", user.role).get();
    const role = res.docs.length ? res.docs[0].data() : null;
    if (role) {
      if (
        role.permissions[collectionName] &&
        role.permissions[collectionName].includes(permission)
      ) {
        allow = true;
      }
    }
  }
  return allow;
};

const getFirst = (collection, where) => {
  return db
    .collection(collection)
    .where(...where)
    .get()
    .then((res) => (res.docs.length ? res.docs[0].data() : null));
};

const findOne = async (user, collectionId, docId) => {
  try {
    const collectionType = await getFirst("CollectionTypesReservedCollection", [
      "id",
      "==",
      collectionId,
    ]);

    if (await doAllow(user, collectionType.docId, "find one")) {
      let snapshot = await db.collection(collectionType.docId).doc(docId).get();
      return snapshot.empty ? null : snapshot.data();
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    console.log(error.toString());
    return { error };
  }
};

const _delete = async (user, collectionId, docId) => {
  try {
    const collectionType = await getFirst("CollectionTypesReservedCollection", [
      "id",
      "==",
      collectionId,
    ]);
    if (await doAllow(user, collectionType.docId, "delete")) {
      const promises = [];

      promises.push(
        db
          .collection("CollectionTypesReserverdCollection")
          .doc(collectionType.docId)
          .update({
            size: admin.firestore.FieldValue.increment(-1),
          })
      );
      promises.push(db.collection(collectionType.docId).doc(docId).delete());
      return Promise.all(promises);
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error };
  }
};

const populateRelationFields = async (relationFields, obj) => {
  const promises = [];
  relationFields.forEach((relField) => {
    if (relField.relationOneToOne) {
      if (obj[relField.id]) {
        promises.push(
          db
            .collection(relField.relatedCollectionTypeDocId)
            .doc(obj[relField.id])
            .get()
            .then((res) => res.data())
        );
      }
    } else {
      const innerPromises = [];
      if (obj[relField.id]) {
        obj[relField.id].forEach((docId) => {
          innerPromises.push(
            db
              .collection(relField.relatedCollectionTypeDocId)
              .doc(docId)
              .get()
              .then((res) => res.data())
          );
        });
      }

      promises.push(Promise.all(innerPromises));
    }
  });
  (await Promise.all(promises)).forEach((data, i) => {
    obj[relationFields[i].id] = data;
  });
  return obj;
};

const find = async (
  user,
  collectionId,
  where,
  orderBy,
  limit,
  startAt,
  startAfter,
  endAt,
  endBefore,
  populateRef
) => {
  try {
    let collectionType = await getFirst("CollectionTypesReservedCollection", [
      "id",
      "==",
      collectionId,
    ]);

    if (await doAllow(user, collectionType.docId, "find")) {
      if (collectionType.single) {
        let relationFields = collectionType.fields.filter((x) => x.type === "relation");

        const data = (
          await db.collection("DocumentsReservedCollection").doc(collectionType.docId).get()
        ).data();

        if (!relationFields.length || !populateRef) {
          return data;
        }

        return await populateRelationFields(relationFields, data);
      }

      let currentRef = db.collection(collectionType.docId);

      const parseIfNumber = (str) => {
        return typeof str == "string" && !isNaN(str) && !isNaN(parseFloat(str)) ? Number(str) : str;
      };

      where.forEach((x) => {
        let [arg1, arg2, ...rest] = x;
        let arg3 =
          rest.length > 1 || ["not in", "in", "array-contains-any"].includes(arg2)
            ? rest.map((x) => parseIfNumber(x))
            : parseIfNumber(rest[0]);

        currentRef = currentRef.where(arg1, arg2, arg3);
      });

      orderBy.forEach((x) => {
        currentRef = currentRef.orderBy(...x);
      });

      if (startAt) {
        currentRef = currentRef.startAt(parseIfNumber(startAt));
      }

      if (startAfter) {
        currentRef = currentRef.startAfter(parseIfNumber(startAfter));
      }

      if (endAt) {
        currentRef = currentRef.endAt(parseIfNumber(endAt));
      }

      if (endBefore) {
        currentRef = currentRef.endBefore(parseIfNumber(endBefore));
      }

      currentRef = currentRef.limit(limit);

      const snapshot = await currentRef.get();

      if (snapshot.empty) {
        return [];
      }

      let relationFields = collectionType.fields.filter((x) => x.type === "relation");

      if (relationFields.length && populateRef) {
        const results = [];
        for (const doc of snapshot.docs) {
          const populatedData = await populateRelationFields(relationFields, doc.data());
          results.push(populatedData);
        }
        return results;
      }
      return snapshot.docs.map((x) => x.data());
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error: error.toString() };
  }
};

const create = async (user, collectionId, data) => {
  try {
    const collectionType = await getFirst("CollectionTypesReservedCollection", [
      "id",
      "==",
      collectionId,
    ]);

    if (await doAllow(user, collectionType.docId, "create")) {
      if (collectionType.single) {
        return db
          .collection("DocumentsReservedCollection")
          .doc(collectionType.docId)
          .set({ ...data, docId: collectionType.docId });
      }

      const docRef = db.collection(collectionType.docId).doc();
      const docId = docRef.id;

      const newDoc = { ...data, docId, created_at: new Date().toJSON() };

      const promises = [];

      promises.push(docRef.set(newDoc));

      promises.push(
        db
          .collection("CollectionTypesReservedCollection")
          .doc(collectionType.docId)
          .update({
            size: admin.firestore.FieldValue.increment(1),
          })
      );

      return Promise.all(promises)
        .then(() => newDoc)
        .catch((error) => ({ error }));
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    console.log(error);
    return { error: error.toString() };
  }
};

const update = async (user, collectionId, docId, data) => {
  try {
    const collectionType = await getFirst("CollectionTypesReservedCollection", [
      "id",
      "==",
      collectionId,
    ]);
    if (await doAllow(user, collectionType.docId, "update")) {
      if (collectionType.single) {
        return db.collection("DocumentsReservedCollection").doc(collectionType.docId).update(data);
      }
      return db.collection(collectionType.docId).doc(docId).update(data);
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error: error.toString() };
  }
};

const handler = async (event) => {
  try {
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;
    const paths = event.path.replace("/api/", "").split("/");
    const method = event.httpMethod;
    const body = ["POST", "PUT"].includes(method) ? JSON.parse(event.body) : null;
    let response;

    const user = token ? jwt.verify(token, process.env["APP_SECRET"]) : { role: "public" };
    switch (method) {
      case "GET": {
        const params = event.queryStringParameters;
        const where = params.where ? params.where.split(";").map((x) => x.split(",")) : [];
        const orderBy = params.orderBy ? params.orderBy.split(";").map((x) => x.split(",")) : [];
        const limit = params.limit ? parseInt(params.limit) : 100;
        const populateRef = params.populateRef === "false" ? false : true;

        if (paths.length === 2) {
          response = await findOne(user, paths[0], paths[1]);
        } else {
          response = await find(
            user,
            paths[0],
            where,
            orderBy,
            limit,
            params.startAt,
            params.startAfter,
            params.endAt,
            params.endBefore,
            populateRef
          );
        }
        break;
      }

      case "POST":
        response = await create(user, paths[0], body);
        break;
      case "PUT":
        response = await update(user, paths[0], paths[1], body);
        break;
      case "DELETE":
        response = await _delete(user, paths[0], paths[1]);
        break;
      default:
        break;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response, undefined, 2),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 200, headers, body: { error: error.toString() } };
  }
};

module.exports = { handler };
