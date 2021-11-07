import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

const useUpdateAvailable = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [gitName, setGitName] = useState("");
  const [gitRepo, setGitRepo] = useState("");
  const siteId = useSelector((state: RootState) => state.siteId);

  useEffect(() => {
    if (siteId) {
      (async () => {
        try {
          const myApp = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`).then((x) =>
            x.json()
          );
          const myAppPublishTime = myApp["published_deploy"]["published_at"];
          const repoUrl = myApp["repo_url"];
          const urlParts = repoUrl.split("/");
          setGitName(urlParts[urlParts.length - 2]);
          setGitRepo(urlParts[urlParts.length - 1]);
          const fireckApp = await fetch(
            "https://api.netlify.com/api/v1/sites/a93410c4-4afc-414d-a7a0-5a9a7073815d"
          ).then((x) => x.json());

          const fireckAppPublishTime = fireckApp["published_deploy"]["published_at"];

          setUpdateAvailable(fireckAppPublishTime > myAppPublishTime);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [siteId]);

  return { updateAvailable, gitName, gitRepo };
};

export default useUpdateAvailable;
