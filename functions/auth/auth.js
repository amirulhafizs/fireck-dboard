var bcrypt = require("bcryptjs");
var admin = require("firebase-admin");
var jwt = require("jsonwebtoken");

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

const getFirst = (collection, where) => {
  return db
    .collection(collection)
    .where(...where)
    .get()
    .then((res) => (res.docs.length ? res.docs[0].data() : null));
};

const localRegister = async (email, password, subscribeEmails) => {
  const exists = await getFirst("users", ["email", "==", email]);
  if (exists) return { error: "Email exists" };
  const hashedPassword = bcrypt.hashSync(password, 8);
  return db
    .collection("users")
    .add({ email, hashedPassword, subscribeEmails })
    .then(() => ({ success: true }));
};

const localLogin = (email, password) => {
  const user = await getFirst("users", ["email", "==", email]);
  if (!user) return { error: "User does not exist" };
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(user, process.env["APP_SECRET"]);
    delete user.password;
    return { token, user };
  }
  return { error: "Login failed" };
};

const handler = async (event) => {
  try {
    const path = event.path.replace("/auth/", "");
    const body = JSON.parse(event.body);
    let response;
    switch (path) {
      case "local/register": {
        response = await localRegister(...body);
        break;
      }
      case "local/login": {
        response = await localLogin(...body);
        break;
      }

      default: {
        response = { error: "Auth method is not implemented" };
        break;
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ path }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
