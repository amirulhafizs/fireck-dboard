import { useEffect, useState, useRef } from "react";
import { getEnv } from "api/netlify";

export interface Environment {
  SITE_ID: string;
  firebase_project_id: string;
  STRIPE: boolean;
}

const useEnv = () => {
  const [stopped, setStopped] = useState(false);
  const [env, setEnv] = useState<Environment>();
  const intervalRef = useRef<any>();

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await getEnv();
        setEnv(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (!stopped) {
      fn();
      intervalRef.current = setInterval(fn, 5000);
    }

    return () => clearInterval(intervalRef.current);
  }, [stopped]);

  return { env, unuseEnv: () => setStopped(true) };
};

export default useEnv;
