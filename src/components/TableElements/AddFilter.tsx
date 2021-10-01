import Modal from "@material-ui/core/Modal";
import Input from "components/GrayInput";
import Select from "components/Select";
import Button from "components/Button";
import { CollectionType } from "api/collectionTypes";
import React from "react";
import FilterListRounded from "@material-ui/icons/FilterListRounded";
import { useFormik } from "formik";
import Label from "components/Label";

export interface AddFilterModalProps {
  collectionType: CollectionType;
  onValue: Function;
}

const AddFilterModal: React.FC<AddFilterModalProps> = ({ collectionType, onValue }) => {
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
        noMinWidth
        onClick={() => setOpen(true)}
        className="bg-gray-300 hover:bg-gray-301 flex items-center justify-center"
      >
        <FilterListRounded className="mr-3"></FilterListRounded>
        <div>Filters</div>
      </Button>
      <Modal open={open}>
        <div className="fixed left-0 top-0 w-full h-full flex" onMouseDown={() => setOpen(false)}>
          <div onMouseDown={(e) => e.stopPropagation()} className="bg-white rounded p-7  m-auto">
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="sm:w-1/3 w-full mb-3 px-2">
                <Label className="mb-2" error={submitCount > 0 ? errors.fieldId : null}>
                  Field
                </Label>
                <Select
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
                <Label className="mb-2" error={submitCount > 0 ? errors.operator : null}>
                  Operator
                </Label>
                <Select
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
                <Label className="mb-2" error={submitCount > 0 ? errors.value : null}>
                  Value
                </Label>
                <Input
                  placeholder={
                    ["in", "not in", "array-contains-any"].includes(values.operator)
                      ? "value, value, value"
                      : "value"
                  }
                  className="placeholder-black"
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
                noMinWidth
                className="bg-orange-300 hover:bg-orange-301"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddFilterModal;
