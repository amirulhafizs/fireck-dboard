import store from "store";

export const AuthorizeNetlify = () => {
  const clientId = "nUd1kbqtonuTSCTdmgtBrJyxLX0gpBWMp2BpOIMWhHc";
  const redirectURI = `https://fireck-auth.netlify.app/`;
  const appUrl = window.location.origin;
  const state = Math.random();
  localStorage.setItem(state.toString(), "true");
  const url = `https://app.netlify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectURI}&state=${appUrl}`;
  window.location.href = url;
};

export const handleAccessToken = (hash: any, setToken: any) => {
  const response = hash
    .replace(/^#/, "")
    .split("&")
    .reduce((result: any, pair: any) => {
      const keyValue = pair.split("=");
      result[keyValue[0]] = keyValue[1];
      return result;
    }, {});

  document.location.hash = "";

  setToken(response.access_token);
};

export const updateEnvVariables = async (env: { [key: string]: string }) => {
  const { siteId, netlifyAccessToken } = store.getState().configKeys;
  const site = await getSite(siteId, netlifyAccessToken);
  const newEnv = { ...site.build_settings.env, ...env };
  const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${netlifyAccessToken}`,
    },
    body: JSON.stringify({
      build_settings: {
        env: newEnv,
      },
    }),
  })
    .then((x) => x.json())
    .catch((error) => {
      return { error };
    });

  return response;
};

export const buildSite = async () => {
  const { siteId, netlifyAccessToken } = store.getState().configKeys;
  const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${netlifyAccessToken}`,
    },
  })
    .then((x) => x.json())
    .catch((error) => {
      return { error };
    });
  return response;
};

export const getBuilds = async (siteId: string, accessToken: string) => {
  const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((x) => x.json())
    .catch((error) => {
      return { error };
    });
  return response;
};

export const getSite = async (siteId: string, accessToken: string) => {
  const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((x) => x.json())
    .catch((error) => {
      return { error };
    });
  return response;
};

export const getEnv = async () => {
  const response = await fetch(window.location.origin + "/private/env")
    .then((x) => x.json())
    .catch((error) => {
      return { error };
    });
  return response;
};
