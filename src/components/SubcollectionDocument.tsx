import { FieldType } from "api/collectionTypes";
import DocumentForm from "./DocumentForm";
import { callComponent } from "api/callComponent";

export interface SubcollectionDocumentProps {
  collectionName: string;
  fields: FieldType[];
  proceed: (a: { [key: string]: any } | null) => void;
  editableDocument?: { [key: string]: any };
}

const SubcollectionDocument: React.FC<SubcollectionDocumentProps> = ({
  collectionName,
  fields,
  proceed,
  editableDocument,
}) => {
  return (
    <div
      className="fixed  left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40 sm:p-7"
      onMouseDown={() => proceed(null)}
    >
      <div
        className="max-w-5xl w-full bg-white rounded m-auto p-12"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <DocumentForm
          allowDiscard={true}
          editableDocument={editableDocument}
          collectionName={collectionName}
          fields={fields}
          onSubmit={proceed}
        ></DocumentForm>
      </div>
    </div>
  );
};

export default SubcollectionDocument;

export const getSubcollectionDocument = (props: Omit<SubcollectionDocumentProps, "proceed">) => {
  return callComponent<typeof props, { [key: string]: any } | null>({
    Component: SubcollectionDocument,
    props,
  });
};
