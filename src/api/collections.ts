import store from "store";

const getAuthHeader = () => {
  const user = store.getState().user;
  const token = user ? user.token : null;
  return "Bearer " + token;
};

export interface Document {
  docId: string;
  created_at: string;
  modified_at: string;
  [index: string]: any;
}

export interface GetCollectionOptions {
  collectionId: string;
  orderBy?: string;
  startAt?: number | string;
  startAfter?: number | string;
  where?: string;
  limit?: number;
  populateRef?: boolean;
}

export const getCollection = (
  {
    collectionId,
    orderBy,
    startAt,
    startAfter,
    where,
    limit = 10,
    populateRef = true,
  }: GetCollectionOptions,
  signal?: AbortSignal
) => {
  const url = `${
    window.location.origin
  }/api/${collectionId}?limit=${limit}&populateRef=${populateRef}${
    orderBy ? `&orderBy=${orderBy}` : ""
  }${startAt ? `&startAt=${startAt}` : startAfter ? `&startAfter=${startAfter}` : ""}${
    where ? `&where=${where}` : ""
  }`;
  return fetch(url, { headers: { Authorization: getAuthHeader() }, signal })
    .then((x) => x.json())
    .catch((error: any) => {
      if (error.code && error.code === 20) {
        return { error: "aborted" };
      }
      return { error: error.toString() };
    });
};

export const addDocument = (collectionId: string, doc: { [index: string]: any }) => {
  try {
    return fetch(window.location.origin + `/api/${collectionId}`, {
      method: "POST",
      headers: { Authorization: getAuthHeader() },
      body: JSON.stringify(doc),
    }).then((x) => x.json());
  } catch (error) {
    return { error };
  }
};

export const deleteDocument = (collectionId: string, docId: string) => {
  try {
    return fetch(window.location.origin + `/api/${collectionId}/${docId}`, {
      method: "DELETE",
      headers: { Authorization: getAuthHeader() },
    }).then((x) => x.json());
  } catch (error) {
    return { error };
  }
};

export const getDocument = (collectionId: string, docId: string) => {
  try {
    return fetch(
      window.location.origin + `/api/${collectionId}${docId ? `/${docId}` : ""}?populateRef=false`,
      {
        headers: { Authorization: getAuthHeader() },
      }
    ).then((x) => x.json());
  } catch (error) {
    return { error };
  }
};

export const updateDocument = (
  collectionType: string,
  docId: string,
  doc: { [index: string]: any }
) => {
  try {
    return fetch(window.location.origin + `/api/${collectionType}/${docId}`, {
      method: "PUT",
      headers: { Authorization: getAuthHeader() },
      body: JSON.stringify(doc),
    }).then((x) => x.json());
  } catch (error) {
    return { error };
  }
};
