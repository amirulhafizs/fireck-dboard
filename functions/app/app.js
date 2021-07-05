var admin = require("firebase-admin");

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

const collectionName = "AppReservedCollection";

const getAppConfig = async () => {
  try {
    const db = admin.firestore();
    return (await db.collection(collectionName).doc("config").get()).data();
  } catch (error) {
    return { error };
  }
};

const handler = async (event) => {
  const method = event.httpMethod;
  try {
    let response;
    switch (method) {
      case "GET":
        response = await getAppConfig();
        break;
      default:
        response = { error: "Unknown route" };
        break;
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
