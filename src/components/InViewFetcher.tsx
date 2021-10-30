import Loader from "components/Loader";
import { InView } from "react-intersection-observer";
import React, { useEffect } from "react";

export interface InViewFetcherProps {
  fetcher: () => Promise<Array<any> | { error: any }>;
  onValue: (a: Array<any>) => void;
  onError?: (val: string) => void;
  limit: number;
}

const InViewFetcher: React.FC<InViewFetcherProps> = ({
  fetcher,
  onValue,
  limit,
  onError = () => {},
}) => {
  const [endReached, setEndReached] = React.useState(false);
  const isInView = React.useRef(false);

  const getter = async () => {
    let res = await fetcher();
    if (!("error" in res)) {
      onValue(res);
      if (!res.length || res.length < limit) {
        setEndReached(true);
      }
    } else {
      onError(res.error);
      setEndReached(true);
    }
  };

  useEffect(() => {
    if (isInView.current && !endReached) {
      getter();
    }
  }, [endReached, getter]);

  return (
    <InView
      className="w-full"
      onChange={async (inView) => {
        isInView.current = inView;
        if (inView) {
          getter();
        }
      }}
    >
      {!endReached ? (
        <div className="flex justify-center py-3">
          <Loader size="small"></Loader>
        </div>
      ) : (
        ""
      )}
    </InView>
  );
};

export default InViewFetcher;
