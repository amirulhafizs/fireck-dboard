import store from "store";

const getAuthHeader = () => {
  const user = store.getState().user;
  const token = user ? user.token : null;
  return "Bearer " + token;
};

export const getAllIntegrations = () => {
  return fetch(window.location.origin + "/private/integrations", {
    headers: { Authorization: getAuthHeader() },
  }).then((x) => x.json());
};

export const getIntegration = (integrationId: string) => {
  return fetch(window.location.origin + "/private/integrations/" + integrationId, {
    headers: { Authorization: getAuthHeader() },
  }).then((x) => x.json());
};

export const updateIntegration = (integrationId: string, updates: Object) => {
  return fetch(window.location.origin + "/private/integrations/" + integrationId, {
    method: "PUT",
    headers: { Authorization: getAuthHeader() },
    body: JSON.stringify(updates),
  }).then((x) => x.json());
};
