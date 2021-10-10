import Modal from "@material-ui/core/Modal";
import Input from "components/GrayInput";
import React from "react";
import Button from "components/Button";
import {
  createCollectionType,
  updateCollectionType,
  CollectionType,
  deleteCollectionType,
} from "api/collectionTypes";
import { useNotify } from "components/NotificationsProvider";
import { confirm } from "components/Confirm";
import { useFormik } from "formik";
import ToupleInput from "components/ToupleInput";

export interface AddNewCollectionProps {
  open: boolean;
  onClose: Function;
  collections: Array<CollectionType>;
  editingCollectionIndex: number;
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

const AddNewCollection: React.FC<AddNewCollectionProps> = ({
  open,
  onClose,
  collections,
  editingCollectionIndex,
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
    lastIndex: 0,
    docId: "",
  } as CollectionType;

  const notify = useNotify();

  const formIntialState =
    editingCollectionIndex >= 0 ? collections[editingCollectionIndex] : initialData;

  const { values, errors, handleSubmit, handleChange, setFieldValue, isSubmitting, submitCount } =
    useFormik({
      enableReinitialize: true,
      onSubmit: async (vals, { resetForm }) => {
        const id = createId(vals.name);

        const res =
          editingCollectionIndex > -1
            ? await updateCollectionType(values.docId, { ...values, id })
            : await createCollectionType({ ...values, id });
        const actionType = editingCollectionIndex > -1 ? "updated" : "created";
        if (!res.error) {
          if (editingCollectionIndex > -1) {
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
          if (index !== -1 && index !== editingCollectionIndex) {
            errors.name = "There is collection with the same name";
          }
        }
        return errors;
      },
    });

  return (
    <Modal open={open} hideBackdrop>
      <div className="w-full h-full flex overflow-auto bg-black bg-opacity-40">
        <div className="m-auto rounded bg-white max-w-644px w-full p-9">
          <div className="text-22px font-medium mb-12">
            {editingCollectionIndex > -1 ? "Edit" : "Create"} collection type
          </div>
          <div className="flex flex-wrap mb-7">
            <div className="mb-3 sm:w-1/2 w-full sm:pr-2">
              <div className="mb-2">Collection name</div>
              <Input
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
              <Input disabled value={createId(values.name)} name="id"></Input>
            </div>
          </div>
          <ToupleInput
            disabled={editingCollectionIndex !== -1}
            value={values.single}
            options={[
              { value: false, label: "Multiple elements" },
              { value: true, label: "Single element" },
            ]}
            setValue={(val) => (editingCollectionIndex === -1 ? setFieldValue("single", val) : {})}
          ></ToupleInput>
          {editingCollectionIndex > -1 ? (
            <Button
              onClick={async () => {
                if (
                  await confirm({
                    confirmation: "Do you really want to delete collection type?",
                  })
                ) {
                  const deleteDocId = collections[editingCollectionIndex].docId;
                  let res = await deleteCollectionType(deleteDocId);
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
              className="border-2 border-red-500 text-red-500 mb-10 hover:bg-red-500 hover:text-white"
            >
              Delete collection
            </Button>
          ) : null}

          <div className="flex justify-between">
            <Button onClick={() => onClose()} className="bg-blue-300 hover:bg-blue-400 text-white">
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              className="bg-orange-300 hover:bg-orange-301"
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
