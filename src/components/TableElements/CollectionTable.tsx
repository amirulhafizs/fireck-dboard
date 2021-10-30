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
import Button from "components/Button";
import { configureView } from "components/TableViewConfig";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import useFetch from "hooks/useFetch";
import { InView } from "react-intersection-observer";
import Checkbox from "@material-ui/core/Checkbox";

export interface TableProps {
  collectionType: CollectionType;
  onPick?: (a: Document[]) => void;
  blackList?: string[];
  singleSelect?: boolean;
}

export type FilterType = { fieldId: string; operator: string; value: string };

const Table: React.FC<TableProps> = ({
  collectionType,
  onPick,
  blackList = [],
  singleSelect = false,
}) => {
  console.log("SINGLE SELCT", singleSelect);
  const _configureView = async () => {
    configureView({
      fields: collectionType.fields,
      callback: onConfigureView,
    });
  };

  const history = useHistory();

  const [filters, setFilters] = React.useState<FilterType[]>([]);
  const fields = collectionType.fields.filter((field) => field.displayOnTable);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [orderBy, setOrderBy] = React.useState<{ fieldId: string; direction: "asc" | "desc" }>();
  const [endIsInView, setEndIsInView] = React.useState(false);

  const { docs, setDocs } = useFetch(collectionType.id, filters, orderBy, endIsInView);
  console.log(collectionType, docs);

  const onEdit = (doc: Document) => {
    history.push(`/collections/${collectionType.id}/edit/${doc.docId}`);
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

  const selectAll = (select: boolean) => setSelected(select ? docs.map((x) => x.docId) : []);

  const selectHandler = (docId: string, checked: boolean) => {
    if (checked) {
      if (singleSelect) {
        setSelected([docId]);
      } else {
        setSelected((prev) => [...prev, docId]);
      }

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
  };

  return (
    <div className="h-full w-full flex-col flex">
      <div className="flex justify-between mb-3">
        <div className="flex flex-wrap">
          <AddFilter
            collectionType={collectionType}
            onValue={(val: FilterType) => setFilters((prev) => [val, ...prev])}
          ></AddFilter>
          {filters.map((f, i) => (
            <div
              key={`f-${i}`}
              className="text-white border border-white rounded min-h-28px leading-28px pl-3 text-sm pr-3 flex mr-3 mb-3 relative"
            >
              {f.fieldId} {f.operator} {f.value}{" "}
              <span
                onClick={() =>
                  setFilters((prev) => {
                    let arr = [...prev];
                    arr.splice(i, 1);
                    return arr;
                  })
                }
                className="text-xs leading-28px ml-3 cursor-pointer"
              >
                ✕
              </span>
            </div>
          ))}
        </div>

        {!onPick ? (
          <Button
            noMinWidth
            onClick={onDeleteSelected}
            disabled={selected.length === 0}
            className={`px-7 h-28px ${
              selected.length === 0
                ? "bg-gray-E1E1E1 text-gray-6C6C6C cursor-default"
                : "bg-red-FF0000 hover:bg-red-FF0000-hover text-white"
            } `}
          >
            Delete
          </Button>
        ) : (
          <Button
            noMinWidth
            onClick={() => onPick(docs.filter((x) => selected.includes(x.docId)))}
            className={`h-28px px-7 ${
              selected.length === 0
                ? "bg-gray-300 text-gray-500 cursor-default"
                : "bg-fireck-4 hover:bg-fireck-4-hover"
            } `}
          >
            Select
          </Button>
        )}
      </div>
      <div className="flex-grow h-0 -mt-3 bg-white rounded overflow-hidden">
        <SimpleBar className="relative scrollbar-light h-full" autoHide={false}>
          <table className="w-full text-center">
            <thead>
              <tr className="whitespace-nowrap">
                <th className="sticky top-0 bg-gray-E1E1E1 z-10 px-1">
                  {singleSelect ? null : (
                    <Checkbox
                      size="small"
                      classes={{ checked: "text-fireck-1", root: "p-0" }}
                      checked={selected.length === docs.length}
                      onChange={(e) => selectAll(e.target.checked)}
                    ></Checkbox>
                  )}
                </th>
                {fields.map((field, i) => (
                  <th className="font-semibold sticky top-0 bg-gray-E1E1E1" key={`th-${i}`}>
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
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, i) =>
                blackList.includes(doc.docId) ? null : (
                  <tr
                    onClick={() =>
                      onPick ? selectHandler(doc.docId, !selected.includes(doc.docId)) : onEdit(doc)
                    }
                    key={`row-${i}`}
                    className={classNames("cursor-pointer bg-white hover:bg-fireck-4")}
                  >
                    <td className="px-1">
                      <Checkbox
                        size="small"
                        classes={{ checked: "text-fireck-1", root: "p-0" }}
                        checked={selected.includes(doc.docId)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => selectHandler(doc.docId, e.target.checked)}
                      ></Checkbox>
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
                  </tr>
                )
              )}
            </tbody>
          </table>
          <InView
            onChange={async (inView) => {
              setEndIsInView(inView);
            }}
          >
            <div className="w-full"></div>
          </InView>
          <div></div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default Table;
