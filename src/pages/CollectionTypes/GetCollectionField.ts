import { callComponent } from "api/callComponent";
import { FieldInputType, FieldType } from "api/collectionTypes";
import SelectFieldType, { SelectFieldTypeProps } from "./SelectFieldType";
import SpecifyFieldDetails, { SpecifyFieldDetailsProps } from "./SpecifyFieldDetails";

export const getCollectionField = async ({
  editableField,
  existingFieldNames,
  zLevel,
}: {
  editableField?: FieldType;
  existingFieldNames?: string[];
  zLevel: number;
}) => {
  let res = editableField
    ? editableField.type
    : await callComponent<SelectFieldTypeProps, FieldInputType | boolean>({
        Component: SelectFieldType,
        props: {},
      });

  if (typeof res === "boolean") return null;

  const fieldType = res;
  let res1 = await callComponent<SpecifyFieldDetailsProps, Omit<FieldType, "type"> | boolean>({
    Component: SpecifyFieldDetails,
    props: {
      fieldType,
      editableField,
      existingFieldNames,
      zLevel,
    },
  });
  if (typeof res1 === "boolean") return null;

  return { ...res1, type: res };
};
