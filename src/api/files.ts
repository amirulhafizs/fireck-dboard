import firebase from "firebase";
import store from "store";
import { v4 } from "uuid";
import { addDocument, deleteDocument, updateDocument } from "./collections";

export const uploadFileToStorage = (
  file: File
): Promise<{ downloadUrl: string; fileName: string } | { error: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const storage = firebase.storage();

      const metadata = {
        contentType: file.type,
      };

      const nameParts = file.name.split(".");

      const fileName = v4() + "." + nameParts[nameParts.length - 1];
      let ref = storage.ref(fileName);
      const uploadTask = ref.put(file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          resolve({ error: error.message });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            resolve({ downloadUrl, fileName });
          });
        }
      );
    } catch (error: any) {
      resolve({ error });
    }
  });
};

export const uploadFile = async (file: File): Promise<{ error: string } | any> => {
  try {
    const res = await uploadFileToStorage(file);
    if ("error" in res) {
      return res;
    } else {
      const fileDetails = {
        name: file.name,
        size: file.size,
        url: res.downloadUrl,
        storagePath: res.fileName,
      };
      return addDocument("FilesReservedCollection", fileDetails);
    }
  } catch (error) {
    return { error };
  }
};

export type FileDocument = {
  docId: string;
  name: string;
  size: number;
  storagePath: string;
  createdAt: number;
  url: string;
};

export const getFiles = async ({
  limit = 10,
  orderBy,
  startAt,
  startAfter,
}: {
  limit?: number;
  orderBy: string;
  startAt?: string | number;
  startAfter?: string | number;
}): Promise<Array<FileDocument> | { error: string }> => {
  try {
    const user = store.getState().user;
    const token = user ? user.token : null;
    return fetch(
      window.location.origin +
        `/private/files?limit=${limit}${
          startAt ? "&startAt=" + startAt : ""
        }&orderBy=${orderBy},desc${startAfter ? `&startAfter=${startAfter}` : ""}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    ).then((x) => x.json());
  } catch (error: any) {
    return { error };
  }
};

export const getFilesCount = async () => {
  try {
    const user = store.getState().user;
    const token = user ? user.token : null;
    return fetch(window.location.origin + `/private/files/count`, {
      headers: { Authorization: "Bearer " + token },
    }).then((x) => x.json());
  } catch (error) {
    return { error };
  }
};

export const deleteFile = (docId: string, storagePath: string) => {
  try {
    const storage = firebase.storage();
    storage.ref(storagePath).delete();

    return deleteDocument("FilesReservedCollection", docId);
  } catch (error) {
    return { error };
  }
};

export const editFile = (docId: string, updates: { [key: string]: any }) => {
  try {
    return updateDocument("FilesReservedCollection", docId, updates);
  } catch (error) {
    return { error };
  }
};
