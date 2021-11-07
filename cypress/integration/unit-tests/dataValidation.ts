/// <reference types="cypress" />

import { validateObj } from "../../../functions/handle/validateObj";
import { AnyField, CollectionType } from "../../../src/api/collectionTypes";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

const EverythingCollectionType: CollectionType = {
  fields: [
    {
      displayOnTable: true,
      type: "date",
      id: "createdAt",
      isDefault: true,
    },
    {
      displayOnTable: true,
      isDefault: true,
      id: "modifiedAt",
      type: "date",
    },
    {
      type: "string",
      stringLong: false,
      displayOnTable: true,
      id: "docId",
      isDefault: true,
    },
    {
      id: "string",
      isDefault: false,
      stringLong: false,
      type: "string",
      displayOnTable: true,
    },
    {
      displayOnTable: true,
      type: "number",
      id: "number",
      isDefault: false,
    },
    {
      id: "map",
      type: "map",
      displayOnTable: true,
      isDefault: false,
    },
    {
      displayOnTable: true,
      id: "array",
      type: "array",
      isDefault: false,
    },
    {
      isDefault: false,
      displayOnTable: true,
      type: "boolean",
      id: "boolean",
    },
    {
      displayOnTable: true,
      type: "date",
      id: "date",
      isDefault: false,
    },
    {
      id: "media-multiple",
      mediaSingle: false,
      isDefault: false,
      displayOnTable: true,
      type: "media",
    },
    {
      mediaSingle: true,
      id: "media-single",
      displayOnTable: true,
      isDefault: false,
      type: "media",
    },
    {
      id: "rich-text",
      isDefault: false,
      type: "rich-text",
      displayOnTable: true,
    },
    {
      isDefault: false,
      type: "json",
      displayOnTable: true,
      id: "json",
    },
    {
      id: "enum",
      isDefault: false,
      displayOnTable: true,
      enumOptions: ["option 1", "option 2", "option 3"],
      type: "enum",
    },
    {
      id: "password",
      type: "password",
      displayOnTable: true,
      isDefault: false,
    },
    {
      displayOnTable: true,
      relatedCollectionTypeDocId: "4MPyAf0MlZyh6nJd7FK5",
      id: "relation-one-one",
      relationOneToOne: true,
      type: "relation",
      isDefault: false,
    },
    {
      relationOneToOne: false,
      isDefault: false,
      type: "relation",
      displayOnTable: true,
      id: "relation-one-many",
      relatedCollectionTypeDocId: "4MPyAf0MlZyh6nJd7FK5",
    },
  ],
  name: "minified",
  single: false,
  draftable: true,
  createdAt: "2021-11-06T17:35:05.143Z",
  id: "minified",
  docId: "qippk80TGhdUB4iuizU9",
  modifiedAt: "2021-11-06T17:45:11.602Z",
  size: 0,
  isSystem: false,
};

const ValidDocument = {
  json: {
    "123": "123",
  },
  "relation-one-one": "xQZLz2TiYfpGFl6bh8Mk",
  password: "2343244324",
  createdAt: "2021-11-06T17:51:05.831Z",
  "rich-text": "rich text content ",
  map: {
    "123": "123",
  },
  array: [1, 2, 3, 4],
  "relation-one-many": [
    "IzCYdecochIOFC06dbiO",
    "8La0ncj67Yx7jSHtihxj",
    "SvxpQdmvw6bIsX4qPLRD",
    "GNQMa5a8sxhqko2f3lo9",
  ],
  docId: "aG99ezR2triIRv6ljVtz",
  date: "2021-12-02",
  "media-single":
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/81da7192-3093-4e0e-8ae9-5ea3b60be3cc.pdf?alt=media&token=5d772f47-5d54-4a81-ab2f-4bf78003d66d",
  string: "string",
  number: 123,
  boolean: true,
  "media-multiple": [
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/f547ca3b-4442-48a5-8309-5950fa47b46b.pdf?alt=media&token=cab74d09-2515-4d54-b5f7-5976ca105faf",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/6288b324-241f-48db-a13c-8f9fa5896b6c.mdzip?alt=media&token=ec2ae5a4-8b8a-4134-9430-4f26fa3b0b95",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/81da7192-3093-4e0e-8ae9-5ea3b60be3cc.pdf?alt=media&token=5d772f47-5d54-4a81-ab2f-4bf78003d66d",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/2e0023dd-f70c-4753-aaba-9d37a5b8d08f.pdf?alt=media&token=5afc4974-4592-4458-a9bf-df321215a538",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/htQYLmYJXQ7HxDPg7KNgW3.png?alt=media&token=1e390a5d-fc3a-44ea-ada6-3d93b47a338c",
  ],
  modifiedAt: "2021-11-06T17:51:05.831Z",
  enum: "option 1",
};

const InvalidDocument = {
  json: "asdasdasd",
  "relation-one-one": ["xQZLz2TiYfpGFl6bh8Mk"],
  password: 123123123,
  createdAt: {},
  "rich-text": [],
  map: "Asdasdads",
  array: { asd: "asd", qwe: "asd" },
  "relation-one-many": [{ asd: "asd" }, { asdada: "asdasd" }],
  docId: [123, 123.234, 123],
  date: {},
  "media-single": ["asdada", "Asdsad", "Asdasd"],
  string: ["asdasd"],
  number: "asdsadadas",
  boolean: "asdasdas",
  "media-multiple": [
    { a: "asdasda" },
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/f547ca3b-4442-48a5-8309-5950fa47b46b.pdf?alt=media&token=cab74d09-2515-4d54-b5f7-5976ca105faf",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/6288b324-241f-48db-a13c-8f9fa5896b6c.mdzip?alt=media&token=ec2ae5a4-8b8a-4134-9430-4f26fa3b0b95",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/81da7192-3093-4e0e-8ae9-5ea3b60be3cc.pdf?alt=media&token=5d772f47-5d54-4a81-ab2f-4bf78003d66d",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/2e0023dd-f70c-4753-aaba-9d37a5b8d08f.pdf?alt=media&token=5afc4974-4592-4458-a9bf-df321215a538",
    "https://firebasestorage.googleapis.com/v0/b/fireck-4c36e.appspot.com/o/htQYLmYJXQ7HxDPg7KNgW3.png?alt=media&token=1e390a5d-fc3a-44ea-ada6-3d93b47a338c",
  ],
  modifiedAt: {},
  enum: { asd: "asd" },
};

describe("Server side data validation", () => {
  it("Document with all possible fields and all are valid", () => {
    expect(validateObj(EverythingCollectionType.fields, ValidDocument)).to.deep.equal(
      ValidDocument
    );
  });

  console.log(validateObj(EverythingCollectionType.fields, InvalidDocument));

  it("Document with all possible fields and all are invalid", () => {
    expect(
      Object.keys(validateObj(EverythingCollectionType.fields, InvalidDocument)).length
    ).to.be.equal(0);
  });
});
