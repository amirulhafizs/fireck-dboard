import { Handler } from "@netlify/functions";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import nodeFetch from "node-fetch";

const COLLECTIONTYPES_ID = "CollectionTypesReservedCollection";

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
  token?: string;
}

type Where = [string, WhereFilterOp, any];

type OrderBy = [string, ("asc" | "desc")?];

type Permission = "find" | "find one" | "create" | "update" | "delete" | "count" | "type";

type CmsEvent = "find" | "find one" | "create" | "update" | "delete";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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
  webhooks: { [key in CmsEvent]: { method: HttpMethod; url: string } };
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
  | "document"
  | "any";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION, PUT, DELETE",
};

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

const populateRelationFields = async (relationFields: FieldType[], obj: Object) => {
  const promises = [];
  relationFields.forEach((relField) => {
    if (relField.relationOneToOne) {
      if (obj[relField.id]) {
        promises.push(
          db
            .collection(relField.relatedCollectionTypeDocId)
            .doc(obj[relField.id])
            .get()
            .then((res) => ({ fieldId: relField.id, data: res.data() }))
        );
      }
    } else {
      const innerPromises = [];
      if (obj[relField.id]) {
        obj[relField.id].forEach((docId) => {
          innerPromises.push(
            db
              .collection(relField.relatedCollectionTypeDocId)
              .doc(docId)
              .get()
              .then((res) => res.data())
          );
        });
      }
      promises.push(Promise.all(innerPromises).then((data) => ({ fieldId: relField.id, data })));
    }
  });

  (await Promise.all(promises)).forEach((data) => {
    obj[data.fieldId] = data.data;
  });
  return obj;
};

const callWebhook = (collectionType: CollectionType, token: string, body?: any) => {
  if (collectionType.webhooks) {
    const { url, method } = collectionType.webhooks["find"];
    if (url) {
      nodeFetch(url, {
        method: method,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: body ? JSON.stringify(body) : undefined,
      }).catch((error) => console.log(error));
    }
  }
};

const doAllow = async (user: User, collectionName: string, permission: Permission) => {
  let allow = false;
  if (user.role === "super-admin") {
    allow = true;
  } else {
    const res = await db.collection("RolesReservedCollection").where("name", "==", user.role).get();
    const role = res.docs.length ? res.docs[0].data() : null;
    if (role) {
      if (
        role.permissions[collectionName] &&
        role.permissions[collectionName].includes(permission)
      ) {
        allow = true;
      }
    }
  }
  return allow;
};

const getCollectionType = (collectionId) => {
  return db
    .collection(COLLECTIONTYPES_ID)
    .where("id", "==", decodeURI(collectionId))
    .get()
    .then((res) => (res.docs.length ? res.docs[0].data() : null)) as Promise<CollectionType>;
};

const getFirst = (collection: string, where: Where) => {
  return db
    .collection(collection)
    .where(...where)
    .get()
    .then((res) => (res.docs.length ? res.docs[0].data() : null));
};

