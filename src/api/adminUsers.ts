import store from "store";

const getAuthHeader = () => {
  const user = store.getState().user;
  const token = user ? user.token : null;
  return "Bearer " + token;
};

export const isSuperAdminSet = () => {
  return fetch(window.location.origin + "/private/admin/isSuperAdminCreated").then((x) => x.json());
};

export const createSuperAdmin = (superAdmin: {
  password: string;
  confirmationPassword: string;
  email: string;
  subscribeEmails: boolean;
}) => {
  return fetch(window.location.origin + "/private/admin/createSuperAdmin", {
    method: "POST",
    body: JSON.stringify({ ...superAdmin }),
  }).then((x) => x.json());
};

export const login = (credentials: { email: string; password: string }, firebase: any) => {
  return fetch(window.location.origin + "/private/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  }).then((x) => x.json());
};

export const completeApp = () => {
  return fetch(window.location.origin + "/private/admin/completeApp").then((x) => x.json());
};

export const testFirestore = () => {
  return fetch(window.location.origin + "/private/admin/testFirestore").then((x) => x.json());
};

export const testAuthentication = () => {
  return fetch(window.location.origin + "/private/admin/testAuthentication").then((x) => x.json());
};

export const getAppearance = () => {
  return fetch(window.location.origin + "/private/admin/getAppearance", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

export const updateAppearance = (updates: { logo?: string; colors?: string[] }) => {
  return fetch(window.location.origin + "/private/admin/updateAppearance", {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(updates),
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

export const createApp = () => {
  return fetch(window.location.origin + "/private/admin/createApp", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

export const getLastDeployment = () => {
  return fetch(window.location.origin + "/private/admin/getDeployment", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};

export const setDeployment = () => {
  return fetch(window.location.origin + "/private/admin/setDeployment", {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((x) => x.json())
    .catch((error) => ({ error }));
};
