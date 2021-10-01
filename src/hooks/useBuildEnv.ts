import { useSelector } from "react-redux";
import { getSite } from "api/netlify";
import { RootState } from "store";
import { useEffect, useState, useRef } from "react";

const useBuildEnv = () => {
  const { siteId, netlifyAccessToken } = useSelector((state: RootState) => ({
    siteId: state.siteId,
    netlifyAccessToken: state.netlifyAccessToken,
  }));

  const [stopped, setStopped] = useState(false);
  const [buildEnv, setBuildEnv] = useState();

  useEffect(() => {}, [siteId, netlifyAccessToken, stopped]);
};

export default useBuildEnv;
