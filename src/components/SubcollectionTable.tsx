import { FieldType } from "api/collectionTypes";
import IconButton from "./IconButton";
import FilesCell from "./TableElements/FilesCell";
import DeleteOutlineOutlined from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder } from "pages/CollectionTypes";
import { getSubcollectionDocument } from "./SubcollectionDocument";

export interface SubcollectionTableProps {
  collection: { [key: string]: any }[];
  fields: FieldType[];
  collectionName: string;
  onChange: (a: { [key: string]: any }[]) => void;
}

const SubcollectionTable: React.FC<SubcollectionTableProps> = ({
  collection,
  fields,
  collectionName,
  onChange,
}) => {
  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }
    const arr = reorder(collection, result.source.index, result.destination.index);
    onChange(arr);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="overflow-auto h-80">
          <table className="w-full table-fixed" style={{ minWidth: (fields.length + 2) * 142 }}>
            <thead>
              <tr className="bg-gray-300 h-48px rounded">
                {/* <th className="w-14">
                  <Checkbox
                    size="small"
                    classes={{ checked: "text-blue-400" }}
                    checked={selected.length === collection.length}
                    onChange={(e) =>
                      setSelected(e.target.checked ? collection.map((_, i) => i) : [])
                    }
                  ></Checkbox>
                </th> */}

                {fields.map((field, i) => (
                  <th
                    className="font-medium sticky top-0 z-10 bg-gray-300"
                    key={`th-${i}`}
                    colSpan={1}
                  >
                    <div className="flex items-center justify-center">
                      <div className="select-none">{field.id}</div>
                    </div>
                  </th>
                ))}
                <th className="w-20 sticky top-0 z-10 bg-gray-300"></th>
              </tr>
            </thead>

            <Droppable droppableId="droppable-table">
              {(provided, snapshot) => (
                <tbody className="text-center" {...provided.droppableProps} ref={provided.innerRef}>
                  {collection.length ? (
                    collection.map((doc, i) => (
                      <Draggable key={`tr-${i}`} draggableId={i.toString()} index={i}>
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`h-48px ${
                              snapshot.isDragging
                                ? "table table-fixed bg-orange-300 bg-opacity-20"
                                : "hover:bg-gray-300"
                            }`}
                          >
                            {/* <td className="w-14">
                              <Checkbox
                                size="small"
                                classes={{ checked: "text-blue-400" }}
                                checked={selected.includes(i)}
                                onChange={(e) =>
                                  setSelected((prev) => {
                                    let arr = [...prev];
                                    if (e.target.checked) {
                                      console.log("arr", [...arr, i]);
                                      return [...arr, i];
                                    }
                                    let index = arr.findIndex((rowInd) => rowInd === i);
                                    arr.splice(index, 1);
                                    console.log("arr", arr);
                                    return arr;
                                  })
                                }
                              ></Checkbox>
                            </td> */}
                            {fields.map((field, j) => (
                              <td key={`row-${i}-col-${j}`} className="px-3">
                                {doc[field.id] ? (
                                  field.type === "media" ? (
                                    field.mediaSingle ? (
                                      <FilesCell file={doc[field.id]}></FilesCell>
                                    ) : (
                                      <FilesCell files={doc[field.id]} />
                                    )
                                  ) : (
                                    <div className="line-clamp-1">
                                      {doc[field.id].toString().substring(0, 40)}
                                    </div>
                                  )
                                ) : null}
                              </td>
                            ))}
                            <td className="px-3 w-20">
                              <IconButton
                                variant="transparent"
                                onClick={async (e: MouseEvent) => {
                                  e.stopPropagation();
                                  const updatedDoc = await getSubcollectionDocument({
                                    editableDocument: doc,
                                    fields,
                                    collectionName,
                                  });
                                  if (!updatedDoc) return;
                                  let arr = [...collection];
                                  arr[i] = updatedDoc;
                                  onChange(arr);
                                }}
                                className="cursor-pointer"
                              >
                                <EditOutlined fontSize="small"></EditOutlined>
                              </IconButton>
                              <IconButton
                                variant="transparent"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  let arr = [...collection];
                                  arr.splice(i, 1);
                                  onChange(arr);
                                }}
                              >
                                <DeleteOutlineOutlined fontSize="small"></DeleteOutlineOutlined>
                              </IconButton>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={fields.length + 1} className="h-48px bg-white">
                        Empty table
                      </td>
                    </tr>
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </div>
      </DragDropContext>
    </div>
  );
};

export default SubcollectionTable;
