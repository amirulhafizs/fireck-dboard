import { getFileExtension } from "helper";
import store from "store";
import { addDocument, deleteDocument, updateDocument } from "./collections";
import { FilesManager } from "facades/FilesManager";

export const uploadFile = async (file: File): Promise<{ error: string } | any> => {
  try {
    const res = await FilesManager.upload(file);

    if ("error" in res) {
      return res;
    } else {
      const fileDetails = {
        name: file.name,
        size: file.size,
        url: res.downloadUrl,
        storagePath: res.fileName,
        type: getFileExtension(file),
      };
      return addDocument("FilesReservedCollection", fileDetails);
    }
  } catch (error: any) {
    return { error: error.toString() };
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
    FilesManager.delete(storagePath);
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
