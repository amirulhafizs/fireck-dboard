import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

const useFirebase = () => {
  const [firebase, setFirebase] = useState<any>(null);
  const [firebaseAppApiKey, projectId, firebaseUserToken] = useSelector((state: RootState) => [
    state.firebaseAppApiKey,
    state.projectId,
    state.firebaseUserToken,
  ]);

  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (firebaseUserToken && firebase && firebaseInitialized) {
      firebase
        .auth()
        .signInWithCustomToken(firebaseUserToken)
        .catch((er: any) => {
          console.log(er.toJSON());
        });
    }
  }, [firebaseUserToken, firebaseInitialized]);

  useEffect(() => {
    if (firebaseAppApiKey && projectId && firebase && !firebase.apps.length) {
      let fbase = initializeApp({
        apiKey: firebaseAppApiKey,
        authDomain: `${projectId}.firebaseapp.com`,
        projectId: projectId,
        storageBucket: `${projectId}.appspot.com`,
      });
      setFirebase(fbase);
      setFirebaseInitialized(true);
    }
  }, [firebaseAppApiKey, projectId, firebase]);

  return firebase;
};

export default useFirebase;
