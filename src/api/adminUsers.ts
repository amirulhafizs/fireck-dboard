import store from "store";
import apiUrl from "./API_URL";

const getAuthHeader = () => {
  const user = store.getState().user;
  const token = user ? user.token : null;
  return "Bearer " + token;
};

export const isSuperAdminSet = () => {
  return fetch(apiUrl + "/private/admin/isSuperAdminCreated").then((x) => x.json());
};

export const createSuperAdmin = (superAdmin: {
  password: string;
  confirmationPassword: string;
  email: string;
  subscribeEmails: boolean;
}) => {
  return fetch(apiUrl + "/private/admin/createSuperAdmin", {
    method: "POST",
    body: JSON.stringify({ ...superAdmin }),
  }).then((x) => x.json());
};

export const login = (credentials: { email: string; password: string }) => {
  return fetch(apiUrl + "/private/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  }).then((x) => x.json());
};

export const completeApp = () => {
  return fetch(apiUrl + "/private/admin/completeApp").then((x) => x.json());
};

export const testFirestore = () => {
  return fetch(apiUrl + "/private/admin/testFirestore").then((x) => x.json());
};

export const testAuthentication = () => {
  return fetch(apiUrl + "/private/admin/testAuthentication").then((x) => x.json());
};

export const getAppearance = () => {
  return fetch(apiUrl + "/private/admin/getAppearance", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

export const createApp = () => {
  return fetch(apiUrl + "/private/admin/createApp", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

export const getLastDeployment = () => {
  return fetch(apiUrl + "/private/admin/getDeployment", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

export const setDeployment = () => {
  return fetch(apiUrl + "/private/admin/setDeployment", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};
