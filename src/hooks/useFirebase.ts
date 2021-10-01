import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";

const useFirebase = () => {
  const [firebase, setFirebase] = useState<any>(null);
  const [firebaseAppApiKey, projectId, firebaseUserToken] = useSelector((state: RootState) => [
    state.firebaseAppApiKey,
    state.projectId,
    state.firebaseUserToken,
  ]);

  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      const fbase = (await import("firebase/app")).default;
      await import("firebase/auth");
      await import("firebase/storage");
      setFirebase(fbase);
    })();
  }, []);

  useEffect(() => {
    if (firebaseUserToken && firebase && firebaseInitialized) {
      firebase
        .auth()
        .signInWithCustomToken(firebaseUserToken)
        .catch((er: any) => {
          console.log(er.toJSON());
        });
    }
  }, [firebaseUserToken, firebase, firebaseInitialized]);

  useEffect(() => {
    if (firebaseAppApiKey && projectId && firebase && !firebase.apps.length) {
      firebase.initializeApp({
        apiKey: firebaseAppApiKey,
        authDomain: `${projectId}.firebaseapp.com`,
        projectId: projectId,
        storageBucket: `${projectId}.appspot.com`,
      });
      setFirebaseInitialized(true);
    }
  }, [firebaseAppApiKey, projectId, firebase]);

  return firebase;
};

export default useFirebase;
