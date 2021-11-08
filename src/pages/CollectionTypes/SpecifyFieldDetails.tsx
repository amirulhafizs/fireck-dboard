import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import { FieldInputType, BaseField, AnyField } from "api/collectionTypes";
import FieldTypes from "components/FieldTypes";
import Select from "components/Select";
import { ReactComponent as OneToOneIcon } from "assets/one-to-one.svg";
import { ReactComponent as OneToManyIcon } from "assets/one-to-many.svg";
import Label from "components/Label";
import ToupleInput from "components/ToupleInput";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "store";
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded";
import IconButton from "components/IconButton";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { confirm } from "components/Confirm";
import Delete from "@material-ui/icons/DeleteOutlineOutlined";
import { getCollectionField } from "./GetCollectionField";
import { reorder } from ".";
import CloseRounded from "@material-ui/icons/CloseRounded";
import DraggableList from "components/DraggableList";

export interface SpecifyFieldDetailsProps {
  editableField?: AnyField;
  existingFieldNames?: string[];
  fieldType: FieldInputType;
  proceed: Function;
  zLevel: number;
}

type CustomErrors = { id?: string; enumOptions?: string; relatedCollectionTypeDocId?: string };

const SpecifyFieldDetails: React.FC<SpecifyFieldDetailsProps> = ({
  editableField,
  existingFieldNames,
  proceed,
  fieldType,
  zLevel,
}) => {
  const baseIntialValues: BaseField = {
    id: "",
    displayOnTable: true,
    isDefault: false,
  };
  const initialValues: AnyField = {
    ...baseIntialValues,
    ...(fieldType === "collection"
      ? { collectionFields: [], type: fieldType }
      : fieldType === "enum"
      ? { enumOptions: [], type: fieldType }
      : fieldType === "string"
      ? { stringLong: false, type: fieldType }
      : fieldType === "media"
      ? { mediaSingle: false, type: fieldType }
      : fieldType === "relation"
      ? { relatedCollectionTypeDocId: "", relationOneToOne: true, type: fieldType }
      : fieldType === "document"
      ? { documentFields: [], type: fieldType }
      : { type: fieldType }),
  };

  const { values, errors, handleChange, handleSubmit, setFieldValue, submitCount } = useFormik({
    onSubmit: (vals) => {
      proceed(vals);
    },
    initialValues: editableField ? { ...initialValues, ...editableField } : initialValues,
    validate: (vals) => {
      const errors: CustomErrors = {};

      if (!vals.id) {
        errors.id = "Field name is required";
      } else if (existingFieldNames && existingFieldNames.findIndex((x) => x === vals.id) > -1) {
        errors.id = "There is field with the same name";
      }

      if (vals.type === "enum" && vals.enumOptions.length < 2) {
        errors.enumOptions = "Enum requires at least two options";
      }

      if (vals.type === "relation" && vals.relatedCollectionTypeDocId === "") {
        errors.relatedCollectionTypeDocId = "Select related collection";
      }

      return errors;
    },
  });
  const [enumOption, setEnumOption] = React.useState("");

  const SelectedFieldType = FieldTypes.find((x) => x.type === fieldType);
  const collections = useSelector((state: RootState) => state.collectionTypes);

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }
    if (values.type === "collection") {
      const fields = reorder(
        values.collectionFields,
        result.source.index,
        result.destination.index
      );
      setFieldValue("collectionFields", fields);
    }
  };

  const addEnumOption = () => {
    if (enumOption && values.type === "enum") {
      let arr = [...values.enumOptions];
      arr.push(enumOption);
      setFieldValue("enumOptions", arr);
      setEnumOption("");
    }
  };

  let customErrors = errors as CustomErrors;

  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40">
      <div
        style={{ maxWidth: 550 }}
        className="m-auto rounded bg-white p-7 w-full relative animate-littlemoveup"
      >
        <CloseRounded
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => proceed(null)}
        ></CloseRounded>
        <div className="text-22px font-medium mb-9 flex items-center">
          {SelectedFieldType ? <SelectedFieldType.Badge></SelectedFieldType.Badge> : null}
          <span className="ml-3">
            {editableField ? "Edit" : "Add"} {SelectedFieldType ? SelectedFieldType.type : ""} field
          </span>
        </div>
        <div className="mb-9">
          <div className="mb-2">Field name</div>
          <Input
            groundColor="white"
            className="h-34px"
            data-testid={`field-id-input-${zLevel}`}
            error={submitCount > 0 ? errors.id : ""}
            value={values.id}
            name="id"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          ></Input>
        </div>

        {values.type === "media" ? (
          <ToupleInput
            data-testid={`media-touple-${zLevel}`}
            options={[
              { value: false, label: "Multiple media" },
              { value: true, label: "Single media" },
            ]}
            value={values.mediaSingle}
            setValue={(val) => setFieldValue("mediaSingle", val)}
          ></ToupleInput>
        ) : values.type === "enum" ? (
          <div className="mb-10">
            <div className="mb-2">Options</div>
            <div className="flex flex-wrap">
              {values.enumOptions.map((x, i) => (
                <div
                  data-testid={`enum-option-${x}-${zLevel}`}
                  key={`enum-option-${i}`}
                  className="bg-gray-300 rounded flex items-center px-3 h-34px mr-3 mb-3"
                >
                  <div className="mr-4">{x}</div>
                  <div
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      let arr = [...values.enumOptions];
                      arr.splice(i, 1);
                      setFieldValue("enumOptions", arr);
                    }}
                  >
                    ✕
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <Input
                groundColor="white"
                data-testid={`enum-option-input-${zLevel}`}
                className="mr-3"
                error={submitCount > 0 ? customErrors.enumOptions?.toString() : ""}
                type="text"
                value={enumOption}
                onChange={(e) => setEnumOption(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addEnumOption();
                  }
                }}
              ></Input>
              <Button
                data-testid={`add-enum-option-btn-${zLevel}`}
                onClick={addEnumOption}
                className="bg-fireck-4 hover:bg-fireck-4-hover"
              >
                Add option
              </Button>
            </div>
          </div>
        ) : values.type === "relation" ? (
          <div className="mb-10">
            <div className="mb-9">
              <Label
                groundColor="white"
                error={submitCount > 0 ? customErrors.relatedCollectionTypeDocId : ""}
                className="mb-2"
              >
                Related collection
              </Label>
              <Select
                className="h-34px"
                groundColor="white"
                data-testid={`related-collection-select-${zLevel}`}
                options={[
                  { value: "", label: "Select" },
                  ...collections.map((c) => ({ label: c.id, value: c.docId })),
                ]}
                value={values.relatedCollectionTypeDocId}
                onChange={(e) => setFieldValue("relatedCollectionTypeDocId", e.target.value)}
              ></Select>
            </div>
            <div className="mb-2">Relation type</div>
            <ToupleInput
              data-testid={`relation-multiplicity-touple-${zLevel}`}
              value={values.relationOneToOne}
              setValue={(val) => setFieldValue("relationOneToOne", val)}
              options={[
                { value: true, label: "One to one", icon: OneToOneIcon },
                { value: false, label: "One to many", icon: OneToManyIcon },
              ]}
            ></ToupleInput>
          </div>
        ) : values.type === "string" ? (
          <ToupleInput
            data-testid={`string-type-touple-${zLevel}`}
            value={values.stringLong}
            setValue={(val) => setFieldValue("stringLong", val)}
            options={[
              { label: "Short text", value: false },
              { label: "Long text", value: true },
            ]}
          ></ToupleInput>
        ) : values.type === "collection" ? (
          <div className="mb-9">
            <div className="flex mb-2">
              <div className="mr-2">Fields</div>
              <AddCircleOutlineRounded
                data-testid={`add-field-for-subcollection-btn-${zLevel}`}
                className="cursor-pointer"
                onClick={async () => {
                  const field = await getCollectionField({
                    existingFieldNames: values.collectionFields.map((x) => x.id),
                    zLevel: zLevel + 1,
                  });
                  console.log("FINAL FIELD", field);
                  if (!field) return;
                  const fields = [...values.collectionFields, field];
                  setFieldValue("collectionFields", fields);
                }}
              ></AddCircleOutlineRounded>
            </div>
            <DraggableList
              items={values.collectionFields.map((x) => ({
                field: x,
                Badge: FieldTypes.find((t) => t.type === x.type)?.Badge,
              }))}
              onDragEnd={onDragEnd}
              containerClassName="max-h-247px overflow-auto"
              Item={({
                Badge,
                field,
                index,
                ...rest
              }: {
                Badge: React.FC;
                field: AnyField;
                index: number;
                rest: any;
              }) => {
                return (
                  <div className="pb-2">
                    <div className="rounded bg-gray-300 px-3 py-2 flex items-center" {...rest}>
                      <div className="line-clamp-1 w-5/12 px-3">{field.id}</div>
                      <div className="flex w-4/12 flex-shrink-0">
                        {Badge ? <Badge></Badge> : null}
                        <span className="ml-3 hidden sm:block line-clamp-1">{field.type}</span>
                      </div>
                      <div className="flex items-center flex-grow justify-end text-base">
                        <IconButton
                          className="mr-1"
                          variant="transparent"
                          onClick={async () => {
                            const editedField = await getCollectionField({
                              zLevel: zLevel + 1,
                              editableField: field,
                              existingFieldNames: values.collectionFields
                                .map((f) => f.id)
                                .filter((f) => f !== field.id),
                            });

                            if (!editedField) return;

                            let fields = [...values.collectionFields];
                            fields[index] = editedField;
                            setFieldValue("collectionFields", fields);
                          }}
                        >
                          <EditOutlined fontSize="inherit"></EditOutlined>
                        </IconButton>
                        <IconButton
                          variant="transparent"
                          onClick={async () => {
                            let res = await confirm({
                              confirmation: "Delete field?",
                            });
                            if (res) {
                              const fields = [...values.collectionFields];
                              fields.splice(index, 1);
                              setFieldValue("collectionFields", fields);
                            }
                          }}
                        >
                          <Delete fontSize="inherit"></Delete>
                        </IconButton>
                      </div>
                    </div>
                  </div>
                );
              }}
            ></DraggableList>
          </div>
        ) : null}
        <div className="flex justify-between">
          <Button
            data-testid={`cancel-field-details-btn-${zLevel}`}
            onClick={() => proceed(editableField ? null : "back")}
            className="bg-fireck-5 hover:bg-fireck-5-hover text-white h-34px"
          >
            {editableField ? "Cancel" : "Back"}
          </Button>
          <Button
            data-testid={`submit-field-details-btn-${zLevel}`}
            type="submit"
            onClick={() => handleSubmit()}
            className="bg-fireck-4 hover:bg-fireck-4-hover h-34px"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecifyFieldDetails;
