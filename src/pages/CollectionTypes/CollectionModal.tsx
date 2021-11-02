import Modal from "@material-ui/core/Modal";
import Input from "components/Input";
import React from "react";
import Button from "components/Button";
import { CollectionType } from "api/collectionTypes";
import { useNotify } from "components/NotificationsProvider";
import { confirm } from "components/Confirm";
import { useFormik } from "formik";
import ToupleInput from "components/ToupleInput";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { addDocument, deleteDocument, updateDocument } from "api/collections";

export interface AddNewCollectionProps {
  open: boolean;
  onClose: () => void;
  collections: Array<CollectionType>;
  editingCollectionDocId: string;
  onCreate: (val: CollectionType) => void;
  onUpdate: (val: Partial<CollectionType>) => void;
  onDelete: (docId: string) => void;
}

function isNumeric(char: any) {
  return char >= "0" && char <= "9";
}

function isLetter(str: any) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const createId = (string: string) => {
  let id = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") {
      id += "-";
    } else if (
      i > 0 &&
      string[i - 1].toLowerCase() === string[i - 1] &&
      string[i - 1] !== " " &&
      string[i].toUpperCase() === string[i] &&
      !isNumeric(string[i]) &&
      isLetter(string[i])
    ) {
      id += "-" + string[i].toLowerCase();
    } else {
      id += string[i].toLowerCase();
    }
  }
  return id;
};

const COLLECTION_ID = "CollectionTypesReservedCollection";

const AddNewCollection: React.FC<AddNewCollectionProps> = ({
  open,
  onClose,
  collections,
  editingCollectionDocId,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const initialData = {
    name: "",
    id: "",
    single: false,
    draftable: true,
    fields: [],
    size: 0,
    isSystem: false,
    docId: "",
  } as CollectionType;

  const notify = useNotify();

  const formIntialState = editingCollectionDocId.length
    ? collections.find((x) => x.docId === editingCollectionDocId) || initialData
    : initialData;

  const { values, errors, handleSubmit, handleChange, setFieldValue, isSubmitting, submitCount } =
    useFormik({
      enableReinitialize: true,
      onSubmit: async (vals, { resetForm }) => {
        const id = createId(vals.name);

        const res = editingCollectionDocId.length
          ? await updateDocument(COLLECTION_ID, values.docId, { ...values, id })
          : await addDocument(COLLECTION_ID, { ...values, id });
        const actionType = editingCollectionDocId.length ? "updated" : "created";
        if (!res.error) {
          if (editingCollectionDocId.length) {
            onUpdate(res);
          } else {
            onCreate(res);
          }
          resetForm();
          onClose();
          notify("Collection type " + actionType + "!", { variant: "success" });
        } else {
          notify("Collection type was not " + actionType, { variant: "error" });
        }
      },
      initialValues: formIntialState,
      validate: (vals) => {
        let errors: { [key: string]: string } = {};
        if (!vals.name) {
          errors.name = "Collection name is required";
        } else {
          const id = createId(vals.name);
          const index = collections.findIndex((x) => x.id === id);
          if (index !== -1 && collections[index].docId !== editingCollectionDocId) {
            errors.name = "There is collection with the same name";
          }
        }
        return errors;
      },
    });

  return (
    <Modal open={open} hideBackdrop>
      <div className="w-full h-full flex overflow-auto bg-black bg-opacity-40 p-7">
        <div
          className="m-auto rounded bg-white w-full p-7 relative animate-littlemoveup"
          style={{ maxWidth: 600 }}
        >
          <CloseRounded
            className="absolute top-0 right-0 cursor-pointer"
            onClick={onClose}
          ></CloseRounded>
          <div className="text-22px font-medium mb-12">
            {editingCollectionDocId.length ? "Edit" : "Create"} collection type
          </div>
          <div className="flex flex-wrap mb-7">
            <div className="mb-3 sm:w-1/2 w-full sm:pr-2">
              <div className="mb-2">Collection name</div>
              <Input
                groundColor="white"
                className="h-34px"
                data-testid={`collection-name-input`}
                error={submitCount > 0 && errors.name ? errors.name : false}
                value={values.name}
                name="name"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              ></Input>
            </div>
            <div className="mb-3 sm:w-1/2 w-full sm:pl-2">
              <div className="mb-2">UID</div>
              <Input
                className="h-34px"
                groundColor="white"
                disabled
                value={createId(values.name)}
                name="id"
              ></Input>
            </div>
          </div>
          <ToupleInput
            disabled={editingCollectionDocId.length > 0}
            value={values.single}
            options={[
              { value: false, label: "Multiple elements" },
              { value: true, label: "Single element" },
            ]}
            setValue={(val) => (!editingCollectionDocId ? setFieldValue("single", val) : {})}
          ></ToupleInput>
          {editingCollectionDocId ? (
            <Button
              data-testid="delete-collection-btn"
              onClick={async () => {
                if (
                  await confirm({
                    confirmation: "Delete collection type?",
                  })
                ) {
                  const deleteDocId = editingCollectionDocId;
                  let res = await deleteDocument(COLLECTION_ID, deleteDocId);
                  if (!res.error) {
                    onClose();
                    onDelete(deleteDocId);
                    notify("Collection type deleted!", { variant: "success" });
                  } else {
                    notify("Collection type was not deleted", { variant: "error" });
                  }
                  onClose();
                }
              }}
              className="border-2 min-w-unset h-34px px-4 border-red-FF0000 text-red-FF0000 mb-10 hover:bg-red-FF0000 hover:text-white"
            >
              Delete collection
            </Button>
          ) : null}

          <div className="flex justify-between">
            <Button
              onClick={() => onClose()}
              className="bg-fireck-5 hover:bg-fireck-5-hover text-white"
            >
              Cancel
            </Button>
            <Button
              data-testid="submit-btn"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              className="bg-fireck-4 hover:bg-fireck-4-hover h-34px"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewCollection;
