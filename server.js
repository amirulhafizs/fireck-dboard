const express = require("express");
const path = require("path");
require("dotenv").config();
const handleHandler = require("./functions-js/handle/handle").handler;
const authHandler = require("./functions-js/auth/auth").handler;
const adminHandler = require("./functions-js/admin/admin").handler;
const envHandler = require("./functions-js/env/env").handler;
const importExportHandler = require("./functions-js/import-export/import-export").handler;
const proxyHandler = require("./functions-js/proxy/proxy").handler;
const uploadsHandler = require("./functions-js/uploads/uploads").handler;
const webhooksHandler = require("./functions-js/webhooks/webhooks").handler;
const appHandler = require("./functions-js/app/app").handler;

const wrapLambda = async (req, res, handler) => {
  let searchIndex = req.url.indexOf("?");
  let event = {
    path: req.path,
    httpMethod: req.method,
    body: JSON.stringify(req.body),
    headers: { authorization: req.headers.authorization, host: req.headers.host },
    rawUrl: req.url,
    rawQuery: searchIndex === -1 ? "" : req.url.substring(searchIndex),
  };

  const result = await handler(event);
  res.status(result.statusCode);
  res.json(JSON.parse(result.body));
};

const functions = [
  { route: "/api/:collectionId/:documentId", handler: handleHandler },
  { route: "/api/:collectionId", handler: handleHandler },
  { route: "/auth/:provider/:function", handler: authHandler },
  { route: "/private/webhooks", handler: webhooksHandler },
  { route: "/proxy", handler: proxyHandler },
  { route: "/private/import-export", handler: importExportHandler },
  { route: "/upload", handler: uploadsHandler },
  { route: "/private/env", handler: envHandler },
  { route: "/private/admin/:function", handler: adminHandler },
  { route: "/private/admin", handler: adminHandler },
  { route: "/private/app", handler: appHandler },
];

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    type() {
      return true;
    },
  })
);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

functions.forEach((fn) => {
  app.all(fn.route, (req, res) => wrapLambda(req, res, fn.handler));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const listener = app.listen(process.env.SERVER_PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
