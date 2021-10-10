import store from "store";

export type FieldInputType =
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

export type FieldType = {
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
  isDefault: boolean;
};

export type CmsEvent = "find" | "find one" | "create" | "update" | "delete";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Webhooks = { [key in CmsEvent]: { method: HttpMethod; url: string } };

export interface CollectionType {
  id: string;
  name: string;
  fields: Array<FieldType>;
  draftable: boolean;
  single: boolean;
  docId: string;
  size: number;
  lastIndex: number;
  webhooks?: Webhooks;
}

const getAuthHeader = () => {
  const user = store.getState().user;
  const token = user ? user.token : null;
  return "Bearer " + token;
};

export const createCollectionType = (collectionType: CollectionType) => {
  return fetch(window.location.origin + "/private/collectionTypes", {
    method: "POST",
    body: JSON.stringify(collectionType),
    headers: {
      Authorization: getAuthHeader(),
    },
  }).then((x) => x.json());
};

export const updateCollectionType = (
  docId: string,
  collectionType: Partial<CollectionType>
): Promise<any | { error: string }> => {
  return fetch(window.location.origin + "/private/collectionTypes/" + docId, {
    method: "PUT",
    body: JSON.stringify(collectionType),
    headers: {
      Authorization: getAuthHeader(),
    },
  }).then((x) => x.json());
};

export const deleteCollectionType = (id: string) => {
  return fetch(window.location.origin + "/private/collectionTypes/" + id, {
    method: "DELETE",
    headers: {
      Authorization: getAuthHeader(),
    },
  }).then((x) => x.json());
};

export const findCollectionTypes = (token?: string) => {
  const { user } = store.getState();
  return fetch(window.location.origin + "/private/collectionTypes", {
    headers: {
      Authorization: "Bearer " + token || user.token,
    },
  }).then((x) => x.json());
};
