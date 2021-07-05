const handler = async (event) => {
  try {
    const keys = ["firebase_project_id", "SITE_ID", "apiFreezeTime"];
    const env = keys.reduce((a, b) => ({ ...a, [b]: process.env[b] }), {});
    console.log("env", env);
    return {
      statusCode: 200,
      body: JSON.stringify({ ...env }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
