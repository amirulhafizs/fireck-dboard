var bcrypt = require("bcryptjs");
var admin = require("firebase-admin");
var jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

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

console.log("APPS LENGTH IS " + admin.apps.length);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
    storageBucket: `${process.env["firebase_project_id"]}.appspot.com`,
  });
}

const collectionName = "AdminUsersReservedCollection";

const getAppConfig = (appId, accessToken) => {
  return fetch(
    `https://firebase.googleapis.com/v1beta1/projects/${process.env["firebase_project_id"]}/webApps/${appId}/config`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  ).then((x) => x.json());
};

const getProjectWebApps = (token) => {
  return fetch(
    `https://firebase.googleapis.com/v1beta1/projects/${process.env["firebase_project_id"]}/webApps`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  ).then((x) => x.json());
};

function getAccessToken() {
  return admin.credential
    .cert(firebaseCredentials)
    .getAccessToken()
    .then((accessToken) => {
      return accessToken.access_token;
    })
    .catch((err) => {
      return { error };
    });
}

const getOperation = (operationName, token) => {
  return fetch(`https://firebase.googleapis.com/v1beta1/${operationName}`, {
    headers: { Authorization: "Bearer " + token },
  }).then((x) => x.json());
};

async function addWebApp(displayName) {
  const db = admin.firestore();
  try {
    const accessToken = await getAccessToken();
    const uri =
      "https://firebase.googleapis.com/v1beta1/projects/" +
      process.env["firebase_project_id"] +
      "/webApps";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        displayName,
      }),
    };
    const op = await fetch(uri, options).then((x) => x.json());
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
      db.collection("AppReservedCollection").doc("config").set(config);
    }
    return config;
  } catch (err) {
    return { error: err["message"] };
  }
}

const isSuperAdminCreated = async () => {
  try {
    const db = admin.firestore();
    const res = await db.collection(collectionName).where("role", "==", "super-admin").get();
    return res.docs.length > 0;
  } catch (error) {
    return { error };
  }
};

const setInitialDatabaseMetadata = () => {
  try {
    const db = admin.firestore();
    db.collection("FilesReservedCollection").doc("metadata").set({ size: 0 });
    db.collection("RolesReservedCollection")
      .doc("public")
      .set({
        name: "public",
        docId: "public",
        permissions: {},
        defaultPermissions: ["count", "find", "find one"],
      });
    db.collection("RolesReservedCollection")
      .doc("authenticated")
      .set({
        name: "authenticated",
        docId: "authenticated",
        permissions: {},
        defaultPermissions: ["count", "create", "find", "find one"],
      });
    db.collection("AppReservedCollection")
      .doc("appearance")
      .set({ logo: "", colors: ["#4C9394", "#19393B", "#23F3F3", "#1DCCCC"] });
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

const createSuperAdmin = async (superAdmin) => {
  try {
    const db = admin.firestore();
    const alreadyExists = await isSuperAdminCreated();
    if (alreadyExists && alreadyExists.error) {
      return { error: alreadyExists.error };
    }
    if (alreadyExists) {
      return { error: "super admin already exists" };
    }

    delete superAdmin["confirmationPassword"];
    setInitialDatabaseMetadata();
    const config = await addWebApp(`Fireck-${Date.now()}`);
    return db
      .collection(collectionName)
      .add({
        ...superAdmin,
        role: "super-admin",
        password: bcrypt.hashSync(superAdmin.password, 8),
      })
      .then(async () => {
        return login(superAdmin.email, superAdmin.password);
      })
      .then((res) => ({ ...res, firebaseConfig: config }))
      .catch((error) => ({ error }));
  } catch (error) {
    return { error };
  }
};

const login = async (email, password) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection(collectionName).where("email", "==", email).get();
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
    return { error };
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
      .createUser({ name: "Romas" })
      .catch((error) => ({ error }));
    return res;
  } catch (error) {
    console.log(error);
    return error.code && error.code === "app/no-app" ? { success: true } : { error };
  }
};

const handler = async (event) => {
  try {
    const path = event.path.replace("/private/admin/", "");
    let response;
    switch (path) {
      case "isSuperAdminCreated":
        response = await isSuperAdminCreated();
        break;
      case "createSuperAdmin": {
        const body = JSON.parse(event.body);
        response = await createSuperAdmin(body);
        break;
      }
      case "login": {
        const body = JSON.parse(event.body);
        response = await login(body.email, body.password);
        break;
      }
      case "completeApp": {
        response = await completeApp();
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
