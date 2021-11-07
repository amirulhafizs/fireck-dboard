import Modal from "@material-ui/core/Modal";
import Input from "components/Input";
import Select from "components/Select";
import Button from "components/Button";
import { WebhookDocument } from "api/collectionTypes";
import React from "react";
import { useFormik } from "formik";
import Label from "components/Label";
import CloseRounded from "@material-ui/icons/CloseRounded";

export interface WebhookModalProps {
  onValue: (val: Partial<WebhookDocument>) => void;
  initialValue?: WebhookDocument;
  open: boolean;
  onClose: () => void;
  collectionTypeDocId: string;
}

const events = ["find", "find one", "create", "update", "delete"];
const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const WebhookModal: React.FC<WebhookModalProps> = ({
  onValue,
  initialValue,
  open,
  onClose,
  collectionTypeDocId,
}) => {
  const { values, errors, handleChange, submitCount, handleSubmit, isSubmitting } = useFormik({
    onSubmit: async (vals, { resetForm }) => {
      onValue(vals);
      onClose();
      resetForm();
    },
    enableReinitialize: true,
    initialValues: initialValue || {
      event: "",
      method: "",
      url: "",
      collectionTypeDocId: collectionTypeDocId,
    },
    validate: (vals: any) => {
      let errors: any = {};
      Object.keys(vals).forEach((x) => {
        if (!vals[x]) {
          errors[x] = "Required";
        }
      });
      return errors;
    },
  });

  return !open ? null : (
    <Modal open={open}>
      <div className="fixed left-0 top-0 w-full h-full flex p-7" onMouseDown={onClose}>
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="bg-white rounded p-7 m-auto relative animate-littlemoveup"
          style={{ maxWidth: 600 }}
        >
          <CloseRounded
            className="absolute top-0 right-0 cursor-pointer"
            onClick={onClose}
          ></CloseRounded>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="sm:w-1/3 w-full mb-3 px-2">
              <Label
                groundColor="white"
                className="mb-2"
                error={submitCount > 0 ? errors.event : null}
              >
                Event
              </Label>
              <Select
                groundColor="white"
                className="h-34px"
                name="event"
                onChange={handleChange}
                value={values.event}
                options={[
                  { value: "", label: "Select" },
                  ...events.map((x) => ({ value: x, label: x })),
                ]}
              ></Select>
            </div>
            <div className="sm:w-1/3 w-full mb-3 px-2">
              <Label
                groundColor="white"
                className="mb-2"
                error={submitCount > 0 ? errors.method : null}
              >
                Method
              </Label>
              <Select
                className="h-34px"
                groundColor="white"
                name="method"
                onChange={handleChange}
                value={values.method}
                options={[
                  { value: "", label: "Select" },
                  ...methods.map((x) => ({ value: x, label: x })),
                ]}
              ></Select>
            </div>
            <div className="sm:w-1/3 w-full mb-3 px-2">
              <Label
                groundColor="white"
                className="mb-2 text-black"
                error={submitCount > 0 ? errors.url : null}
              >
                Url
              </Label>
              <Input
                groundColor="white"
                placeholder={"url"}
                className="placeholder-black h-34px"
                value={values.url}
                onChange={handleChange}
                name="url"
              ></Input>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              className="bg-fireck-4 hover:bg-fireck-4-hover h-34px"
            >
              {initialValue ? "Save" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WebhookModal;
