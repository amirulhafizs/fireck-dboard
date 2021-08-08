import { Handler } from "@netlify/functions";
import stripe from "stripe";
import admin from "firebase-admin";

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

interface Charge {
  amount: number;
  source: string;
  currency: string;
  description: string;
  [key: string]: any;
}

const createCharge = (charge: Charge, stripeApp: stripe) => {
  return stripeApp.charges.create(charge);
};

const getCharges = async (stripeApp: stripe, limit: number, starting_after?: string) => {
  return (
    await stripeApp.charges.list({
      limit,
      starting_after,
    })
  ).data;
};

const getCharge = (chargeId: string, stripeApp: stripe) => {
  return stripeApp.charges.retrieve(chargeId);
};

const updateCharge = (chargeId: string, updates: Object, stripeApp: stripe) => {
  return stripeApp.charges.update(chargeId, updates);
};

const refund = (chargeId: string, stripeApp: stripe) => {
  return stripeApp.refunds.create({ charge: chargeId });
};

const capture = (chargeId: string, stripeApp: stripe) => {
  return stripeApp.charges.capture(chargeId);
};

const handler: Handler = async (event) => {
  try {
    const params = event.queryStringParameters;
    const signature = event.httpMethod + event.path;
    let response: any;

    const integration = (await db
      .collection("IntegrationsReservedCollection")
      .doc("payments")
      .get()
      .then((x) => x.data())) as { stripe_secret_key: string };

    const stripeApp = new stripe(integration.stripe_secret_key, { apiVersion: "2020-08-27" });

    const body = (() => {
      try {
        return JSON.parse(event.body);
      } catch (er) {
        return null;
      }
    })();

    if (/GET\/api\/payments$/.test(signature)) {
      const limit = params.limit ? parseInt(params.limit) : 10;
      response = await getCharges(stripeApp, limit, params.starting_after);
    } else if (/GET\/api\/payments\/\w+$/.test(signature)) {
      const chargeId = signature.split("/").slice(-1)[0];
      response = await getCharge(chargeId, stripeApp);
    } else if (/POST\/api\/payments$/.test(signature)) {
      response = await createCharge(body, stripeApp);
    } else if (/POST\/api\/payments\/\w+\/refund$/.test(signature)) {
      const chargeId = signature.replace("/refund", "").split("/").slice(-1)[0];
      response = await refund(chargeId, stripeApp);
    } else if (/POST\/api\/payments\/\w+\/capture$/.test(signature)) {
      const chargeId = signature.replace("/capture", "").split("/").slice(-1)[0];
      response = await capture(chargeId, stripeApp);
    } else if (/POST\/api\/payments\/\w+$/.test(signature)) {
      const chargeId = signature.split("/").slice(-1)[0];
      response = await updateCharge(chargeId, body, stripeApp);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response, undefined, 2),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 200, body: JSON.stringify({ error: error.toString() }) };
  }
};

module.exports = { handler };
