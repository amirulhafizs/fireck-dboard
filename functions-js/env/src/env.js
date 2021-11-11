const handler = async (event) => {
  try {
    const firebaseAdminCredential = process.env.FIREBASE_ADMIN_CREDENTIAL
      ? JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL)
      : { project_id: undefined };
    const env = {};
    env.PROJECT_ID = firebaseAdminCredential.project_id;
    env.SITE_ID = process.env.SITE_ID;
    env.STRIPE = process.env.STRIPE_SECRET_KEY ? true : false;
    return {
      statusCode: 200,
      body: JSON.stringify({ ...env }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
