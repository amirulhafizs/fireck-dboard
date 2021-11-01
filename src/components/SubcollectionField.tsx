import { Document } from "api/collections";
import { FieldType } from "api/collectionTypes";
import FilesCell from "components/TableElements/FilesCell";
import React from "react";
import ExpandMoreRounded from "@material-ui/icons/ExpandMoreRounded";
import { confirm } from "components/Confirm";
import AddFilter from "components/TableElements/AddFilter";
import Button from "components/Button";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import { InView } from "react-intersection-observer";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import { getSubcollectionDocument } from "./SubcollectionDocument";

export interface SubcollectionFieldProps {
  fields: FieldType[];
  value: Document[];
  onValue: (newVal: any) => void;
  valueFormatters?: { [key: string]: (val: any) => any };
  groundColor?: "white" | "black";
  level: number;
}

export type FilterType = { fieldId: string; operator: string; value: string };

const Table: React.FC<SubcollectionFieldProps> = ({
  value,
  onValue,
  valueFormatters,
  groundColor = "black",
  fields,
  level,
}) => {
  const [filters, setFilters] = React.useState<FilterType[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [orderBy, setOrderBy] = React.useState<{ fieldId: string; direction: "asc" | "desc" }>();
  const [endIsInView, setEndIsInView] = React.useState(false);

  const onEdit = async (doc: Document, docIndex: number) => {
    let document = await getSubcollectionDocument({
      fields,
      level: level + 1,
      editableDocument: doc,
    });
    if (!document) return;
    let arr = [...value];
    arr[docIndex] = document;
    onValue(arr);
  };

  const onDeleteSelected = async () => {
    if (await confirm({ confirmation: `Delete ${selected.length} documents?` })) {
      onValue(value.filter((x) => !selected.includes(x.docId)));
      setSelected([]);
    }
  };

  const onOrder = (field: FieldType) =>
    orderBy?.fieldId !== field.id
      ? () => {
          setOrderBy({ fieldId: field.id, direction: "asc" });
        }
      : orderBy?.direction !== "asc"
      ? () => setOrderBy(undefined)
      : () => setOrderBy({ fieldId: field.id, direction: "desc" });

  const selectAll = (select: boolean) => setSelected(select ? value.map((x) => x.docId) : []);

  const selectHandler = (docId: string, checked: boolean) => {
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
  };

  const formatValue = (field: FieldType, value: any) => {
    return field.type === "date"
      ? moment(value).format("YYYY-MM-DD hh:mm")
      : valueFormatters && field.id in valueFormatters
      ? valueFormatters[field.id](value)
      : value.toString().substring(0, 40);
  };

  return (
    <div className="h-96 w-full flex-col flex">
      <div className="flex justify-between mb-3">
        <div className="flex flex-wrap">
          <AddFilter
            collectionType={{ fields }}
            onValue={(val: FilterType) => setFilters((prev) => [val, ...prev])}
          ></AddFilter>
          {filters.map((f, i) => (
            <div
              key={`f-${i}`}
              className={classNames(
                "rounded min-h-28px border leading-28px pl-3 text-sm pr-3 flex mr-3 mb-3 relative",
                { "text-white border-white": groundColor === "black" },
                { "text-black border-black": groundColor === "white" }
              )}
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
        <div className="flex flex-wrap">
          <Button
            noMinWidth
            onClick={onDeleteSelected}
            disabled={selected.length === 0}
            className={`px-7 mr-4 h-28px ${
              selected.length === 0
                ? "bg-gray-E1E1E1 text-gray-6C6C6C cursor-default"
                : "bg-red-FF0000 hover:bg-red-FF0000-hover text-white"
            } `}
          >
            Delete
          </Button>
          <Button
            noMinWidth
            onClick={async () => {
              let document = await getSubcollectionDocument({
                fields,
                level: level + 1,
              });
              if (!document) return;
              onValue([...value, document]);
            }}
            className={`px-7 h-28px bg-fireck-4 hover:bg-fireck-4-hover`}
          >
            Add
          </Button>
        </div>
      </div>
      <div className={"flex-grow h-0 -mt-3 rounded overflow-hidden bg-white shadow-border-gray"}>
        <SimpleBar className={"relative scrollbar-light h-full"} autoHide={false}>
          <table className="w-full text-center">
            <thead>
              <tr className="whitespace-nowrap">
                <th className="sticky top-0 bg-gray-E1E1E1 z-10 px-1">
                  <Checkbox
                    size="small"
                    classes={{ checked: "text-fireck-1", root: "p-0" }}
                    checked={selected.length === value.length}
                    onChange={(e) => selectAll(e.target.checked)}
                  ></Checkbox>
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
                              orderBy?.direction === "asc" ? "transform rotate-180" : ""
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
              {value.map((doc, i) => (
                <tr
                  onClick={() => onEdit(doc, i)}
                  key={`row-${i}`}
                  className={"cursor-pointer hover:bg-fireck-4"}
                >
                  <td className="px-1" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      size="small"
                      classes={{ checked: "text-fireck-1", root: "p-0" }}
                      checked={selected.includes(doc.docId)}
                      onChange={(e) => selectHandler(doc.docId, e.target.checked)}
                    ></Checkbox>
                  </td>
                  {fields.map((field, j) => (
                    <td key={`row-${i}-col-${j}`} className="px-2">
                      {doc[field.id] != null ? (
                        field.type === "media" ? (
                          field.mediaSingle ? (
                            <FilesCell file={doc[field.id]}></FilesCell>
                          ) : (
                            <FilesCell files={doc[field.id]} />
                          )
                        ) : (
                          <div className="whitespace-nowrap">
                            {formatValue(field, doc[field.id])}
                          </div>
                        )
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
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
