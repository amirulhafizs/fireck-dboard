import { FieldInputType, AnyField } from "../../src/api/collectionTypes";

const isValid: { [key in FieldInputType]: (a: any, type: AnyField) => boolean } = {
  media: (value, type) =>
    type.type === "media" && type.mediaSingle
      ? typeof value === "string"
      : Array.isArray(value) && !value.find((x) => typeof x !== "string"),
  string: (value) => typeof value === "string",
  number: (value) => !isNaN(value),
  document: (value) => typeof value === "object",
  collection: (value) => Array.isArray(value),
  boolean: (value) => typeof value === "boolean",
  array: (value) => Array.isArray(value),
  "rich-text": (value) => typeof value === "string",
  json: (value) => typeof value === "object",
  password: (value) => typeof value === "string",
  relation: (value, type) =>
    type.type === "relation" && type.relationOneToOne
      ? typeof value === "string"
      : Array.isArray(value) && !value.find((x) => typeof x !== "string"),
  date: (value) => typeof value === "string",
  enum: (value, type) => type.type === "enum" && type.enumOptions.includes(value),
  map: (value, type) => typeof value === "object",
  any: () => true,
};

export const validateObj = (fields: AnyField[], obj: Object) => {
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
