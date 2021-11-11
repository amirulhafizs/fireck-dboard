import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import shortuuid from "short-uuid";

class FilesManagerClass {
  upload(file: File): Promise<{ downloadUrl: string; fileName: string } | { error: string }> {
    return new Promise((resolve) => {
      try {
        const storage = getStorage();
        const nameParts = file.name.split(".");
        const fileName = shortuuid.generate() + "." + nameParts[nameParts.length - 1];
        let fileRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            resolve({ error: error.name });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              resolve({ downloadUrl, fileName });
            });
          }
        );
      } catch (error: any) {
        resolve({ error });
      }
    });
  }

  delete(path: string) {
    const storage = getStorage();
    deleteObject(ref(storage, path));
  }
}

export const FilesManager = new FilesManagerClass();
