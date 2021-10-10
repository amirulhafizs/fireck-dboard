import bcrypt from "bcryptjs";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import nodeFetch from "node-fetch";

type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "array-contains-any"
  | "not-in";

interface User {
  role: string;
  token?: string;
}

type Where = [string, WhereFilterOp, any];

type OrderBy = [string, ("asc" | "desc")?];

type Permission = "find" | "find one" | "create" | "update" | "delete" | "count" | "type";

type CmsEvent = "find" | "find one" | "create" | "update" | "delete";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface CollectionType {
  id: string;
  name: string;
  fields: Array<FieldType>;
  draftable: boolean;
  single: boolean;
  docId: string;
  size: number;
  lastIndex: number;
  displayDocIdOnTable: boolean;
  webhooks: { [key in CmsEvent]: { method: HttpMethod; url: string } };
}

type FieldType = {
  id: string;
  type: FieldInputType;
  enumOptions: string[];
  mediaSingle: boolean;
  relatedCollectionTypeDocId: string;
  relationOneToOne: boolean;
  displayOnTable: boolean;
  stringLong: boolean;
  collectionFields: FieldType[];
  documentFields: FieldType[];
};

type FieldInputType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "map"
  | "rich-text"
  | "media"
  | "date"
  | "enum"
  | "password"
  | "relation"
  | "json"
  | "collection"
  | "document";

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

const reservedCollectionName = "AdminUsersReservedCollection";

const getFirebaseCredentials = () => {
  return process.env["FIREBASE_ADMIN_CREDENTIAL"]
    ? JSON.parse(process.env["FIREBASE_ADMIN_CREDENTIAL"])
    : null;
};

const getAppConfig = (appId: string, accessToken: string) => {
  const credentials = JSON.parse(process.env["FIREBASE_ADMIN_CREDENTIAL"]);
  return nodeFetch(
    `https://firebase.googleapis.com/v1beta1/projects/${credentials["project_id"]}/webApps/${appId}/config`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  )
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

function getAccessToken() {
  return admin.credential
    .cert(getFirebaseCredentials())
    .getAccessToken()
    .then((accessToken) => {
      return accessToken.access_token;
    })
    .catch(() => {
      return null;
    });
}

const getOperation = (operationName, token) => {
  return nodeFetch(`https://firebase.googleapis.com/v1beta1/${operationName}`, {
    headers: { Authorization: "Bearer " + token },
  }).then((x) => x.json());
};

async function addWebApp(displayName) {
  const db = admin.firestore();
  try {
    const accessToken = await getAccessToken();
    const credentials = JSON.parse(process.env["FIREBASE_ADMIN_CREDENTIAL"]);
    console.log("credentials", credentials);
    if (!accessToken) return;
    const uri =
      "https://firebase.googleapis.com/v1beta1/projects/" + credentials["project_id"] + "/webApps";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        displayName,
      }),
    };
    const op = await nodeFetch(uri, options).then((x) => x.json());
    let foundAppId;
    while (!foundAppId) {
      const opStatus = await getOperation(op.name, accessToken);
      if (opStatus.done) {
        foundAppId = opStatus.response.appId;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    const config = await getAppConfig(foundAppId, accessToken);
    if (!config.error) {
      await db.collection("AppReservedCollection").doc("config").set(config);
    }
    return config;
  } catch (err) {
    console.log("error app create", err);
    return {
      error:
        "It seems that firestore is not enabled. If you have enabled it, wait few minutes and try again.",
    };
  }
}

const isSuperAdminCreated = async () => {
  try {
    const db = admin.firestore();
    const res = await db
      .collection(reservedCollectionName)
      .where("role", "==", "super-admin")
      .get();
    return res.docs.length > 0;
  } catch (error) {
    return {
      error:
        "It seems that firestore is not enabled. If you have enabled it, wait few minutes and try again.",
    };
  }
};

