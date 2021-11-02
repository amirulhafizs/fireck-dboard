import Modal from "@material-ui/core/Modal";
import Input from "components/Input";
import Select from "components/Select";
import Button from "components/Button";
import { CollectionType } from "api/collectionTypes";
import React from "react";
import { useFormik } from "formik";
import Label from "components/Label";
import CloseRounded from "@material-ui/icons/CloseRounded";

export interface AddFilterModalProps {
  collectionType: Pick<CollectionType, "fields">;
  onValue: Function;
  groundColor?: "black" | "white";
}

const AddFilterModal: React.FC<AddFilterModalProps> = ({
  collectionType,
  onValue,
  groundColor = "white",
}) => {
  const operators = [
    "<",
    "<=",
    "==",
    ">",
    ">=",
    "!=",
    "array-contains",
    "array-contains-any",
    "in",
    "not-in",
  ];

  const [open, setOpen] = React.useState(false);

  const { values, errors, handleChange, submitCount, handleSubmit, isSubmitting } = useFormik({
    onSubmit: async (vals, { resetForm }) => {
      onValue(vals);
      setOpen(false);
      resetForm();
    },
    initialValues: {
      value: "",
      operator: "",
      fieldId: "",
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

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-fireck-4 hover:bg-fireck-4-hover min-w-unset flex items-center justify-center h-28px px-7 rounded text-sm mr-3 mb-3"
      >
        Filters
      </Button>
      {!open ? null : (
        <Modal open={open}>
          <div
            className="fixed left-0 top-0 w-full h-full flex p-7"
            onMouseDown={() => setOpen(false)}
          >
            <div
              onMouseDown={(e) => e.stopPropagation()}
              className="bg-white rounded p-7 m-auto relative animate-littlemoveup"
              style={{ maxWidth: 600 }}
            >
              <CloseRounded
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => setOpen(false)}
              ></CloseRounded>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="sm:w-1/3 w-full mb-3 px-2">
                  <Label
                    groundColor={groundColor}
                    className="mb-2"
                    error={submitCount > 0 ? errors.fieldId : null}
                  >
                    Field
                  </Label>
                  <Select
                    className="h-34px"
                    groundColor="white"
                    name="fieldId"
                    onChange={handleChange}
                    value={values.fieldId}
                    options={[
                      { value: "", label: "Select" },
                      ...collectionType.fields.map((x) => ({ value: x.id, label: x.id })),
                    ]}
                  ></Select>
                </div>
                <div className="sm:w-1/3 w-full mb-3 px-2">
                  <Label
                    groundColor={groundColor}
                    className="mb-2"
                    error={submitCount > 0 ? errors.operator : null}
                  >
                    Operator
                  </Label>
                  <Select
                    className="h-34px"
                    groundColor="white"
                    name="operator"
                    onChange={handleChange}
                    value={values.operator}
                    options={[
                      { value: "", label: "Select" },
                      ...operators.map((x) => ({ value: x, label: x })),
                    ]}
                  ></Select>
                </div>
                <div className="sm:w-1/3 w-full mb-3 px-2">
                  <Label
                    groundColor={groundColor}
                    className="mb-2 text-black"
                    error={submitCount > 0 ? errors.value : null}
                  >
                    Value
                  </Label>
                  <Input
                    groundColor="white"
                    placeholder={
                      ["in", "not in", "array-contains-any"].includes(values.operator)
                        ? "value, value, value"
                        : "value"
                    }
                    className="placeholder-black h-34px"
                    value={values.value}
                    onChange={handleChange}
                    name="value"
                  ></Input>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                  className="bg-fireck-4 hover:bg-fireck-4-hover h-34px"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddFilterModal;
