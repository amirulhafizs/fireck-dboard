import { Document, getCollection, GetCollectionOptions } from "api/collections";
import { useNotify } from "components/NotificationsProvider";
import { FilterType } from "components/TableElements/CollectionTable";
import { createIndex } from "components/TableElements/CreateIndex";
import { useEffect, useRef, useState, useCallback } from "react";

interface UseFetchProps {
  collectionId: string;
  filters?: FilterType[];
  orderBy?: { fieldId: string; direction: "asc" | "desc" };
  inView: boolean;
}

const useFetch = ({ collectionId, filters = [], orderBy, inView }: UseFetchProps) => {
  const [docs, setDocs] = useState<Document[]>([]);
  const inViewRef = useRef(false);
  const endReached = useRef(false);
  const filterSortTriggered = useRef(false);
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const abortController = useRef(new AbortController());
  const [filterSortCounter, setFilterSortCounter] = useState(0);

  const getOptions = useCallback(
    (data: Document[]) => {
      let options: GetCollectionOptions = { collectionId };

      options.where = "";
      options.orderBy = "";

      filters.forEach((f, i) => {
        options.where += (i > 0 ? ";" : "") + f.fieldId + "," + f.operator + "," + f.value;
        if (orderBy && orderBy.fieldId !== f.fieldId) {
          options.orderBy += (options.orderBy ? ";" : "") + f.fieldId;
        }
      });

      if (orderBy) {
        options.orderBy += (options.orderBy ? ";" : "") + `${orderBy.fieldId},${orderBy.direction}`;
      }
      if (!orderBy && !filters.length) {
        options.orderBy = "createdAt,asc";
      }

      if (data.length) {
        options.startAfter = data[data.length - 1][orderBy ? orderBy.fieldId : "createdAt"];
      }
      options.populateRef = false;

      return options;
    },
    [orderBy, filters, collectionId]
  );

  const onError = (message: string) => {
    if (message.includes("FAILED_PRECONDITION")) {
      createIndex(message.split("it here:")[1]);
    } else {
      notify(message, { variant: "error" });
    }
  };

  useEffect(() => {
    inViewRef.current = inView;
    const fetcher = async () => {
      if ((!endReached.current && inViewRef.current) || filterSortTriggered.current) {
        let triggeredBySortFilter = filterSortTriggered.current;
        filterSortTriggered.current = false;

        let options = getOptions(triggeredBySortFilter ? [] : docs);
        setLoading(true);

        const newData = await getCollection(options, abortController.current.signal);

        if (newData.error) {
          if (newData.error !== "aborted") {
            onError(newData.error);
          }
        } else {
          setDocs((prev) => (triggeredBySortFilter ? newData : [...prev, ...newData]));
          if (newData.length < (options.limit || 10)) {
            endReached.current = true;
          }
        }
        setLoading(false);
      }
    };
    fetcher();

    return () => {
      abortController.current.abort();
      abortController.current = new AbortController();
    };
  }, [inView, docs, filterSortCounter]);

  useEffect(() => {
    filterSortTriggered.current = true;
    endReached.current = false;
    setFilterSortCounter((prev) => prev + 1);
  }, [filters, orderBy]);

  return { docs, setDocs, loading };
};

export default useFetch;
