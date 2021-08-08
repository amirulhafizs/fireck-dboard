var admin = require("firebase-admin");
var jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

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

const collectionName = "FilesReservedCollection";

const doAllow = async (user, permission) => {
  let allow = false;
  if (user.role === "super-admin") {
    allow = true;
  } else {
    const res = await db.collection("AdminRoles").where("id", "==", user.role).get();
    const role = res.docs.length ? res.docs[0].data() : null;
    if (role) {
      if (role.manageFiles.includes(permission)) {
        allow = true;
      }
    }
  }
  return allow;
};

const getCount = async (user) => {
  try {
    const allow = await doAllow(user, "count");
    if (allow) {
      return db
        .collection(collectionName)
        .doc("metadata")
        .get()
        .then((doc) => doc.data().size);
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error };
  }
};

const find = async (user, where, orderBy, limit, startAt, startAfter) => {
  const allow = await doAllow(user, "find");
  if (allow) {
    let currentRef = db.collection(collectionName);
    where.forEach((x) => {
      currentRef = currentRef.where(...x);
    });
    if (orderBy.length) {
      currentRef = currentRef.orderBy(...orderBy);
    } else {
      currentRef = currentRef.orderBy("uploaded_at", "desc");
    }

    currentRef = currentRef.limit(limit);
    if (startAt !== null) {
      currentRef = currentRef.startAt(startAt);
    }

    if (startAfter !== null) {
      currentRef = currentRef.startAfter(startAfter);
    }
    const snap = await currentRef.get();
    const data = snap ? snap.docs.map((x) => x.data()) : [];
    return data;
  } else {
    return { error: "Forbidden" };
  }
};

const create = async (user, fileDetails) => {
  const allow = await doAllow(user, "create");
  if (allow) {
    const id = v4();
    const fullDetails = { ...fileDetails, docId: id, uploaded_at: Date.now() };
    const promises = [];
    promises.push(db.collection(collectionName).doc(id).set(fullDetails));
    promises.push(
      db
        .collection(collectionName)
        .doc("metadata")
        .update({ size: admin.firestore.FieldValue.increment(1) })
    );
    return Promise.all(promises)
      .then(() => fullDetails)
      .catch((error) => ({ error }));
  } else {
    return { error: "Forbidden" };
  }
};

const _delete = async (user, { docId, storagePath }) => {
  const allow = await doAllow(user, "delete");
  if (allow) {
    const promises = [];
    promises.push(admin.storage().bucket().file(storagePath).delete());
    promises.push(
      db
        .collection(collectionName)
        .doc("metadata")
        .update({ size: admin.firestore.FieldValue.increment(-1) })
    );
    promises.push(db.collection(collectionName).doc(docId).delete());
    return Promise.all(promises)
      .then(() => ({ success: true }))
      .catch((error) => ({ error }));
  } else {
    return { error: "Forbidden" };
  }
};

const update = async (user, id, type) => {
  const allow = await doAllow(user, "update");
  if (allow) {
    return db.collection(collectionName).doc(id).update(type);
  } else {
    return { error: "Forbidden" };
  }
};

const handler = async (event) => {
  try {
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;

    const path = event.path.replace("/private/files", "");
    const method = event.httpMethod;

    const params = event.queryStringParameters;
    const where = params.where ? params.where.split(";").map((x) => x.split(",")) : [];
    const orderBy = params.orderBy ? params.orderBy.split(",") : [];
    const limit = params.limit ? parseInt(params.limit) : 100;
    const startAt = params.startAt ? parseInt(params.startAt) : null;
    const startAfter = params.startAfter ? parseInt(params.startAfter) : null;

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
          response =
            path === "/count"
              ? await getCount(user)
              : await find(user, where, orderBy, limit, startAt, startAfter);
          break;
        case "POST": {
          const body = JSON.parse(event.body);
          response = await create(user, body);
          break;
        }
        case "PUT": {
          break;
        }
        case "DELETE": {
          const body = JSON.parse(event.body);
          response = await _delete(user, body);
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