const findOne = async (user: User, collectionId: string, docId: string, populateRef: boolean) => {
  try {
    const collectionType = await getCollectionType(collectionId);

    callWebhook(collectionType, user.token);

    if (await doAllow(user, collectionType.docId, "find one")) {
      let snapshot = await db.collection(collectionType.docId).doc(docId).get();

      const relationFields = populateRef
        ? collectionType.fields.filter((x) => x.type === "relation")
        : [];

      return !snapshot.exists
        ? null
        : relationFields.length
        ? populateRelationFields(relationFields, snapshot.data())
        : snapshot.data();
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    console.log(error.toString());
    return { error };
  }
};

const _delete = async (user: User, collectionId: string, docId: string) => {
  try {
    const collectionType = await getCollectionType(collectionId);

    callWebhook(collectionType, user.token);

    if (await doAllow(user, collectionType.docId, "delete")) {
      const promises = [];

      promises.push(
        db
          .collection("CollectionTypesReservedCollection")
          .doc(collectionType.docId)
          .update({
            size: admin.firestore.FieldValue.increment(-1),
          })
      );
      promises.push(db.collection(collectionType.docId).doc(docId).delete());
      return Promise.all(promises);
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error };
  }
};

const find = async (
  user: User,
  collectionId: string,
  where: string[][],
  orderBy: OrderBy[],
  limit: number,
  startAt: any,
  startAfter: any,
  endAt: any,
  endBefore: any,
  populateRef: boolean
) => {
  try {
    const collectionType = await getCollectionType(collectionId);

    callWebhook(collectionType, user.token);

    if (await doAllow(user, collectionType.docId, "find")) {
      if (collectionType.single) {
        let relationFields = collectionType.fields.filter((x) => x.type === "relation");

        const data = (
          await db.collection("DocumentsReservedCollection").doc(collectionType.docId).get()
        ).data();

        if (!relationFields.length || !populateRef) {
          return data;
        }

        return await populateRelationFields(relationFields, data);
      }

      let currentRef = db.collection(
        collectionType.docId
      ) as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

      const parseMeBaby = (fieldId: string, value: any) => {
        const field = collectionType.fields.find((x) => x.id === fieldId);
        if (!field) return value;
        if (field.type === "boolean") {
          return value === "true" ? true : false;
        }
        if (field.type === "number") {
          return +value;
        }
        return value;
      };

      where.forEach((x) => {
        let [arg1, arg2, ...rest] = x;
        let arg3 =
          rest.length > 1 || ["not in", "in", "array-contains-any"].includes(arg2)
            ? rest.map((x) => parseMeBaby(arg1, x))
            : parseMeBaby(arg1, rest[0]);

        currentRef = currentRef.where(arg1, arg2 as WhereFilterOp, arg3);
      });

      orderBy.forEach((x) => {
        currentRef = currentRef.orderBy(...x);
      });

      if (orderBy.length) {
        const fieldId = orderBy[0][0];
        if (startAt) {
          currentRef = currentRef.startAt(parseMeBaby(fieldId, startAt));
        }

        if (startAfter) {
          currentRef = currentRef.startAfter(parseMeBaby(fieldId, startAfter));
        }

        if (endAt) {
          currentRef = currentRef.endAt(parseMeBaby(fieldId, endAt));
        }

        if (endBefore) {
          currentRef = currentRef.endBefore(parseMeBaby(fieldId, endBefore));
        }
      }

      currentRef = currentRef.limit(limit);

      const snapshot = await currentRef.get();

      if (snapshot.empty) {
        return [];
      }

      let relationFields = collectionType.fields.filter((x) => x.type === "relation");

      if (relationFields.length && populateRef) {
        const results = [];
        for (const doc of snapshot.docs) {
          const populatedData = await populateRelationFields(relationFields, doc.data());
          results.push(populatedData);
        }

        return results;
      }

      return snapshot.docs.map((x) => x.data());
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error: error.toString() };
  }
};

const isValid: { [key in FieldInputType]: (a: any, type: FieldType) => boolean } = {
  media: (value, type) =>
    type.mediaSingle
      ? typeof value === "string"
      : Array.isArray(value) && !value.find((x) => typeof x !== "string"),
  string: (value, type) => typeof value === "string",
  number: (value, type) => !isNaN(value),
  document: (value, type) => typeof value === "object",
  collection: (value, type) => Array.isArray(value),
  boolean: (value, type) => typeof value === "boolean",
  array: (value, type) => Array.isArray(value),
  "rich-text": (value, type) => typeof value === "string",
  json: (value, type) => typeof value === "object",
  password: (value, type) => typeof value === "string",
  relation: (value, type) =>
    type.relationOneToOne
      ? typeof value === "string"
      : Array.isArray(value) && !value.find((x) => typeof x !== "string"),
  date: (value, type) => typeof value === "string",
  enum: (value, type) => type.enumOptions.includes(value),
  map: (value, type) => typeof value === "object",
  any: () => true,
};

const validateObj = (fields: FieldType[], obj: Object) => {
  const newObj = JSON.parse(JSON.stringify(obj));
  Object.keys(obj).forEach((key) => {
    const field = fields.find((x) => x.id === key);
    if (!field || !isValid[field.type](obj[key], field)) {
      delete newObj[key];
    } else {
      if (field.type === "collection") {
        const collection = [];
        obj[key].forEach((x) => {
          collection.push(validateObj(field.collectionFields, x));
        });
        newObj[key] = collection;
      } else if (field.type === "document") {
        newObj[key] = validateObj(field.documentFields, obj[key]);
      }
    }
  });

  return newObj;
};

const create = async (user: User, collectionId: string, data: Object) => {
  try {
    const collectionType = await getCollectionType(collectionId);

    callWebhook(collectionType, user.token, data);

    if (await doAllow(user, collectionType.docId, "create")) {
      const nowDate = new Date().toJSON();

      if (collectionType.single) {
        return db
          .collection("DocumentsReservedCollection")
          .doc(collectionType.docId)
          .set(
            validateObj(collectionType.fields, {
              ...data,
              docId: collectionType.docId,
              createdAt: nowDate,
              modifiedAt: nowDate,
            })
          );
      }

      const docRef = db.collection(collectionType.docId).doc();
      const docId = docRef.id;

      const newDoc = validateObj(collectionType.fields, {
        ...data,
        docId,
        createdAt: nowDate,
        modifiedAt: nowDate,
      });

      const promises = [];

      promises.push(docRef.set(newDoc));

      promises.push(
        db
          .collection("CollectionTypesReservedCollection")
          .doc(collectionType.docId)
          .update({
            size: admin.firestore.FieldValue.increment(1),
          })
      );

      return Promise.all(promises)
        .then(() => newDoc)
        .catch((error) => ({ error }));
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    console.log(error);
    return { error: error.toString() };
  }
};

const update = async (user: User, collectionId: string, docId: string, data: Object) => {
  try {
    const collectionType = await getCollectionType(collectionId);

    callWebhook(collectionType, user.token, data);

    if (await doAllow(user, collectionType.docId, "update")) {
      if (collectionType.single) {
        return db
          .collection("DocumentsReservedCollection")
          .doc(collectionType.docId)
          .update(validateObj(collectionType.fields, { ...data, modifiedAt: new Date().toJSON() }));
      }
      return db
        .collection(collectionType.docId)
        .doc(docId)
        .update(validateObj(collectionType.fields, { ...data, modifiedAt: new Date().toJSON() }));
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error: error.toString() };
  }
};

const getType = async (user: User, collectionId: string) => {
  try {
    const collectionType = await getCollectionType(collectionId);

    if (await doAllow(user, collectionType.docId, "type")) {
      return collectionType;
    } else {
      return { error: "Forbidden" };
    }
  } catch (error) {
    return { error: error.toString() };
  }
};

const getUserFromToken = (token: string | undefined) => {
  try {
    return token ? { ...jwt.verify(token, process.env["APP_SECRET"]), token } : { role: "public" };
  } catch (er) {
    return { role: "public" };
  }
};

const handler: Handler = async (event) => {
  try {
    const authHead = event.headers.authorization;
    const token =
      authHead && authHead.startsWith("Bearer ") ? authHead.replace("Bearer ", "") : null;

    const paths = event.path.replace("/api/", "").split("/");
    const method = event.httpMethod;
    const body = ["POST", "PUT"].includes(method) ? JSON.parse(event.body) : null;
    let response;

    const user = getUserFromToken(token);

    switch (method) {
      case "GET": {
        const params = event.queryStringParameters;
        const where = params.where ? params.where.split(";").map((x) => x.split(",")) : [];
        const orderBy = (
          params.orderBy ? params.orderBy.split(";").map((x) => x.split(",")) : []
        ) as OrderBy[];
        const limit = params.limit ? parseInt(params.limit) : 100;
        const populateRef = params.populateRef === "false" ? false : true;

        if (paths.length === 2) {
          if (paths[1] === "type") {
            response = await getType(user, paths[0]);
          } else {
            response = await findOne(user, paths[0], paths[1], populateRef);
          }
        } else {
          response = await find(
            user,
            paths[0],
            where,
            orderBy,
            limit,
            params.startAt,
            params.startAfter,
            params.endAt,
            params.endBefore,
            populateRef
          );
        }
        break;
      }

      case "POST":
        response = await create(user, paths[0], body);
        break;
      case "PUT":
        response = await update(user, paths[0], paths[1], body);
        break;
      case "DELETE":
        response = await _delete(user, paths[0], paths[1]);
        break;
      default:
        break;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response, undefined, 2),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 200, headers, body: JSON.stringify({ error: error.toString() }) };
  }
};

module.exports = { handler };
