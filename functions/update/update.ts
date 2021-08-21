import { Handler } from "@netlify/functions";
import * as Git from "nodegit";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION, PUT, DELETE",
};

const handler: Handler = async () => {
  try {
    const response = await Git.Repository.open(".git")
      .then((repo) => {
        console.log("repo", repo);
        return repo
          .getRemote("origin")
          .then((remote) => {
            console.log("remote", remote);
            return { remote };
          })
          .catch((error) => {
            console.log("remotet errr", error);
            return { error };
          });
      })
      .catch((error) => {
        console.log("repo error", error);
        return { error };
      });

    console.log("RESPONSE", response);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 200, headers, body: JSON.stringify({ error: error.toString() }) };
  }
};

module.exports = { handler };
