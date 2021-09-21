import { Handler } from "@netlify/functions";
import nodeFetch from "node-fetch";

const handler: Handler = async (event, context) => {
  const host = event.headers.host;
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const res = await nodeFetch(`${protocol}://${host}/api/features`)
    .then((x) => x.json())
    .catch((error) => ({ error: error.toString() }));

  return {
    statusCode: 200,
    body: JSON.stringify({ res }),
  };
};

module.exports = { handler };
