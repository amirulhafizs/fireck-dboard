import { Handler } from "@netlify/functions";
import nodeFetch from "node-fetch";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION, PUT, DELETE",
};

const handler: Handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const res = await nodeFetch(body.url, { method: body.method, headers: body.headers })
      .then((x) => x.json())
      .catch((error) => ({ error }));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 200, headers, body: JSON.stringify({ error: error.toString() }) };
  }
};

module.exports = { handler };
