import { Document } from "api/collections";
import { CollectionType, FieldType, updateCollectionType } from "api/collectionTypes";
import { getCollection, GetCollectionOptions, deleteDocument } from "api/collections";
import FilesCell from "./FilesCell";
import InViewFetcher from "components/InViewFetcher";
import React from "react";
import ExpandMoreRounded from "@material-ui/icons/ExpandMoreRounded";
import { useHistory } from "react-router-dom";
import { confirm } from "components/Confirm";
import store from "store";
import AddFilter from "./AddFilter";
import { createIndex } from "./CreateIndex";
import { useNotify } from "components/NotificationsProvider";
import Button from "components/Button";
import { configureView } from "components/TableViewConfig";
import SimpleBar from "simplebar-react";
import SelectBar from "./SelectBar";
import ActionsBar from "./ActionsBar";
import classNames from "classnames";

export interface TableProps {
  collectionType: CollectionType;
  onSelect?: (a: Document[]) => void;
  blackList?: string[];
  singleSelect?: boolean;
}

const Table: React.FC<TableProps> = ({
  collectionType,
  onSelect,
  blackList = [],
  singleSelect = false,
}) => {
  const _configureView = async () => {
    configureView({
      fields: collectionType.fields,
      callback: onConfigureView,
    });
  };

  const history = useHistory();
  const notify = useNotify();
  type filterType = { fieldId: string; operator: string; value: string };
  const [filters, setFilters] = React.useState<filterType[]>([]);

  const [docs, setDocs] = React.useState<Document[]>([]);

  const fields = collectionType.fields.filter((field) => field.displayOnTable);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [orderBy, setOrderBy] = React.useState<{ fieldId: string; direction: "asc" | "desc" }>();
  const [hoveredRow, setHoveredRow] = React.useState(-1);

  React.useEffect(() => {
    setDocs([]);
  }, [orderBy, filters]);

  const onEdit = (doc: Document) => {
    history.push(`/collections/${collectionType.id}/edit/${doc.docId}`);
  };

  const onDelete = async (doc: Document) => {
    if (await confirm({ confirmation: "Do you really want to delete the document?" })) {
      deleteDocument(collectionType.id, doc.docId);
      setDocs((prev) => {
        let arr = [...prev];
        const index = arr.findIndex((x) => x.docId === doc.docId);
        arr.splice(index, 1);
        return arr;
      });
    }
  };

  const onDeleteSelected = async () => {
    if (
      await confirm({ confirmation: `Do you really want to delete ${selected.length} documents?` })
    ) {
      selected.forEach((x) => {
        deleteDocument(collectionType.id, x);
      });
      setDocs((prev) => prev.filter((x) => !selected.includes(x.docId)));
      setSelected([]);
    }
  };

  const onConfigureView = ({
    fields,
    displayDocIdOnTable,
  }: {
    fields: FieldType[];
    displayDocIdOnTable?: boolean;
  }) => {
    const display = displayDocIdOnTable != null ? displayDocIdOnTable : true;
    updateCollectionType(collectionType.docId, {
      ...collectionType,
      fields,
    });

    store.dispatch({
      type: "UPDATE_COLLECTION",
      docId: collectionType.docId,
      payload: { fields, displayDocIdOnTable: display },
    });
  };

  const onOrder = (field: FieldType) =>
    orderBy?.fieldId !== field.id
      ? () => {
          setOrderBy({ fieldId: field.id, direction: "asc" });
        }
      : orderBy?.direction !== "asc"
      ? () => setOrderBy(undefined)
      : () => setOrderBy({ fieldId: field.id, direction: "desc" });

  return (
    <>
      <div className="flex justify-between mb-3">
        <AddFilter
          collectionType={collectionType}
          onValue={(val: filterType) => setFilters((prev) => [val, ...prev])}
        ></AddFilter>
        {!onSelect ? (
          <Button
            noMinWidth
            onClick={onDeleteSelected}
            disabled={selected.length === 0}
            className={`px-10 ${
              selected.length === 0
                ? "bg-gray-300 text-gray-500 cursor-default"
                : "bg-blue-300 hover:bg-blue-400 text-white"
            } `}
          >
            Delete
          </Button>
        ) : (
          <Button
            onClick={() => onSelect(docs.filter((x) => selected.includes(x.docId)))}
            className={`${
              selected.length === 0
                ? "bg-gray-300 text-gray-500 cursor-default"
                : "bg-blue-300 hover:bg-blue-400 text-white"
            } `}
          >
            Select
          </Button>
        )}
      </div>
      <div className="flex flex-wrap text-sm">
        {filters.map((f, i) => (
          <div
            key={`f-${i}`}
            className="text-blue-400 rounded h-34px leading-34px pl-5 pr-3 flex mr-3 mb-3 relative"
          >
            <div className="absolute left-0 top-0 w-full h-full bg-blue-400 opacity-10 rounded pointer-events-none"></div>
            {f.fieldId} {f.operator} {f.value}{" "}
            <span
              onClick={() =>
                setFilters((prev) => {
                  let arr = [...prev];
                  arr.splice(i, 1);
                  return arr;
                })
              }
              className="text-xs leading-34px ml-3 cursor-pointer"
            >
              ✕
            </span>
          </div>
        ))}
      </div>
      <SimpleBar className="relative scrollbar-dark md:max-h-40vw max-h-96 -mr-3">
        <SelectBar
          hoveredRow={hoveredRow}
          docs={docs}
          onSelect={(docId, checked) => {
            if (checked) {
              setSelected((prev) => [...prev, docId]);
              return;
            }
            setSelected((prev) => {
              let arr = [...prev];
              let index = arr.findIndex((x) => x === docId);
              if (index != null) {
                arr.splice(index, 1);
              }
              return arr;
            });
          }}
          selectAll={(select) => setSelected(select ? docs.map((x) => x.docId) : [])}
          selected={selected}
        ></SelectBar>
        <ActionsBar
          hoveredRow={hoveredRow}
          docs={docs}
          onEdit={onEdit}
          onDelete={onDelete}
          onlySelect={onSelect != null}
          configureView={_configureView}
        ></ActionsBar>

        <SimpleBar className="overflow-auto fireck-table pb-3 mr-3" autoHide={false}>
          <table className="w-full text-center" style={{ minWidth: (fields.length + 2) * 142 }}>
            <thead>
              <tr className="bg-gray-300 h-48px rounded">
                <th className="w-12">
                  <div className="w-12"></div>
                </th>
                {fields.map((field, i) => (
                  <th className="font-medium" key={`th-${i}`}>
                    <div className="flex items-center justify-center">
                      <div className="w-5"></div>
                      <div className="cursor-pointer select-none" onClick={onOrder(field)}>
                        {field.id}
                      </div>
                      <div className="w-5">
                        {orderBy?.fieldId === field.id ? (
                          <ExpandMoreRounded
                            fontSize="small"
                            className={`${
                              orderBy?.direction === "desc" ? "transform rotate-180" : ""
                            }`}
                          ></ExpandMoreRounded>
                        ) : null}
                      </div>
                    </div>
                  </th>
                ))}
                <th className="w-20">
                  <div className="w-20"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, i) =>
                blackList.includes(doc.docId) ? null : (
                  <tr
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(-1)}
                    onClick={() => onEdit(doc)}
                    key={`row-${i}`}
                    className={classNames("h-48px cursor-pointer", {
                      "bg-gray-300": hoveredRow === i,
                    })}
                  >
                    <td className="w-12">
                      <div className="w-12"></div>
                    </td>

                    {fields.map((field, j) => (
                      <td key={`row-${i}-col-${j}`} className="px-2">
                        {doc[field.id] ? (
                          field.type === "media" ? (
                            field.mediaSingle ? (
                              <FilesCell file={doc[field.id]}></FilesCell>
                            ) : (
                              <FilesCell files={doc[field.id]} />
                            )
                          ) : (
                            <div className="whitespace-nowrap">
                              {doc[field.id].toString().substring(0, 40)}
                            </div>
                          )
                        ) : null}
                      </td>
                    ))}
                    <td className="w-20">
                      <div className="w-20"></div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <InViewFetcher
            key={(orderBy ? orderBy.fieldId + orderBy.direction : "no-order") + filters.length}
            limit={10}
            onValue={(vals) => setDocs((prev) => [...prev, ...vals])}
            onError={(message: string) => {
              if (message.includes("FAILED_PRECONDITION")) {
                createIndex(message.split("it here:")[1]);
              } else {
                notify(message, { variant: "error" });
              }
            }}
            fetcher={() => {
              let options: GetCollectionOptions = { collectionId: collectionType.id };

              options.where = "";
              options.orderBy = "";

              filters.forEach((f, i) => {
                options.where += (i > 0 ? ";" : "") + f.fieldId + "," + f.operator + "," + f.value;
                if (orderBy && orderBy.fieldId !== f.fieldId) {
                  options.orderBy += (options.orderBy ? ";" : "") + f.fieldId;
                }
              });

              if (orderBy) {
                options.orderBy +=
                  (options.orderBy ? ";" : "") + `${orderBy.fieldId},${orderBy.direction}`;
              }
              if (!orderBy && !filters.length) {
                options.orderBy = "createdAt,asc";
              }

              if (docs.length) {
                options.startAfter = docs[docs.length - 1][orderBy ? orderBy.fieldId : "createdAt"];
              }
              options.populateRef = false;
              return getCollection(options);
            }}
          ></InViewFetcher>
        </SimpleBar>
        <div></div>
      </SimpleBar>
    </>
  );
};

export default Table;
