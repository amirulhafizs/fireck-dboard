import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { addDocument, Document, getDocument, updateDocument } from "api/collections";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useHistory } from "react-router-dom";
import { useNotify } from "components/NotificationsProvider";
import DocumentForm from "components/DocumentForm";

type CollectionParams = { id: string; docId: string };
export interface AddDocumentProps extends RouteComponentProps<CollectionParams> {}

const AddDocument: React.FC<AddDocumentProps> = ({ match }) => {
  const collectionId = match.params.id;
  const docId = match.params.docId;
  const collectionType = useSelector((state: RootState) =>
    state.collectionTypes.find((x) => x.id === collectionId)
  );

  const [doc, setDoc] = React.useState<Document | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        if (!collectionType) return;
        if (!docId && !collectionType.single) return;
        const res = await getDocument(collectionId, docId);

        if (!res.error) {
          setDoc(res);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId, collectionId, collectionType]);

  const history = useHistory();
  const notify = useNotify();

  return !collectionType ? null : (
    <DocumentForm
      level={0}
      groundColor="black"
      docId={docId}
      editableDocument={doc ? doc : undefined}
      fields={collectionType.fields}
      onSubmit={async (vals) => {
        if (vals) {
          if (docId != null) {
            await updateDocument(collectionType.id, docId, vals);
            notify("Document updated!", { variant: "success" });
          } else {
            const res = await addDocument(collectionType.id, vals);
            console.log("Add doc res", res);
            if (collectionType.single) {
              notify("Document updated!", { variant: "success" });
              return;
            }
            notify("Document added!", { variant: "success" });
          }
        }

        if (!collectionType.single) {
          history.goBack();
        }
      }}
    ></DocumentForm>
  );
};

export default AddDocument;
