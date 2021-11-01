var admin = require("firebase-admin");
var jwt = require("jsonwebtoken");

const collectionName = "CollectionTypesReservedCollection";

if (admin.apps.length === 0) {
  try {
    const credentials = JSON.parse(process.env["FIREBASE_ADMIN_CREDENTIAL"]);
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
      storageBucket: `${credentials["project_id"]}.appspot.com`,
    });
  } catch (error) {
    console.log(error);
  }
}
const db = admin.firestore();

const doAllow = async (user, permission) => {
  let allow = false;
  if (user.role === "super-admin") {
    allow = true;
  } else {
    const res = await db.collection("AdminRoles").where("id", "==", user.role).get();
    const role = res.docs.length ? res.docs[0].data() : null;
    if (role) {
      if (role.manageCollectionTypes.includes(permission)) {
        allow = true;
      }
    }
  }
  return allow;
};

const getCollectionTypes = async (user) => {
  const allow = await doAllow(user, "find");
  if (allow) {
    const snap = await db.collection(collectionName).get();
    const types = snap ? snap.docs.map((x) => x.data()) : [];
    return types;
  } else {
    return { error: "Forbidden" };
  }
};

const createCollectionType = async (user, type) => {
  const allow = await doAllow(user, "create");
  if (allow) {
    const docRef = db.collection(collectionName).doc();

    const roles = (await db.collection("RolesReservedCollection").get()).docs.map((x) => x.data());

    roles.forEach((r) => {
      db.collection("RolesReservedCollection")
        .doc(r.docId)
        .update({
          permissions: {
            ...r.permissions,
            [docRef.id]: r.defaultPermissions,
          },
        });
    });

    let mandatoryFields = [
      type.fields.find((x) => x.id === "createdAt") || {
        id: "createdAt",
        type: "date",
        displayOnTable: true,
        isDefault: true,
      },
      type.fields.find((x) => x.id === "modifiedAt") || {
        id: "modifiedAt",
        type: "date",
        displayOnTable: true,
        isDefault: true,
      },
      type.fields.find((x) => x.id === "docId") || {
        id: "docId",
        type: "string",
        displayOnTable: true,
        isDefault: true,
      },
    ];

    await docRef.set({
      ...type,
      fields: [...type.fields, ...mandatoryFields],
      docId: type.docId || docRef.id,
      size: 0,
    });
    return (await docRef.get()).data();
  } else {
    return { error: "Forbidden" };
  }
};

async function deleteCollection(collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

const deleteCollectionType = async (user, collectionTypeDocId) => {
  try {
    const allow = await doAllow(user, "delete");
    if (allow) {
      const promises = [];
      promises.push(db.collection(collectionName).doc(collectionTypeDocId).delete());
      promises.push(deleteCollection(collectionTypeDocId, 20));
      return Promise.all(promises);
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error };
  }
};

const updateCollectionType = async (user, id, type) => {
  const allow = await doAllow(user, "update");
  if (allow) {
    const docRef = db.collection(collectionName).doc(id);
    await docRef.update(type);
    return (await docRef.get()).data();
  } else {
    return { error: "Forbidden" };
  }
};

const handler = async (event) => {
  try {
    const path = event.path.replace("/private/collectionTypes", "");
    const method = event.httpMethod;
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;

    if (!token) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Forbidden" }),
      };
    } else {
      const user = jwt.verify(token, process.env["APP_SECRET"]);
      let response;
      switch (method) {
        case "GET":
          response = await getCollectionTypes(user);
          break;
        case "POST": {
          const body = JSON.parse(event.body);
          response = await createCollectionType(user, body);
          break;
        }
        case "PUT": {
          const body = JSON.parse(event.body);
          response = await updateCollectionType(user, path.replace("/", ""), body);
          break;
        }
        case "DELETE": {
          response = await deleteCollectionType(user, path.replace("/", ""));
          break;
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    }
  } catch (error) {
    console.log(error.toString());
    return { statusCode: 200, body: { error: error.toString() } };
  }
};

module.exports = { handler };
