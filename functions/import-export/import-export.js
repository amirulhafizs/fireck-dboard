var admin = require("firebase-admin");
var jwt = require("jsonwebtoken");

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
      if (role.manageFiles.includes(permission)) {
        allow = true;
      }
    }
  }
  return allow;
};

const exportJson = async (user, options) => {
  try {
    const allow = await doAllow(user, "export");
    if (allow) {
      const collectionTypes = options.collectionTypes
        ? (await db.collection("CollectionTypesReservedCollection").get()).docs.map((x) => x.data())
        : [];

      const Collections = {};

      if (options.collections) {
        for (let colType of collectionTypes) {
          if (colType.single) {
            const collection = (
              await db.collection("DocumentsReservedCollection").doc(colType.docId).get()
            ).data();
            Collections[colType.docId] = collection;
          } else {
            const collection = (await db.collection(colType.docId).get()).docs.map((x) => x.data());
            Collections[colType.docId] = collection;
          }
        }
      }

      const roles = options.roles
        ? (await db.collection("RolesReservedCollection").get()).docs.map((x) => x.data())
        : [];

      const Appearance = options.appearance
        ? (await db.collection("AppReservedCollection").doc("appearance").get()).data()
        : null;

      return {
        CollectionTypesReservedCollection: collectionTypes,
        Collections,
        RolesReservedCollection: roles,
        Appearance,
      };
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    console.log(error.toString());
    return { error };
  }
};

const importJson = async (user, json) => {
  try {
    const allow = await doAllow(user, "import");
    if (allow) {
      for (let colType of json.CollectionTypesReservedCollection) {
        await db.collection("CollectionTypesReservedCollection").doc(colType.docId).set(colType);
        if (json.Collections[colType.docId]) {
          if (colType.single) {
            await db
              .collection("DocumentsReservedCollection")
              .doc(colType.docId)
              .set(json.Collections[colType.docId]);
          } else {
            for (let doc of json.Collections[colType.docId]) {
              await db.collection(colType.docId).doc(doc.docId).set(doc);
            }
          }
        }
      }
      for (let role of json.RolesReservedCollection) {
        await db.collection("RolesReservedCollection").doc(role.docId).set(role);
      }

      if (json.Appearance) {
        await db.collection("AppReservedCollection").doc("appearance").set(json.Appearance);
      }

      return {
        success: true,
      };
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    console.log(error.toString());
    return { error };
  }
};

const handler = async (event) => {
  try {
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;

    const path = event.path.replace("/private/import-export/", "");
    const method = event.httpMethod;

    if (!token) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Forbidden" }),
      };
    } else {
      const user = jwt.verify(token, process.env["APP_SECRET"]);
      let response;
      switch (path) {
        case "export": {
          const body = JSON.parse(event.body);
          response = await exportJson(user, body);
          break;
        }
        case "import": {
          const body = JSON.parse(event.body);
          response = await importJson(user, body);
          break;
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(response, undefined, 2),
      };
    }
  } catch (error) {
    console.log(error.toString());
    return { statusCode: 200, body: { error: error.toString() } };
  }
};

module.exports = { handler };
