var admin = require("firebase-admin");

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
