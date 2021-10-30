import React from "react";
import Input from "components/GrayInput";
import Button from "components/Button";
import { FieldInputType, FieldType } from "api/collectionTypes";
import FieldTypes from "components/fieldTypes";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { reorder } from ".";

export interface SpecifyFieldDetailsProps {
  editableField?: FieldType;
  existingFieldNames?: string[];
  fieldType: FieldInputType;
  proceed: Function;
  zLevel: number;
}

const SpecifyFieldDetails: React.FC<SpecifyFieldDetailsProps> = ({
  editableField,
  existingFieldNames,
  proceed,
  fieldType,
  zLevel,
}) => {
  const initialValues = {
    id: "",
    mediaSingle: false,
    enumOptions: [] as Array<string>,
    relatedCollectionTypeDocId: "",
    relationOneToOne: true,
    displayOnTable: true,
    stringLong: false,
    collectionFields: [] as FieldType[],
  };
  const { values, errors, handleChange, handleSubmit, setFieldValue, submitCount } = useFormik({
    onSubmit: (vals) => {
      proceed(vals);
    },
    initialValues: editableField ? { ...initialValues, ...editableField } : initialValues,
    validate: (vals) => {
      const errors: any = {};

      if (!vals.id) {
        errors.id = "Field name is required";
      } else if (existingFieldNames && existingFieldNames.findIndex((x) => x === vals.id) > -1) {
        errors.id = "There is field with the same name";
      }

      if (fieldType === "enum" && vals.enumOptions.length < 2) {
        errors.enumOptions = "Enum requires at least two options";
      }

      if (fieldType === "relation" && vals.relatedCollectionTypeDocId === "") {
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
    const fields = reorder(values.collectionFields, result.source.index, result.destination.index);
    setFieldValue("collectionFields", fields);
  };

  const addEnumOption = () => {
    if (enumOption) {
      let arr = [...values.enumOptions];
      arr.push(enumOption);
      setFieldValue("enumOptions", arr);
      setEnumOption("");
    }
  };

  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40">
      <div className="m-auto rounded bg-white p-9 max-w-600px w-full">
        <div className="text-22px font-medium mb-9 flex items-center">
          {SelectedFieldType ? <SelectedFieldType.Badge></SelectedFieldType.Badge> : null}
          <span className="ml-3">
            {editableField ? "Edit" : "Add"} {SelectedFieldType ? SelectedFieldType.type : ""} field
          </span>
        </div>
        <div className="mb-9">
          <div className="mb-2">Field name</div>
          <Input
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

        {fieldType === "media" ? (
          <ToupleInput
            data-testid={`media-touple-${zLevel}`}
            options={[
              { value: false, label: "Multiple media" },
              { value: true, label: "Single media" },
            ]}
            value={values.mediaSingle}
            setValue={(val) => setFieldValue("mediaSingle", val)}
          ></ToupleInput>
        ) : fieldType === "enum" ? (
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
                data-testid={`enum-option-input-${zLevel}`}
                className="mr-3"
                error={submitCount > 0 ? errors.enumOptions?.toString() : ""}
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
                className="bg-orange-300 hover:bg-orange-301"
              >
                Add option
              </Button>
            </div>
          </div>
        ) : fieldType === "relation" ? (
          <div className="mb-10">
            <div className="mb-9">
              <Label
                error={submitCount > 0 ? errors.relatedCollectionTypeDocId : ""}
                className="mb-2"
              >
                Related collection
              </Label>
              <Select
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
        ) : fieldType === "string" ? (
          <ToupleInput
            data-testid={`string-type-touple-${zLevel}`}
            value={values.stringLong}
            setValue={(val) => setFieldValue("stringLong", val)}
            options={[
              { label: "Short text", value: false },
              { label: "Long text", value: true },
            ]}
          ></ToupleInput>
        ) : fieldType === "collection" ? (
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
                  if (!field) return;
                  const fields = [...values.collectionFields, field];
                  setFieldValue("collectionFields", fields);
                }}
              ></AddCircleOutlineRounded>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable-sub">
                {(provided, snapshot) => (
                  <div
                    className=" max-h-247px overflow-auto"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {values.collectionFields.map((x, i) => {
                      const Badge = FieldTypes.find((t) => t.type === x.type)?.Badge;
                      return (
                        <Draggable key={x.id} draggableId={x.id + 1} index={i}>
                          {(provided, snapshot) => (
                            <div
                              key={`field-${i}`}
                              className="rounded bg-gray-300 px-3 py-2 flex mb-2 items-center"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="line-clamp-1 w-5/12 px-3">{x.id}</div>
                              <div className="flex w-4/12 flex-shrink-0">
                                {Badge ? <Badge></Badge> : null}
                                <span className="ml-3 hidden sm:block line-clamp-1">{x.type}</span>
                              </div>
                              <div className="flex items-center flex-grow justify-end">
                                <IconButton
                                  variant="transparent"
                                  onClick={async () => {
                                    const field = await getCollectionField({
                                      zLevel: zLevel + 1,
                                      editableField: x,
                                      existingFieldNames: values.collectionFields
                                        .map((f) => f.id)
                                        .filter((f) => f !== x.id),
                                    });

                                    if (!field) return;

                                    let fields = [...values.collectionFields];
                                    fields[i] = { ...x, ...field };
                                    setFieldValue("collectionFields", fields);
                                  }}
                                >
                                  <EditOutlined fontSize="small"></EditOutlined>
                                </IconButton>
                                <IconButton
                                  variant="transparent"
                                  onClick={async () => {
                                    let res = await confirm({
                                      confirmation: "Do you really want to delete the field?",
                                    });
                                    if (res) {
                                      const fields = [...values.collectionFields];
                                      fields.splice(i, 1);
                                      setFieldValue("collectionFields", fields);
                                    }
                                  }}
                                >
                                  <Delete fontSize="small"></Delete>
                                </IconButton>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ) : null}
        <div className="flex justify-between">
          <Button
            data-testid={`cancel-field-details-btn-${zLevel}`}
            onClick={() => {
              proceed(false);
            }}
            className="bg-blue-300 hover:bg-blue-400 text-white"
          >
            Cancel
          </Button>
          <Button
            data-testid={`submit-field-details-btn-${zLevel}`}
            type="submit"
            onClick={() => handleSubmit()}
            className="bg-orange-300 hover:bg-orange-301"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecifyFieldDetails;
