import { FieldType } from "api/collectionTypes";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import CollectionTable from "./TableElements/CollectionTable";
import Modal from "@material-ui/core/Modal";
import IconButton from "./IconButton";
import Link from "@material-ui/icons/Link";
import AddRounded from "@material-ui/icons/AddRounded";
import { ReactComponent as OneToOneIcon } from "assets/one-to-one.svg";
import { ReactComponent as OneToManyIcon } from "assets/one-to-many.svg";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { confirm } from "components/Confirm";
import DeleteOutlineOutlined from "@material-ui/icons/DeleteOutlineOutlined";
import SimpleBar from "simplebar-react";

export interface RelationFieldProps {
  fieldType: FieldType;
  value: string[] | string;
  onValue: (a: string[] | string) => void;
}

const RelationField: React.FC<RelationFieldProps> = ({ fieldType, value, onValue }) => {
  const collectionType = useSelector((state: RootState) =>
    state.collectionTypes.find((x) => x.docId === fieldType.relatedCollectionTypeDocId)
  );

  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-fireck-3 rounded p-5">
      <div className="flex flex-wrap justify-between">
        <div className="flex items-center font-medium text-fireck-4 mb-3 mr-3">
          <Link className="mr-3" fontSize="small"></Link>
          <div className="capitalize mr-3">{collectionType?.name}</div>
          {fieldType.relationOneToOne ? (
            <div className="flex w-8 text-white">
              <OneToOneIcon></OneToOneIcon>
            </div>
          ) : (
            <div className="flex w-8 text-white">
              <OneToManyIcon></OneToManyIcon>
            </div>
          )}
        </div>
        <IconButton onClick={() => setOpen(true)} className="mb-3">
          <AddRounded fontSize="small"></AddRounded>
        </IconButton>
      </div>

      <Modal open={open}>
        <div
          className="fixed left-0 top-0 w-full h-full flex overflow-auto p-12"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="bg-white p-9 rounded w-full h-full flex flex-col relative"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="absolute right-0 top-0 cursor-pointer" onClick={() => setOpen(false)}>
              <CloseRounded></CloseRounded>
            </div>
            <div className="text-27px font-medium mb-5 capitalize leading-none">
              {collectionType?.name}
            </div>
            <div className="flex-grow h-0">
              {collectionType ? (
                <CollectionTable
                  groundColor="white"
                  collectionType={collectionType}
                  blackList={typeof value === "string" ? [value] : value}
                  singleSelect={typeof value === "string"}
                  onPick={(docs) => {
                    if (docs.length) {
                      if (typeof value === "string") {
                        onValue(docs[0].docId);
                      } else {
                        onValue([...value, ...docs.map((x) => x.docId)]);
                      }

                      setOpen(false);
                    }
                  }}
                ></CollectionTable>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
      <div className="w-full max-h-64 overflow-auto bg-white rounded">
        {typeof value === "string" ? (
          <div className="px-1 h-28px bg-white flex items-center justify-between">
            <span>{value}</span>
            {!value ? null : (
              <div
                className="h-5 w-5 flex items-center justify-center rounded cursor-pointer hover:bg-red-FF0000 hover:text-white"
                data-testid={`delete-for-field-${fieldType.id}-${value}`}
                onClick={async () => {
                  let res = await confirm({
                    confirmation: "Remove document?",
                  });
                  if (res) {
                    onValue("");
                  }
                }}
              >
                <DeleteOutlineOutlined
                  classes={{ root: "pointer-events-none" }}
                  fontSize="inherit"
                ></DeleteOutlineOutlined>
              </div>
            )}
          </div>
        ) : (
          <SimpleBar className="h-36 bg-white scrollbar-light scrollbar-thin" autoHide={false}>
            {value.map((x, i) => (
              <div
                className="px-1 hover:bg-fireck-4 flex justify-between "
                key={`relation-${fieldType.id}-docId-${x}`}
              >
                <div>{x}</div>
                <div className="flex items-center flex-grow justify-end">
                  <div
                    className="h-5 w-5 flex items-center justify-center rounded cursor-pointer hover:bg-red-FF0000 hover:text-white"
                    data-testid={`delete-for-field-${fieldType.id}-${x}`}
                    onClick={async () => {
                      let res = await confirm({
                        confirmation: "Remove document?",
                      });
                      if (res) {
                        let arr = [...value];
                        arr.splice(i, 1);
                        onValue(arr);
                      }
                    }}
                  >
                    <DeleteOutlineOutlined
                      classes={{ root: "pointer-events-none" }}
                      fontSize="inherit"
                    ></DeleteOutlineOutlined>
                  </div>
                </div>
              </div>
            ))}
          </SimpleBar>
        )}
      </div>
    </div>
  );
};

export default RelationField;
