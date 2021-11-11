import { buildSite, getEnv, getSite, handleAccessToken, updateEnvVariables } from "api/netlify";
import store, { User } from "store";
import { getFirebaseAppConfig } from "api/firebaseApp";
import {
  createSuperAdmin,
  isSuperAdminSet,
  testAuthentication,
  testFirestore,
} from "api/adminUsers";
import { initializeApp } from "firebase/app";
import { ApperanceItem } from "pages/Appearance";
import { getCollection } from "api/collections";
import { login } from "api/adminUsers";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import cryptoRandomString from "crypto-random-string";

export const initialUser = {
  username: "",
  token: process.env.NODE_ENV === "development" ? "developing" : "",
  email: "",
};

export type ConfigState = {
  checkCompleted: boolean;
  isAdminSet: boolean;
  isAppCreated: boolean;
  adminSdkState: ConnectionState;
  firestoreWorks: boolean;
  authWorks: boolean;
  updateAvailable: boolean;
};

export type ConfigKeys = {
  netlifyAccessToken: string;
  siteId: string;
  projectId: string;
  firebaseAppApiKey: string;
};

export const initalConfigState: ConfigState = {
  adminSdkState: "not connected",
  isAdminSet: false,
  isAppCreated: false,
  checkCompleted: false,
  firestoreWorks: false,
  authWorks: false,
  updateAvailable: false,
};

export const initialConfigKeys = {
  netlifyAccessToken: "",
  siteId: "",
  projectId: "",
  firebaseAppApiKey: "",
};

export type ConnectionState = "connected" | "not connected" | "building";

export type Update = { available: boolean; gitName: string; gitRepo: string };

class TasksManagerClass {
  state: ConfigState = initalConfigState;
  keys: ConfigKeys = initialConfigKeys;
  user: User = initialUser;
  update: Update = { available: false, gitName: "", gitRepo: "" };
  COLORS_AMOUNT = 5;

  async initTasks() {
    await this.fetchSiteId();
    this.check();
    this.readNetlifyToken();
    this.initializeFirebase();
    this.fetchAppearance();
    this.fetchCollectionTypes();
    this.tryParseNetlifyToken();
    this.tryParseUserToken();
    this.checkIfUpdateAvailable();
  }

