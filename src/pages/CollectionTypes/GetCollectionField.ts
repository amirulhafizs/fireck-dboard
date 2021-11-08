import { callComponent } from "api/callComponent";
import { FieldInputType, AnyField } from "api/collectionTypes";
import SelectFieldType, { SelectFieldTypeProps } from "./SelectFieldType";
import SpecifyFieldDetails, { SpecifyFieldDetailsProps } from "./SpecifyFieldDetails";

export const getCollectionField = async ({
  editableField,
  existingFieldNames,
  initialFieldInputType,
  zLevel,
}: {
  editableField?: AnyField;
  existingFieldNames?: string[];
  initialFieldInputType?: FieldInputType;
  zLevel: number;
}): Promise<AnyField | null> => {
  let res = editableField
    ? editableField.type
    : await callComponent<SelectFieldTypeProps, FieldInputType | null>({
        Component: SelectFieldType,
        props: initialFieldInputType ? { initialFieldInputType } : {},
      });

  if (res == null) return res;

  const fieldType = res;
  let res1: AnyField | null | "back" = await callComponent<
    SpecifyFieldDetailsProps,
    AnyField | null | "back"
  >({
    Component: SpecifyFieldDetails,
    props: {
      fieldType,
      editableField,
      existingFieldNames,
      zLevel,
    },
  });
  if (res1 === "back") {
    return getCollectionField({
      editableField,
      existingFieldNames,
      zLevel,
      initialFieldInputType: fieldType,
    });
  } else {
    return res1;
  }
};
