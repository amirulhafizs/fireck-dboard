import store from "store";

const getAuthHeader = () => {
  const user = store.getState().user;
  const token = user ? user.token : null;
  return "Bearer " + token;
};

function downloadObjectAsJson(exportObj: Object, exportName: string) {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export const exportJson = async (options: { [key: string]: boolean }) => {
  const obj = await fetch(window.location.origin + "/private/import-export/export", {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(options),
  }).then((x) => x.json());

  downloadObjectAsJson(obj, "FireckDatabaseSchema");
};

export const importJson = (json: Object) => {
  return fetch(window.location.origin + "/private/import-export/import", {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(json),
  }).then((x) => x.json());
};