  check() {
    Promise.all([
      this.checkAdminSdkState(),
      this._testFirestore(),
      this._testAuthentication(),
      this.checkIfAdminIsCreated(),
    ])
      .then(() => {
        this.updateState("checkCompleted", true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateState<Key extends keyof ConfigState>(key: Key, value: ConfigState[Key]) {
    this.state[key] = value;
    store.dispatch({ type: "SET_CONFIG_STATE", payload: this.state });
  }

  updateKeys<Key extends keyof ConfigKeys>(key: Key, value: ConfigKeys[Key]) {
    this.keys[key] = value;
    store.dispatch({ type: "SET_CONFIG_KEYS", payload: this.keys });
  }

  setUser(user: User) {
    this.user = user;
    store.dispatch({ type: "SET_USER", payload: user });
  }

  setUpdate(update: Update) {
    this.update = update;
    store.dispatch({ type: "SET_UPDATE", payload: update });
  }

  async _createSuperAdmin(vals: any, notify: any) {
    const res = await createSuperAdmin(vals);
    if (!res.error) {
      TasksManager.updateState("isAdminSet", true);
      this.setUser(res);
      this.onLogin(res.firebaseToken);
      notify("Admin successfully created!", { variant: "success" });
    } else {
      notify(
        typeof res.error === "string"
          ? res.error
          : (res.error.details || "Erorr occured").toString(),
        {
          variant: "error",
        }
      );
    }
  }

  async _login(values: { email: string; password: string }, notify: any) {
    const res = await login(values);
    if (!res.error) {
      this.setUser(res);
      this.onLogin(res.firebaseToken);
    } else {
      notify(res.error, { variant: "error" });
    }
  }

  onLogin(firebaseToken?: string) {
    if (firebaseToken) {
      signInWithCustomToken(getAuth(), firebaseToken).catch((er: any) => {
        console.log(er.toJSON());
      });
    }

    this.fetchCollectionTypes();
    this.fetchAppearance();
  }

  async connectAdminSdk(adminKeysJson: { [key: string]: string }) {
    await updateEnvVariables({
      FIREBASE_ADMIN_CREDENTIAL: JSON.stringify(adminKeysJson),
      APP_SECRET: cryptoRandomString({ length: 100 }),
      PROJECT_ID: adminKeysJson.project_id,
    });
    await buildSite();
    this.checkAdminSdkState();
    const interval = setInterval(async () => {
      if (this.state.adminSdkState === "connected") {
        clearInterval(interval);
      } else {
        this.checkAdminSdkState();
      }
    }, 5000);
  }

  async checkAdminSdkState() {
    if (
      (this.state.adminSdkState !== "connected" && this.keys.siteId, this.keys.netlifyAccessToken)
    ) {
      const currentEnv = await getEnv();
      //get env exposes only PROJECT_ID and some other variables which are not sensitive
      const site = await getSite(this.keys.siteId, this.keys.netlifyAccessToken);
      const adminCredentialString = site.build_settings?.env?.FIREBASE_ADMIN_CREDENTIAL;
      const sdkJsonInBuild = adminCredentialString ? JSON.parse(adminCredentialString) : null;
      if (!sdkJsonInBuild) return;
      const newAdminState =
        currentEnv.PROJECT_ID && currentEnv.PROJECT_ID === sdkJsonInBuild.project_id
          ? "connected"
          : sdkJsonInBuild.project_id
          ? "building"
          : "not connected";
      this.updateState("adminSdkState", newAdminState);
    }
  }

  async checkIfUpdateAvailable() {
    const myApp = await fetch(`https://api.netlify.com/api/v1/sites/${this.keys.siteId}`).then(
      (x) => x.json()
    );
    const myAppPublishTime = myApp["published_deploy"]["published_at"];

    const repoUrl = myApp["repo_url"];
    const urlParts = repoUrl.split("/");
    let gitName = urlParts[urlParts.length - 2];
    let gitRepo = urlParts[urlParts.length - 1];

    const fireckApp = await fetch(
      "https://api.netlify.com/api/v1/sites/a93410c4-4afc-414d-a7a0-5a9a7073815d"
    ).then((x) => x.json());

    const fireckAppPublishTime = fireckApp["published_deploy"]["published_at"];
    this.setUpdate({ gitName, gitRepo, available: fireckAppPublishTime > myAppPublishTime });
  }

  readNetlifyToken() {
    const netlifyAccessToken = localStorage.getItem("netlify-access-token-for-fireck");
    if (netlifyAccessToken != null) {
      this.updateKeys("netlifyAccessToken", netlifyAccessToken);
    }
  }

  tryParseNetlifyToken() {
    if (window.location.hash.includes("access_token=")) {
      handleAccessToken(window.location.hash, (token: string) => {
        localStorage.setItem("netlify-access-token-for-fireck", token);
        this.updateKeys("netlifyAccessToken", token);
      });
    }
  }

  tryParseUserToken() {
    const search = new URLSearchParams(window.location.search);
    let token = search.get("user-token");
    if (token) {
      this.setUser({ token, username: "", email: "" });
      this.onLogin();
    }
  }

  _testFirestore() {
    return testFirestore().then((res) => {
      if (res.error) {
        return;
      }

      this.updateState("firestoreWorks", true);
    });
  }

  _testAuthentication() {
    return testAuthentication().then((res) => {
      if (res.error) {
        return;
      }
      this.updateState("authWorks", true);
    });
  }

  initializeFirebase() {
    getFirebaseAppConfig().then((res) => {
      if (res.error) return;
      initializeApp(res);
      this.updateState("isAppCreated", true);
    });
  }

  checkIfAdminIsCreated() {
    return isSuperAdminSet().then((res) => {
      if (res.error) return;
      this.updateState("isAdminSet", res);
      this.updateState("adminSdkState", "connected");
    });
  }

  setColors(colors: string[]) {
    if (colors.length === this.COLORS_AMOUNT * 2) {
      new Array(this.COLORS_AMOUNT).fill(0).forEach((x, i) => {
        let index = (i % this.COLORS_AMOUNT) + 1;
        document.documentElement.style.setProperty(`--fireck-${index}`, colors[i]);
        document.documentElement.style.setProperty(
          `--fireck-${index}-hover`,
          colors[this.COLORS_AMOUNT + i]
        );
      });
    }
  }

  async fetchAppearance() {
    const res = await getCollection({
      collectionId: "AppearanceReservedCollection",
      limit: 1000,
    });
    if (!res.error) {
      store.dispatch({ type: "SET_APPEARANCE", payload: res });
      let colors = res.find((x: ApperanceItem) => x.id === "colors")?.value;
      if (colors) {
        this.setColors(colors);
      }
    }
  }

  async fetchSiteId() {
    const envRes = await getEnv();
    if (envRes.SITE_ID) {
      this.updateKeys("siteId", envRes.SITE_ID);
    }
  }

  async fetchCollectionTypes() {
    store.dispatch({ type: "SET_LOADING", payload: true });
    let res = await getCollection({
      limit: 1000,
      collectionId: "CollectionTypesReservedCollection",
    });

    if (!res.error) {
      store.dispatch({
        type: "SET_COLLECTION_TYPES",
        payload: res,
      });
    }
    store.dispatch({ type: "SET_LOADING", payload: false });
  }
}

export const TasksManager = new TasksManagerClass();
