import admin from "firebase-admin";
import { Webhook } from "../../src/api/collectionTypes";
import nodeFetch from "node-fetch";
import { Handler } from "@netlify/functions";

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

const handler: Handler = async (e) => {
  try {
    const body = JSON.parse(e.body);
    const { secret, body: initialBody, collectionTypeDocId, event } = body;

    if (secret !== process.env["APP_SECRET"]) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Forbidden" }),
      };
    } else {
      if (!event || !collectionTypeDocId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Bad hook token" }),
        };
      } else {
        const hooks = (await db
          .collection("WebhooksReservedCollection")
          .where("collectionTypeDocId", "==", collectionTypeDocId)
          .where("event", "==", event)
          .get()
          .then((x) => x.docs.map((doc) => doc.data()))) as Webhook[];

        const res = await Promise.all(
          hooks.map((x) => {
            return nodeFetch(x.url, {
              method: x.method,
              headers: {
                Authorization: e.headers.authorization,
              },
              ...(initialBody ? { body: JSON.stringify(initialBody) } : {}),
            });
          })
        )
          .then(() => ({
            success: true,
          }))
          .catch((error) => {
            console.log(error);
            return { error: error.toString() };
          });

        return {
          statusCode: 200,
          body: JSON.stringify(res),
        };
      }
    }
  } catch (error) {
    console.log(error.toString());
    return { statusCode: 200, body: JSON.stringify({ error: error.toString() }) };
  }
};

module.exports = { handler };
