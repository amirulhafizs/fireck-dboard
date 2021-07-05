var admin = require("firebase-admin");
var jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

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

const collectionName = "RolesReservedCollection";

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

const find = async (user) => {
  const allow = await doAllow(user, "find");
  if (allow) {
    let snap = await db.collection(collectionName).get();
    const data = snap ? snap.docs.map((x) => x.data()) : [];
    return data;
  } else {
    return { error: "Forbidden" };
  }
};

const create = async (user, role) => {
  const allow = await doAllow(user, "create");
  if (allow) {
    const docId = v4();
    const fullDetails = { ...role, docId };
    const roles = await find({ role: "super-admin" });
    if (roles.findIndex((x) => x.name === role.name) > -1) {
      return { error: "Role name collision" };
    } else {
      return db.collection(collectionName).doc(docId).set(fullDetails);
    }
  } else {
    return { error: "Forbidden" };
  }
};

const _delete = async (user, docId) => {
  const allow = await doAllow(user, "delete");
  if (allow) {
    if (["public", "authenticated"].includes(docId)) {
      return { error: "public and authenticated roles can't be deleted" };
    }
    return db.collection(collectionName).doc(docId).delete();
  } else {
    return { error: "Forbidden" };
  }
};

const update = async (user, docId, updates) => {
  const allow = await doAllow(user, "update");
  if (allow) {
    return db.collection(collectionName).doc(docId).update(updates);
  } else {
    return { error: "Forbidden" };
  }
};

const handler = async (event) => {
  try {
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;

    const path = event.path.replace("/private/roles", "");
    const method = event.httpMethod;

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
          response = path === "/count" ? await getCount(user) : await find(user);
          break;
        case "POST": {
          const body = JSON.parse(event.body);
          response = await create(user, body);
          break;
        }
        case "PUT": {
          const body = JSON.parse(event.body);
          response = await update(user, path.replace("/", ""), body);
          break;
        }
        case "DELETE": {
          response = await _delete(user, path.replace("/", ""));
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
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
