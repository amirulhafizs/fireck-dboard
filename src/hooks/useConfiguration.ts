import React from "react";
import { getEnv, getSite } from "api/netlify";
import store from "store";
import { getFirebaseAppConfig } from "api/firebaseApp";
import { getAppearance, isSuperAdminSet, testAuthentication, testFirestore } from "api/adminUsers";
import { ConnectionState } from "types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { getAllIntegrations } from "api/integrations";
import { getCollection } from "api/collections";
import { ApperanceItem } from "pages/Appearance";
import { COLORS_AMOUNT } from "pages/Appearance/Colors";

export const setColors = (colors: string[]) => {
  if (colors.length === COLORS_AMOUNT * 2) {
    new Array(COLORS_AMOUNT).fill(0).forEach((x, i) => {
      let index = (i % COLORS_AMOUNT) + 1;
      document.documentElement.style.setProperty(`--fireck-${index}`, colors[i]);
      document.documentElement.style.setProperty(
        `--fireck-${index}-hover`,
        colors[COLORS_AMOUNT + i]
      );
    });
  }
};

const useConfiguration = () => {
  const [checkCompleted, setCheckCompleted] = React.useState(false);
  const [adminSdkState, setAdminSdkState] = React.useState<ConnectionState>("not connected");
  const [isAdminSet, setIsAdminSet] = React.useState(false);
  const [isAppCreated, setIsAppCreated] = React.useState(false);
  const [firestoreWorks, setFirestoreWorks] = React.useState(false);
  const [authWorks, setAuthWorks] = React.useState(false);
  const dispatch = useDispatch();

  const { siteId, netlifyAccessToken, user } = useSelector((state: RootState) => ({
    siteId: state.siteId,
    netlifyAccessToken: state.netlifyAccessToken,
    user: state.user,
  }));
  const intervalRef = React.useRef<any>(null);

  React.useEffect(() => {
    (async () => {
      // netlify access token
      const netlifyAccessToken = localStorage.getItem("netlify-access-token-for-fireck");
      if (netlifyAccessToken != null) {
        store.dispatch({ type: "SET_NETLIFY_ACCESS_TOKEN", payload: netlifyAccessToken });
      }
      // netlify access token

      // project id | site id
      const envRes = await getEnv();
      if (envRes.SITE_ID) {
        store.dispatch({ type: "SET_SITE_ID", payload: envRes.SITE_ID });
      }
      if (envRes.project_id) {
        store.dispatch({ type: "SET_PROJECT_ID", payload: envRes.project_id });
        setAdminSdkState("connected");
      } else {
        // If firebase admin sdk connected, we need to check if all services enabled. Othterwise we can set that check is completed when firebase conneceted is checked
        setCheckCompleted(true);
      }
      // project id | site id
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      // If firebase admin sdk connected, we need to check if all services enabled. Othterwise we can set that check is completed when firebase conneceted is chekced
      if (adminSdkState === "connected") {
        setCheckCompleted(false);
        const promises = [];

        // firestore crashes or not

        promises.push(
          testFirestore().then((res) => {
            if (res.error) {
              return;
            }
            setFirestoreWorks(true);
          })
        );

        // firestore crashes or not

        // auth crashes or not

        promises.push(
          testAuthentication().then((res) => {
            if (res.error) {
              return;
            }
            setAuthWorks(true);
          })
        );

        // auth crashes or not

        //firebase app config
        promises.push(
          getFirebaseAppConfig().then((res) => {
            if (!("error" in res)) {
              store.dispatch({ type: "SET_FIREBASE_APP_API_KEY", payload: res.apiKey });
              setIsAppCreated(true);
            }
          })
        );

        //firebase app config

        // is admin set
        promises.push(
          isSuperAdminSet().then((res) => {
            if (!res.error) {
              setIsAdminSet(res);
            }
          })
        );

        await Promise.all(promises).catch((error) => error);
        // await new Promise((resolve, reject) => setTimeout(resolve, 200));
        setCheckCompleted(true);

        // is admin set
      }
    })();
  }, [adminSdkState]);

  React.useEffect(() => {
    const fn = async () => {
      try {
        const currentEnv = await getEnv();
        const site = await getSite(siteId, netlifyAccessToken);
        const adminCredentialString = site.build_settings.env.FIREBASE_ADMIN_CREDENTIAL;
        const adminCredential = adminCredentialString ? JSON.parse(adminCredentialString) : null;
        if (!adminCredential) return;
        const newAdminState =
          currentEnv.project_id && currentEnv.project_id === adminCredential.project_id
            ? "connected"
            : adminCredential.project_id
            ? "building"
            : "not connected";

        setAdminSdkState(newAdminState);
      } catch (error) {
        console.log(error);
      }
    };
    if (netlifyAccessToken && siteId && adminSdkState !== "connected") {
      fn();
      intervalRef.current = setInterval(fn, 5000);
    }

    return () => clearInterval(intervalRef.current);
  }, [siteId, netlifyAccessToken, adminSdkState]);

  React.useEffect(() => {
    (async () => {
      try {
        if (isAdminSet) {
          //colors are being set when super admin is being created I suppose.
          const res = await getCollection({
            collectionId: "AppearanceReservedCollection",
            limit: 1000,
          });
          if (!res.error) {
            store.dispatch({ type: "SET_APPEARANCE", payload: res });
            let colors = res.find((x: ApperanceItem) => x.id === "colors")?.value;
            if (colors) {
              setColors(colors);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isAdminSet]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getAllIntegrations();
        dispatch({ type: "UPDATE_INTEGRATIONS", payload: res });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, user]);

  return {
    checkCompleted,
    adminSdkState,
    isAppCreated,
    setIsAppCreated,
    isAdminSet,
    setIsAdminSet,
    authWorks,
    firestoreWorks,
    setFirestoreWorks,
    setAuthWorks,
  };
};

export default useConfiguration;
