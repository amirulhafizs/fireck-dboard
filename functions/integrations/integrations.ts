import { Handler } from "@netlify/functions";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";

const reservedCollectionName = "IntegrationsReservedCollection";

interface User {
  role: string;
}

type IntegrationID = "payments" | "emails" | "all";

type Permission = "find" | "create" | "update" | "delete";

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

const doAllow = async (user: User, integrationId: IntegrationID, permission: Permission) => {
  let allow = false;
  if (user.role === "super-admin") {
    allow = true;
  } else {
    const res = await db.collection("AdminRoles").where("id", "==", user.role).get();
    const role = res.docs.length ? res.docs[0].data() : null;
    if (role) {
      if (role.manageIntegrations[integrationId].includes(permission)) {
        allow = true;
      }
    }
  }
  return allow;
};

const updateIntegration = async (user: User, integrationId: IntegrationID, updates: Object) => {
  const allow = await doAllow(user, integrationId, "update");
  if (!allow) return { error: "Forbidden" };
  return db.collection(reservedCollectionName).doc(integrationId).update(updates);
};

const getIntegration = async (user: User, integrationId: IntegrationID) => {
  const allow = await doAllow(user, integrationId, "find");

  if (!allow) return { error: "Forbidden" };

  return db
    .collection(reservedCollectionName)
    .doc(integrationId)
    .get()
    .then((x) => x.data());
};

const getAllIntegrations = async (user: User) => {
  const allow = await doAllow(user, "all", "find");

  if (!allow) return { error: "Forbidden" };

  return db
    .collection(reservedCollectionName)
    .get()
    .then((x) => x.docs.map((d) => d.data()));
};

const handler: Handler = async (event) => {
  try {
    const getAll: boolean =
      event.path.endsWith("/private/integrations") && event.httpMethod === "GET";
    const integrationId = event.path.replace("/private/integrations/", "") as IntegrationID;
    const method = event.httpMethod;
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;

    if (!token) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Forbidden" }),
      };
    }

    const user = jwt.verify(token, process.env["APP_SECRET"]);

    let response;

    if (getAll) {
      response = await getAllIntegrations(user);
    } else {
      switch (method) {
        case "GET": {
          response = await getIntegration(user, integrationId);
          break;
        }
        case "PUT": {
          const updates = JSON.parse(event.body);
          console.log("UPDEATE", updates);
          response = await updateIntegration(user, integrationId, updates);
          break;
        }
        default: {
          break;
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 200, body: JSON.stringify({ error: error.toString() }) };
  }
};

module.exports = { handler };