const setInitialDatabaseMetadata = async (apiUrl: string, jwtToken: string) => {
  try {
    const filesColName = "FilesReservedCollection";
    const rolesColName = "RolesReservedCollection";

    const filesColType: Partial<CollectionType> = {
      id: filesColName,
      name: filesColName,
      fields: [
        { id: "name", type: "string" },
        { id: "url", type: "string" },
        { id: "size", type: "number" },
        { id: "storagePath", type: "string" },
      ] as FieldType[],
    };

    nodeFetch(apiUrl + "/private/collectionTypes", {
      method: "POST",
      body: JSON.stringify(filesColType),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const rolesColType: Partial<CollectionType> = {
      id: rolesColName,
      name: rolesColName,
      fields: [
        { id: "docId", type: "string" },
        { id: "name", type: "string" },
        { id: "permissions", type: "map" },
        { id: "defaultPermissions", type: "array" },
      ] as FieldType[],
    };

    const res = await nodeFetch(apiUrl + "/private/collectionTypes", {
      method: "POST",
      body: JSON.stringify(rolesColType),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const db = admin.firestore();

    nodeFetch(apiUrl + "/api/RolesReservedCollection", {
      method: "POST",
      body: JSON.stringify({
        name: "public",
        docId: "public",
        permissions: {},
        defaultPermissions: ["count", "find", "find one"],
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    nodeFetch(apiUrl + "/api/RolesReservedCollection", {
      method: "POST",
      body: JSON.stringify({
        name: "authenticated",
        docId: "authenticated",
        permissions: {},
        defaultPermissions: ["count", "create", "find", "find one"],
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    db.collection("AppReservedCollection")
      .doc("appearance")
      .set({ logo: "", colors: ["#4C9394", "#19393B", "#23F3F3", "#1DCCCC"] })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

const createFirebaseToken = () => {
  return new Promise((resolve, reject) => {
    try {
      admin
        .auth()
        .createCustomToken("admin")
        .then((customToken) => {
          resolve(customToken);
        });
    } catch (error) {
      resolve({ error });
    }
  });
};

const createSuperAdmin = async (superAdmin, apiUrl: string) => {
  try {
    const db = admin.firestore();
    const alreadyExists = await isSuperAdminCreated();
    if (typeof alreadyExists === "boolean") {
      if (alreadyExists) {
        return { error: "Super admin already exists" };
      }
    } else {
      return { error: alreadyExists.error };
    }

    delete superAdmin["confirmationPassword"];

    const res = await db
      .collection(reservedCollectionName)
      .add({
        ...superAdmin,
        role: "super-admin",
        password: bcrypt.hashSync(superAdmin.password, 8),
      })
      .then(async () => {
        return login(superAdmin.email, superAdmin.password);
      })
      .then((res) => {
        setInitialDatabaseMetadata(apiUrl, res.token);
        return { ...res };
      });
    return res;
  } catch (error) {
    return {
      error:
        "It seems that firestore is not enabled. If you have enabled it, wait few minutes and try again.",
    };
  }
};

const login = async (email: string, password: string) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection(reservedCollectionName).where("email", "==", email).get();
    if (snapshot.docs.length) {
      const user = snapshot.docs[0].data();
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(user, process.env["APP_SECRET"]);
        const firebaseToken = await createFirebaseToken();
        return { token, firebaseToken, username: user.username, email: user.email };
      } else {
        return { error: "authentication error" };
      }
    } else {
      return { error: "authentication error" };
    }
  } catch (error) {
    return {
      error:
        "It seems that firestore is not enabled. If you have enabled it, wait few minutes and try again.",
    };
  }
};

const updateAppearance = (update) => {
  try {
    const db = admin.firestore();
    return db
      .collection("AppReservedCollection")
      .doc("appearance")
      .update(update)
      .then(() => ({ success: true }));
  } catch (error) {
    return { error };
  }
};

const getAppearance = async () => {
  try {
    const db = admin.firestore();
    return (await db.collection("AppReservedCollection").doc("appearance").get()).data();
  } catch (error) {
    return { error };
  }
};

const testFirestore = async () => {
  try {
    const db = admin.firestore();
    const res = await db.collection("TestReservedCollection").doc("test").set({ test: true });

    await db.collection("TestReservedCollection").doc("test").delete();
    return { success: true };
  } catch (error) {
    console.log("CARCHER BLOCK");
    return error.code && error.code === "app/no-app" ? { success: true } : { error };
  }
};

const testAuthentication = async () => {
  try {
    const token = await createFirebaseToken();
    const res = await admin
      .auth()
      .createUser({ displayName: "Romas" })
      .catch((error) => ({ error }));
    return res;
  } catch (error) {
    console.log(error);
    return error.code && error.code === "app/no-app" ? { success: true } : { error };
  }
};

const getLastDeployment = async () => {
  const db = admin.firestore();
  const snapshot = await db.collection("AppReservedCollection").doc("deployment").get();
  return snapshot.exists ? snapshot.data() : null;
};

const setDeployment = async () => {
  const db = admin.firestore();
  return db
    .collection("AppReservedCollection")
    .doc("deployment")
    .set({ date: new Date().toJSON() });
};

const handler = async (event) => {
  const host = event.headers.host;
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const apiUrl = `${protocol}://${host}`;

  try {
    const path = event.path.replace("/private/admin/", "");
    let response;
    switch (path) {
      case "isSuperAdminCreated":
        response = await isSuperAdminCreated();
        break;
      case "createSuperAdmin": {
        const body = JSON.parse(event.body);
        response = await createSuperAdmin(body, apiUrl);
        break;
      }
      case "login": {
        const body = JSON.parse(event.body);
        response = await login(body.email, body.password);
        break;
      }
      case "createApp": {
        response = await addWebApp(`Fireck-${Date.now()}`);
        break;
      }
      case "testFirestore":
        response = await testFirestore();
        break;
      case "testAuthentication":
        response = await testAuthentication();
        break;

      case "getAppearance":
        response = await getAppearance();
        break;

      case "updateAppearance": {
        const body = JSON.parse(event.body);
        response = await updateAppearance(body);
        break;
      }

      case "getDeployment": {
        response = await getLastDeployment();
        break;
      }

      case "setDeployment": {
        response = await setDeployment();
        break;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error.toString());
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
