import { FieldType } from "api/collectionTypes";
import { Document, getCollection, getDocument } from "api/collections";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import FilesCell from "./TableElements/FilesCell";
import CollectionTable from "./TableElements/CollectionTable";
import Modal from "@material-ui/core/Modal";
import IconButton from "./IconButton";
import Delete from "@material-ui/icons/DeleteOutlineOutlined";
import Link from "@material-ui/icons/Link";
import AddRounded from "@material-ui/icons/AddRounded";
import { ReactComponent as OneToOneIcon } from "assets/one-to-one.svg";
import { ReactComponent as OneToManyIcon } from "assets/one-to-many.svg";
import { useHistory } from "react-router-dom";

export interface RelationFieldProps {
  fieldType: FieldType;
  value: string[] | string;
  onValue: (a: string[] | string) => void;
}

const RelationField: React.FC<RelationFieldProps> = ({ fieldType, value, onValue }) => {
  const [docs, setDocs] = React.useState<Document[]>([]);
  const collectionType = useSelector((state: RootState) =>
    state.collectionTypes.find((x) => x.docId === fieldType.relatedCollectionTypeDocId)
  );

  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    (async () => {
      try {
        if (collectionType) {
          if (typeof value === "object") {
            if (!value.length) {
              setDocs([]);
              return;
            }
            const res = await getCollection({
              collectionId: collectionType.id,
              where: `docId,${value.length > 1 ? "in" : "=="}${value.reduce(
                (a, b) => a + "," + b,
                ""
              )}`,
            });
            if (res.error) {
              return;
            }
            setDocs(res);
          } else {
            if (value) {
              const res = await getDocument(collectionType.id, value);
              if (!res.error) {
                setDocs([res]);
                return;
              }
              setDocs([]);
              return;
            }
            setDocs([]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value, collectionType]);

  return (
    <div className="bg-gray-300 rounded p-7">
      <div className="flex flex-wrap justify-between">
        <div className="flex items-center font-medium text-blue-300 mb-3 mr-3">
          <Link className="mr-3" fontSize="small"></Link>
          <div className="capitalize mr-3">{collectionType?.name}</div>
          {fieldType.relationOneToOne ? (
            <div className="flex w-8">
              <OneToOneIcon></OneToOneIcon>
            </div>
          ) : (
            <div className="flex w-8">
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
          className="fixed left-0 top-0 w-full h-full flex overflow-auto"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="bg-white p-12 rounded m-auto max-h-544px overflow-auto"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {collectionType ? (
              <CollectionTable
                collectionType={collectionType}
                blackList={typeof value === "string" ? [value] : value}
                singleSelect={typeof value === "string"}
                onSelect={(docs) => {
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
      </Modal>
      <div className="w-full max-h-64 overflow-auto bg-white rounded">
        {collectionType ? (
          <table
            className="w-full text-center"
            style={{ minWidth: collectionType.fields.length * 142 }}
          >
            <tbody>
              {docs.length ? (
                docs.map((doc, i) => (
                  <tr
                    key={`row-${i}`}
                    className="h-48px hover:bg-gray-300 cursor-pointer"
                    onClick={() =>
                      history.push(`/collections/${collectionType.id}/edit/${doc.docId}`)
                    }
                  >
                    <td className="px-3">
                      <IconButton
                        onClick={(e: any) => {
                          e.stopPropagation();
                          if (typeof value === "object") {
                            let arr = [...value];
                            let index = arr.findIndex((x) => x === doc.docId);
                            if (index > -1) {
                              arr.splice(index, 1);
                              onValue(arr);
                            }
                          } else {
                            onValue("");
                          }
                        }}
                      >
                        <Delete fontSize="small"></Delete>
                      </IconButton>
                    </td>
                    {collectionType.fields.map((field, j) => (
                      <td key={`row-${i}-col-${j}`} className="px-3">
                        {doc[field.id] ? (
                          field.type === "media" ? (
                            field.mediaSingle ? (
                              <FilesCell file={doc[field.id]}></FilesCell>
                            ) : (
                              <FilesCell files={doc[field.id]} />
                            )
                          ) : (
                            <div className="line-clamp-1">{doc[field.id]}</div>
                          )
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={100} className="h-48px bg-white">
                    {typeof value === "string" ? "Not set" : "Empty list"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default RelationField;
