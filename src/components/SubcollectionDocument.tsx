import { FieldType } from "api/collectionTypes";
import DocumentForm from "./DocumentForm";
import { callComponent } from "api/callComponent";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { Document } from "api/collections";

export interface SubcollectionDocumentProps {
  fields: FieldType[];
  proceed: (a: { [key: string]: any } | null) => void;
  editableDocument?: { [key: string]: any };
  level: number;
}

const SubcollectionDocument: React.FC<SubcollectionDocumentProps> = ({
  fields,
  proceed,
  editableDocument,
  level,
}) => {
  return (
    <div
      style={{ padding: Math.min(level * 30, 90) }}
      className="fixed left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40"
      onMouseDown={() => proceed(null)}
    >
      <div
        className="bg-white rounded h-full w-full p-9 relative animate-littlemoveup"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <CloseRounded
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => proceed(null)}
        ></CloseRounded>
        <DocumentForm
          level={level + 1}
          groundColor="white"
          editableDocument={editableDocument}
          fields={fields}
          onSubmit={proceed}
        ></DocumentForm>
      </div>
    </div>
  );
};

export default SubcollectionDocument;

export const getSubcollectionDocument = (props: Omit<SubcollectionDocumentProps, "proceed">) => {
  return callComponent<typeof props, Document | null>({
    Component: SubcollectionDocument,
    props,
  });
};
