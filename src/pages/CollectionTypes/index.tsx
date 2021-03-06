import Button from "components/Button";
import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "store";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlined from "@material-ui/icons/DeleteOutlineOutlined";
import CollectionModal from "./CollectionModal";
import FieldTypes from "components/FieldTypes";
import { confirm } from "components/Confirm";
import { useNotify } from "components/NotificationsProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorRounded from "@material-ui/icons/DragIndicatorRounded";
import InterfaceModal from "./InterfaceModal";
import SimpleBar from "simplebar-react";
import AddRounded from "@material-ui/icons/AddRounded";
import SettingsPage from "components/SettingsPage";
import { updateDocument } from "api/collections";
import { CollectionType } from "api/collectionTypes";
import { getCollectionField } from "./GetCollectionField";

export interface CollectionsBuilderProps {}

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const COLLECTION_ID = "CollectionTypesReservedCollection";

const CollectionsBuilder: React.FC<CollectionsBuilderProps> = () => {
  const [collectionModalOpen, setCollectionModalOpen] = React.useState(false as boolean);
  const dispatch = useDispatch();
  const notify = useNotify();
  const [editingCollectionDocId, setEditingCollectionDocId] = React.useState("");
  const [selectedCollection, setSelectedCollection] = React.useState("");
  const [interfaceColType, setInterfaceColType] = React.useState<CollectionType>();

  const collections = useSelector(
    (state: RootState) => state.collectionTypes.filter((x) => !x.isSystem),
    shallowEqual
  );

  useEffect(() => {
    if (collections.length && !selectedCollection) {
      setSelectedCollection(collections[0].docId);
    }
  }, [collections]);

  const editField = async (selectedField: number) => {
    const collection = collections.find((x) => x.docId === selectedCollection);
    if (!collection) return;
    let editableField = collection.fields[selectedField];

    const field = await getCollectionField({
      editableField,
      zLevel: 0,
      existingFieldNames: collection.fields
        .filter((x) => x.id !== editableField.id)
        .map((x) => x.id),
    });

    if (field) {
      let newFields = JSON.parse(JSON.stringify(collection.fields));
      newFields[selectedField] = field;
      let res1 = await updateDocument(COLLECTION_ID, collection.docId, {
        ...collection,
        fields: newFields,
      });
      if (res1.error) {
        notify(res1.error, { variant: "error" });
      } else {
        dispatch({ type: "UPDATE_COLLECTION_FIELDS", payload: newFields, docId: collection.docId });
      }
    }

    return { success: false };
  };

  const addField = async () => {
    const collection = collections.find((x) => x.docId === selectedCollection);
    if (!collection) return;
    const field = await getCollectionField({
      zLevel: 0,
      existingFieldNames: collection.fields.map((x) => x.id),
    });
    if (field) {
      const newFields = [...collection.fields, field];

      let res2 = await updateDocument(COLLECTION_ID, collection.docId, {
        ...collection,
        fields: newFields,
      });

      if (!res2.error) {
        dispatch({
          type: "UPDATE_COLLECTION_FIELDS",
          payload: newFields,
          docId: collection.docId,
        });
        notify("Field added!", { variant: "success" });
      } else {
        notify(res2.error, { variant: "error" });
      }
    }

    return { success: false };
  };

  const deleteField = async (fieldIndex: number) => {
    let res = await confirm({
      confirmation: "Delete field?",
    });
    if (res) {
      let updatedCollection = JSON.parse(
        JSON.stringify(collections.find((x) => x.docId === selectedCollection))
      );
      updatedCollection.fields.splice(fieldIndex, 1);
      const res = await updateDocument(COLLECTION_ID, selectedCollection, updatedCollection);
      if (res.error) {
        notify(res.error, { variant: "error" });
      } else {
        dispatch({
          type: "UPDATE_COLLECTION_FIELDS",
          payload: updatedCollection.fields,
          docId: selectedCollection,
        });
      }
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

    let col = collections.find((x) => x.docId === selectedCollection);
    if (!col) return;

    const fields = reorder(col.fields, result.source.index, result.destination.index);

    dispatch({ type: "UPDATE_COLLECTION_FIELDS", payload: fields, docId: col.docId });
    updateDocument(COLLECTION_ID, col.docId, {
      ...col,
      fields,
    });
  };

  return (
    <>
      <SettingsPage
        entityContent={
          <div className="h-full bg-white rounded overflow-hidden">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <SimpleBar
                    className="overflow-auto w-full h-full scrollbar-light scrollbar-thin py-0.5"
                    autoHide={false}
                  >
                    <div
                      className="min-w-430px"
                      {...provided.droppableProps}
                      ref={provided.innerRef as any}
                    >
                      {collections
                        .find((x) => x.docId === selectedCollection)
                        ?.fields.map((x, i) => {
                          const Badge = FieldTypes.find((t) => t.type === x.type)?.Badge;
                          return (
                            <Draggable key={x.id} draggableId={x.id} index={i}>
                              {(provided, snapshot) => (
                                <div
                                  data-testid={`field-id-${x.id}`}
                                  key={`field-${i}`}
                                  className="bg-white hover:bg-fireck-4 flex items-center px-2 py-0.5"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <DragIndicatorRounded fontSize="inherit" className="text-lg" />
                                  </div>

                                  <div className="line-clamp-1 w-5/12 px-3">{x.id}</div>
                                  <div className="flex w-4/12 flex-shrink-0 items-center">
                                    {Badge ? <Badge></Badge> : null}
                                    <span className="ml-3 hidden sm:block line-clamp-1">
                                      {x.type}
                                    </span>
                                  </div>
                                  {x.isDefault ? null : (
                                    <div className="flex items-center flex-grow justify-end">
                                      <div
                                        data-testid={`edit-for-field-${x.id}`}
                                        className="h-5 w-5 flex items-center justify-center rounded cursor-pointer hover:bg-white"
                                        onClick={() => {
                                          editField(i);
                                        }}
                                      >
                                        <EditOutlined
                                          fontSize="inherit"
                                          classes={{ root: "pointer-events-none text-lg" }}
                                        ></EditOutlined>
                                      </div>
                                      <div
                                        className="h-5 w-5 flex items-center justify-center rounded cursor-pointer hover:bg-red-FF0000 hover:text-white"
                                        data-testid={`delete-for-field-${x.id}`}
                                        onClick={() => deleteField(i)}
                                      >
                                        <DeleteOutlineOutlined
                                          classes={{ root: "pointer-events-none text-lg" }}
                                          fontSize="inherit"
                                        ></DeleteOutlineOutlined>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  </SimpleBar>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        }
        selectedEntityId={selectedCollection}
        entity="collection"
        enitityPlural="collections"
        entities={collections}
        onSelectEntity={(docId) => setSelectedCollection(docId)}
        onAddEntity={() => setCollectionModalOpen(true)}
        onInvokeEntityEdit={() => {
          setEditingCollectionDocId(selectedCollection);
          setCollectionModalOpen(true);
        }}
        entityButtons={
          <div className="flex flex-wrap">
            <Button
              data-testid="view-interface-btn"
              onClick={() =>
                setInterfaceColType(collections.find((x) => x.docId === selectedCollection))
              }
              className="border border-white h-28px text-white mr-3 mb-3 px-5 min-w-unset"
            >
              <div className="flex items-center pointer-events-none">Interface</div>
            </Button>
            <Button
              data-testid="add-new-field-btn"
              onClick={async () => {
                addField();
              }}
              className="bg-fireck-4 hover:bg-fireck-4-hover mb-3 h-28px pl-3 min-w-unset"
            >
              <div className="flex items-center pointer-events-none">
                <AddRounded className="mr-2 text-lg" fontSize="inherit"></AddRounded>
                <span>Add field</span>
              </div>
            </Button>
          </div>
        }
      ></SettingsPage>

      <CollectionModal
        editingCollectionDocId={editingCollectionDocId}
        collections={collections}
        onCreate={(val) => {
          dispatch({ type: "ADD_COLLECTION_TYPE", payload: val });
          setSelectedCollection(val.docId);
        }}
        onUpdate={(val) => {
          dispatch({ type: "UPDATE_COLLECTION_TYPE", payload: val, docId: val.docId });
        }}
        onDelete={(docId) => {
          setSelectedCollection("");
          setEditingCollectionDocId("");
          dispatch({ type: "DELETE_COLLECTION_TYPE", payload: docId });
        }}
        open={collectionModalOpen}
        onClose={() => {
          setCollectionModalOpen(false);
          setEditingCollectionDocId("");
        }}
      ></CollectionModal>
      <InterfaceModal
        onClose={() => setInterfaceColType(undefined)}
        open={interfaceColType ? true : false}
        collectionType={interfaceColType}
      ></InterfaceModal>
    </>
  );
};

export default CollectionsBuilder;
