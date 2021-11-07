import { callComponent } from "api/callComponent";
import { FieldInputType, AnyField } from "api/collectionTypes";
import SelectFieldType, { SelectFieldTypeProps } from "./SelectFieldType";
import SpecifyFieldDetails, { SpecifyFieldDetailsProps } from "./SpecifyFieldDetails";

export const getCollectionField = async ({
  editableField,
  existingFieldNames,
  zLevel,
}: {
  editableField?: AnyField;
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
  let res1 = await callComponent<SpecifyFieldDetailsProps, AnyField | boolean>({
    Component: SpecifyFieldDetails,
    props: {
      fieldType,
      editableField,
      existingFieldNames,
      zLevel,
      goBack: (closer) => {
        closer();
        getCollectionField({ editableField, existingFieldNames, zLevel });
      },
    },
  });
  if (typeof res1 === "boolean") return null;

  return res1;
};
