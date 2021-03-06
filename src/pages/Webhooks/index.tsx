import { useSelector } from "react-redux";
import { RootState } from "store";
import { WebhookDocument } from "api/collectionTypes";
import SettingsPage from "components/SettingsPage";
import CollectionTable, { FilterType } from "components/TableElements/CollectionTable";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Button";
import WebhookModal from "./WebhookModal";
import { addDocument, updateDocument } from "api/collections";
import { useNotify } from "components/NotificationsProvider";

export interface WebhooksProps {}

const COLLECTION_ID = "WebhooksReservedCollection";

const Webhooks: React.FC<WebhooksProps> = () => {
  const collectionTypes = useSelector((state: RootState) => state.collectionTypes);
  const webhookColType = collectionTypes.find((x) => x.docId === "WebhooksReservedCollection");
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editWebhook, setEditWebhook] = useState<WebhookDocument>();
  const [tableRefreshCounter, setTableRefreshCounter] = useState(0);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const [collectionTypeDocId, setCollectionTypeDocId] = useState("");
  const colType = collectionTypes.find((x) => x.docId === collectionTypeDocId);
  const notify = useNotify();

  useEffect(() => {
    if (collectionTypes.length) {
      setCollectionTypeDocId(collectionTypes[0].docId);
    }
  }, [collectionTypes]);

  useEffect(() => {
    setFilters(
      collectionTypeDocId
        ? [
            {
              fieldId: "collectionTypeDocId",
              operator: "==",
              value: collectionTypeDocId,
              hidden: true,
            },
          ]
        : []
    );
  }, [colType]);

  const closeModal = () => {
    setModalOpen(false);
    setEditWebhook(undefined);
  };

  return (
    <>
      {!colType ? null : (
        <WebhookModal
          collectionTypeDocId={collectionTypeDocId}
          open={modalOpen}
          initialValue={editWebhook}
          onClose={closeModal}
          onValue={async (val) => {
            let res;
            if (val.docId) {
              res = await updateDocument(COLLECTION_ID, val.docId, val);
            } else {
              res = await addDocument(COLLECTION_ID, val);
            }
            if (res.error) {
              notify(res.error, { variant: "error" });
            } else {
              setTableRefreshCounter((prev) => prev + 1);
            }
          }}
        ></WebhookModal>
      )}
      <SettingsPage
        entityContent={
          webhookColType ? (
            <CollectionTable
              key={`webhooks-table-${
                filters.length ? filters[0].value : ""
              }-${tableRefreshCounter}`}
              onEdit={(doc) => {
                setEditWebhook(doc as WebhookDocument);
                setModalOpen(true);
              }}
              groundColor="black"
              collectionType={webhookColType}
              filters={filters}
            ></CollectionTable>
          ) : (
            <div></div>
          )
        }
        selectedEntityId={collectionTypeDocId}
        entities={collectionTypes}
        onSelectEntity={(docId) => setCollectionTypeDocId(docId)}
        entity="webhook"
        enitityPlural="webhooks"
        entityButtons={
          <div className="flex">
            <Button
              type="button"
              onClick={() => setModalOpen(true)}
              className="bg-fireck-4 hover:bg-fireck-4-hover h-28px px-6 min-w-unset"
            >
              Add hook
            </Button>
          </div>
        }
      />
    </>
  );
};

export default Webhooks;
