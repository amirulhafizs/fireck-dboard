import { Handler } from "@netlify/functions";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import { Buffer } from "buffer";
import mime from "mime-types";

type Permission = "find" | "find one" | "create" | "update" | "delete" | "count";

type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "array-contains-any"
  | "not-in";

interface User {
  role: string;
}

type Where = [string, WhereFilterOp, any];

interface CollectionType {
  id: string;
  name: string;
  fields: Array<FieldType>;
  draftable: boolean;
  single: boolean;
  docId: string;
  size: number;
  lastIndex: number;
  displayDocIdOnTable: boolean;
}

type FieldType = {
  id: string;
  type: FieldInputType;
  enumOptions: string[];
  mediaSingle: boolean;
  relatedCollectionTypeDocId: string;
  relationOneToOne: boolean;
  displayOnTable: boolean;
  stringLong: boolean;
  collectionFields: FieldType[];
  documentFields: FieldType[];
};

type FieldInputType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "map"
  | "rich-text"
  | "media"
  | "date"
  | "enum"
  | "password"
  | "relation"
  | "json"
  | "collection"
  | "document";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION, PUT, DELETE",
};

const credentials = JSON.parse(process.env["FIREBASE_ADMIN_CREDENTIAL"]);

if (admin.apps.length === 0) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
      storageBucket: `${credentials["project_id"]}.appspot.com`,
    });
  } catch (error) {
    console.log(error);
  }
}

const storage = admin.storage().bucket(`${credentials["project_id"]}.appspot.com`);
const db = admin.firestore();

const getFirst = (collection: string, where: Where) => {
  return db
    .collection(collection)
    .where(...where)
    .get()
    .then((res) => (res.docs.length ? res.docs[0].data() : null));
};

const doAllow = async (user: { role: string }, permission: Permission) => {
  let allow = false;
  if (user.role === "super-admin") {
    allow = true;
  } else {
    const collectionType = (await getFirst("CollectionTypesReservedCollection", [
      "id",
      "==",
      "uploads",
    ])) as CollectionType;
    const res = await db.collection("RolesReservedCollection").where("name", "==", user.role).get();
    const role = res.docs.length ? res.docs[0].data() : null;

    if (role) {
      if (
        role.permissions[collectionType.docId] &&
        role.permissions[collectionType.docId].includes(permission)
      ) {
        allow = true;
      }
    }
  }
  return allow;
};

const handler: Handler = async (event, context) => {
  try {
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;

    const user = token ? jwt.verify(token, process.env["APP_SECRET"]) : { role: "public" };
    const allow = await doAllow(user, "create");

    if (!allow) {
      return { statusCode: 200, body: JSON.stringify({ error: "Forbidden" }) };
    }

    const base64 = event.body;
    const dataType = base64.match(/^data:(.*);/)[1];
    const rawData = base64.replace(/^data.*,/, "");

    const buff = Buffer.from(rawData, "base64");
    const filename = `Upload-${Date.now()}.${mime.extension(dataType)}`;
    const storageFile = storage.file(filename);

    await storageFile.save(buff, { contentType: dataType });
    const url = (
      await storageFile.getSignedUrl({
        action: "read",
        expires: "03-17-2500",
      })
    )[0];

    const metadata = (await storageFile.getMetadata())[0] as { size: number; filename: string };

    const fileDetails = {
      name: filename,
      size: metadata.size,
      url: url,
      storagePath: filename,
    };

    const docRef = db.collection("FilesReservedCollection").doc();

    const fullDetails = { docId: docRef.id, uploaded_at: Date.now(), ...fileDetails };

    await docRef.set(fullDetails);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(fullDetails),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 200, headers, body: JSON.stringify({ error: error.toString() }) };
  }
};

module.exports = { handler };
