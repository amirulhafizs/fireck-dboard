import React from "react";
import { handleAccessToken } from "api/netlify";
import store from "store";
import { useHistory } from "react-router-dom";

export interface ReadNetlifyTokenProps {}

const ReadNetlifyToken: React.FC<ReadNetlifyTokenProps> = () => {
  const history = useHistory();

  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      handleAccessToken(hash, (token: string) => {
        store.dispatch({ type: "SET_NETLIFY_ACCESS_TOKEN", payload: token });
        history.push("/");
      });
    }
  }, [history]);
  return <div></div>;
};

export default ReadNetlifyToken;
