import { FieldType, FieldInputType } from "./handle";

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

export const validateObj = (fields: FieldType[], obj: Object) => {
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
