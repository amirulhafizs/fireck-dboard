import React from "react";
import Button from "components/Button";
import RichTextEditor from "components/RichTextEditor";
import Input from "components/Input";
import Switch from "components/Switch";
import { useFormik } from "formik";
import JsonEditor from "components/JsonEditor";
import MultipleMediaInput from "components/MultipleMediaInput";
import SingleMediaInput from "components/SingleMediaInput";
import { FieldType } from "api/collectionTypes";
import Select from "components/Select";
import Label from "components/Label";
import RelationField from "components/RelationField";
import Textarea from "components/Textarea";
import SubcollectionField from "components/SubcollectionField";

import { useDispatch } from "react-redux";
import classNames from "classnames";

export interface DocumentFormProps {
  onSubmit: (a: { [key: string]: any } | null) => void;
  fields: FieldType[];
  editableDocument?: { [key: string]: any };
  docId?: string;
  groundColor: "black" | "white";
  level: number;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  onSubmit,
  fields,
  editableDocument,
  level,
  docId,
  groundColor,
}) => {
  const initialValues = {
    password: () => "",
    string: () => "",
    "rich-text": () => "",
    json: () => ({}),
    map: () => ({}),
    array: () => [],
    media: (x: FieldType) => (x.mediaSingle ? null : []),
    date: () => null,
    enum: () => null,
    number: () => null,
    boolean: () => false,
    relation: (x: FieldType) => (x.relationOneToOne ? "" : []),
    collection: () => [],
    document: (x: FieldType) =>
      x.documentFields.reduce((a, b) => ({ ...a, [b.id]: initialValues[b.type] }), {}),
    any: () => "",
  };

  const dispatch = useDispatch();

  const initial = fields.reduce(
    (a, b) => ({
      ...a,
      [b.id]:
        editableDocument && editableDocument[b.id]
          ? editableDocument[b.id]
          : initialValues[b.type](b),
    }),
    {}
  );

  const { values, errors, setFieldValue, handleChange, handleSubmit, submitCount, isSubmitting } =
    useFormik({
      validateOnChange: false,
      initialValues: initial as { [index: string]: any },
      enableReinitialize: true,
      onSubmit: async (vals) => {
        await dispatch({ type: "SET_DOCUMENT_CHANGED", payload: false });
        await onSubmit(vals);
      },
      validate: (vals) => {
        const errors: any = {};
        fields.forEach((x) => {
          switch (x.type) {
            case "array": {
              try {
                let obj = JSON.parse(JSON.stringify(vals[x.id]));
                if (typeof obj.map !== "function") {
                  throw new Error("object is not an array");
                }
              } catch (error) {
                errors[x.id] = "Wrong format";
              } finally {
                break;
              }
            }
            case "map": {
              try {
                let obj = JSON.parse(JSON.stringify(vals[x.id]));

                if (typeof obj === "string" || typeof obj.map === "function") {
                  throw new Error("object is not a map");
                }
              } catch (error) {
                errors[x.id] = "Wrong format";
              } finally {
                break;
              }
            }
            case "json": {
              try {
                let obj = JSON.parse(JSON.stringify(vals[x.id]));
                if (typeof obj === "string") {
                  throw new Error("object is not a map");
                }
              } catch (error) {
                errors[x.id] = "Wrong format";
              } finally {
                break;
              }
            }
            default: {
              break;
            }
          }
        });

        return errors;
      },
    });

  const hasChanged = !editableDocument || JSON.stringify(initial) !== JSON.stringify(values);

  React.useEffect(() => {
    dispatch({ type: "SET_DOCUMENT_CHANGED", payload: hasChanged });
  }, [hasChanged, dispatch]);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex justify-between flex-wrap mb-2">
        <div>
          <div
            className={classNames("font-medium text-27px leading-none capitalize mb-3 mr-4", {
              "text-white": groundColor === "black",
            })}
          >
            {docId ? `Edit Document` : `Add Document`}
          </div>
          {!docId ? null : <div className="mb-3 text-xs text-white">Doc id: {docId}</div>}
        </div>
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          disabled={isSubmitting || !hasChanged}
          className={`h-34px ${
            hasChanged
              ? "bg-fireck-4 hover:bg-fireck-4-hover"
              : "bg-gray-300 text-gray-600 cursor-default"
          }  mb-2`}
        >
          {isSubmitting ? "Loading..." : editableDocument != null ? "Save" : "Publish"}
        </Button>
      </div>
      <div className="flex-grow h-0 overflow-y-auto overflow-x-hidden pt-4 -mx-7 -mb-7 px-7">
        <div className="flex flex-wrap -mx-3">
          {Object.keys(values).length
            ? fields
                .filter((x) => !x.isDefault)
                .map((x, i) => (
                  <div
                    key={`field-${i}`}
                    className={`${
                      ["rich-text", "collection"].includes(x.type) ? "w-full" : "sm:w-1/2 w-full"
                    } px-3 mb-12`}
                  >
                    <Label
                      groundColor={groundColor}
                      className="mb-2 font-medium"
                      error={submitCount > 0 ? errors[x.id]?.toString() : null}
                    >
                      {x.id}{" "}
                    </Label>
                    {x.type === "rich-text" ? (
                      <RichTextEditor
                        style={{ height: "30vw", minHeight: 400 }}
                        value={values[x.id]}
                        onChange={(val) => setFieldValue(x.id, val)}
                      ></RichTextEditor>
                    ) : x.type === "password" ? (
                      <Input
                        groundColor={groundColor}
                        className="h-28px"
                        type="password"
                        value={values[x.id]}
                        name={x.id}
                        onChange={handleChange}
                      ></Input>
                    ) : x.type === "string" ? (
                      x.stringLong ? (
                        <Textarea
                          groundColor={groundColor}
                          value={values[x.id]}
                          onChange={handleChange}
                          name={x.id}
                        ></Textarea>
                      ) : (
                        <Input
                          groundColor={groundColor}
                          className="h-28px"
                          type="text"
                          value={values[x.id]}
                          name={x.id}
                          onChange={handleChange}
                        ></Input>
                      )
                    ) : x.type === "boolean" ? (
                      <Switch
                        groundColor={groundColor}
                        value={values[x.id]}
                        onChange={(val) => setFieldValue(x.id, val)}
                      ></Switch>
                    ) : ["array", "map", "json"].includes(x.type) ? (
                      <JsonEditor
                        value={values[x.id]}
                        onChange={(val) => setFieldValue(x.id, val)}
                      ></JsonEditor>
                    ) : x.type === "media" ? (
                      x.mediaSingle ? (
                        <SingleMediaInput
                          selectedFile={values[x.id]}
                          setSelectedFile={(file: string) => setFieldValue(x.id, file)}
                        ></SingleMediaInput>
                      ) : (
                        <MultipleMediaInput
                          selectedFiles={values[x.id]}
                          setSelectedFiles={(files: string[]) => setFieldValue(x.id, files)}
                        ></MultipleMediaInput>
                      )
                    ) : x.type === "enum" ? (
                      <Select
                        groundColor={groundColor}
                        options={[
                          { label: "Select", value: "" },
                          ...x.enumOptions.map((opt) => ({ label: opt, value: opt })),
                        ]}
                        name={x.id}
                        onChange={handleChange}
                        value={values[x.id]}
                      ></Select>
                    ) : x.type === "date" ? (
                      <Input
                        groundColor={groundColor}
                        className="h-28px"
                        type="date"
                        name={x.id}
                        onChange={handleChange}
                        value={values[x.id]}
                      ></Input>
                    ) : x.type === "number" ? (
                      <Input
                        groundColor={groundColor}
                        className="h-28px"
                        type="number"
                        name={x.id}
                        onChange={handleChange}
                        value={values[x.id]}
                      ></Input>
                    ) : x.type === "relation" ? (
                      <RelationField
                        onValue={(docIds) => setFieldValue(x.id, docIds)}
                        fieldType={x}
                        value={values[x.id]}
                      ></RelationField>
                    ) : x.type === "collection" ? (
                      <SubcollectionField
                        level={level}
                        value={values[x.id]}
                        onValue={(arr) => setFieldValue(x.id, arr)}
                        fields={x.collectionFields}
                      ></SubcollectionField>
                    ) : x.type === "any" ? (
                      <JsonEditor
                        value={values[x.id]}
                        onChange={(val) => setFieldValue(x.id, val)}
                      ></JsonEditor>
                    ) : null}
                  </div>
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
