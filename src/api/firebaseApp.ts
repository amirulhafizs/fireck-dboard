export const getFirebaseAppConfig = () => {
  return fetch(window.location.origin + "/private/app")
    .then((x) => x.json())
    .catch((error) => ({ error }));
};
