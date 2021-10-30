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
  const [docs, setDocs] = useState<Document[]>([]);
  const inViewRef = useRef(false);
  const endReached = useRef(false);
  const notify = useNotify();

  console.log("in view, orderBy, filters", inView, orderBy, filters);

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
    (async () => {
      try {
        if (orderBy || filters.length) {
          endReached.current = false;
          let options = getOptions([]);
          const newData = await getCollection(options);
          if (newData.error) {
            onError(newData.error);
          } else {
            setDocs(newData);
            if (newData.length < (options.limit || 10)) {
              endReached.current = true;
            }
          }
        }
      } catch (er) {
        console.log(er);
      }
    })();
  }, [orderBy, filters]);

  useEffect(() => {
    inViewRef.current = inView;
    const fetcher = async () => {
      if (!endReached.current && inViewRef.current) {
        let options = getOptions(docs);
        console.log(options);
        const newData = await getCollection(options);
        if (
          (newData.length &&
            docs.length &&
            newData[newData.length - 1].docId !== docs[docs.length - 1].docId) ||
          !docs.length
        ) {
          setDocs((prev) => [...prev, ...newData]);
        }

        if (newData.length < (options.limit || 10)) {
          endReached.current = true;
        }
      }
    };
    fetcher();
  }, [inView, docs]);

  return { docs, setDocs };
};

export default useFetch;
