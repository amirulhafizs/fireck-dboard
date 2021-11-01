import { Document, getCollection, GetCollectionOptions } from "api/collections";
import { useNotify } from "components/NotificationsProvider";
import { FilterType } from "components/TableElements/CollectionTable";
import { createIndex } from "components/TableElements/CreateIndex";
import { useEffect, useRef, useState, useCallback } from "react";

const useFetch = (
  collectionId: string,
  filters: FilterType[],
  orderBy: { fieldId: string; direction: "asc" | "desc" } | undefined,
  inView: boolean
) => {
  const [latestDocs, setLatestDocs] = useState<Document[]>([]);
  const [docs, setDocs] = useState<Document[]>([]);
  const inViewRef = useRef(false);
  const endReached = useRef(false);
  const notify = useNotify();
  const [loading, setLoading] = useState(false);

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
      if (!endReached.current && inViewRef.current) {
        let options = getOptions(docs);
        setLoading(true);
        const newData = await getCollection(options);
        if (newData.error) {
          onError(newData.error);
        } else {
          let arr = [...docs];
          setLatestDocs([...arr, ...newData]);
          if (newData.length < (options.limit || 10)) {
            endReached.current = true;
          }
        }
        setLoading(false);
      }
    };
    fetcher();
  }, [inView, docs]);

  useEffect(() => {
    setDocs([]);
    endReached.current = false;
  }, [filters, orderBy]);

  useEffect(() => {
    //if docs will be updated from outside
    setDocs(latestDocs);
  }, [latestDocs]);

  return { docs: latestDocs, setDocs: setLatestDocs, loading };
};

export default useFetch;
