import { HttpMethod, updateCollectionType } from "api/collectionTypes";
import classNames from "classnames";
import Select from "components/Select";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import Button from "components/Button";
import Input from "components/Input";
import { Webhooks as WebhooksInterface, CmsEvent } from "api/collectionTypes";
import SettingsPage from "components/SettingsPage";
import SimpleBar from "simplebar-react";

export interface WebhooksProps {}

const initialWebhooks: WebhooksInterface = {
  find: { method: "POST", url: "" },
  "find one": { method: "POST", url: "" },
  create: { method: "POST", url: "" },
  update: { method: "POST", url: "" },
  delete: { method: "POST", url: "" },
};

const Webhooks: React.FC<WebhooksProps> = () => {
  const [collectionTypeDocId, setCollectionTypeDocId] = useState("");
  const collectionTypes = useSelector((state: RootState) => state.collectionTypes);
  const colType = collectionTypes.find((x) => x.docId === collectionTypeDocId);

  const dispatch = useDispatch();

  const httpsMethods = ["POST", "DELETE", "PATCH", "PUT", "GET"];
  const cmsEvents: CmsEvent[] = ["create", "delete", "find", "find one", "update"];

  const [webhooks, setWebhooks] = useState<WebhooksInterface>(initialWebhooks);
  const [prevState, setPrevState] = useState<WebhooksInterface>(initialWebhooks);

  useEffect(() => {
    if (collectionTypeDocId) {
      const obj = collectionTypes.find((x) => x.docId === collectionTypeDocId);
      if (!obj) return;
      if (obj.webhooks) {
        setWebhooks(JSON.parse(JSON.stringify(obj.webhooks)));
        setPrevState(obj.webhooks);
      } else {
        setWebhooks(JSON.parse(JSON.stringify(initialWebhooks)));
        setPrevState(initialWebhooks);
      }
    }

    if (collectionTypes.length && !collectionTypeDocId) {
      setCollectionTypeDocId(collectionTypes[0].docId);
    }
  }, [collectionTypeDocId, collectionTypes]);

  const changed = JSON.stringify(prevState) !== JSON.stringify(webhooks);

  return (
    <SettingsPage
      entityContent={
        <div className="h-full rounded overflow-hidden bg-white">
          <SimpleBar className="h-full p-3">
            {!colType ? null : (
              <>
                {cmsEvents.map((x) => {
                  const hook = webhooks[x];
                  return (
                    <div className="flex mb-2">
                      <div className="w-32 font-semibold">On {x}</div>
                      <Select
                        className="mr-2 h-28px"
                        groundColor="white"
                        options={httpsMethods.map((m) => ({ value: m, label: m }))}
                        value={hook.method}
                        onChange={(e) => {
                          setWebhooks((prev) => {
                            let obj = { ...prev };
                            obj[x].method = e.target.value as HttpMethod;
                            return obj;
                          });
                        }}
                      ></Select>
                      <div className="flex-grow">
                        <Input
                          groundColor="white"
                          value={hook.url}
                          onChange={(e) => {
                            setWebhooks((prev) => {
                              let obj = { ...prev };
                              obj[x].url = e.target.value;
                              return obj;
                            });
                          }}
                          placeholder="Type your url"
                          className="w-full h-28px"
                        ></Input>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </SimpleBar>
        </div>
      }
      selectedEntityId={collectionTypeDocId}
      entities={collectionTypes}
      onSelectEntity={(docId) =>
        !changed || window.confirm("Changes will be lost") ? setCollectionTypeDocId(docId) : {}
      }
      entity="webhook"
      enitityPlural="webhooks"
      entityButtons={
        <Button
          noMinWidth
          disabled={!changed}
          className={classNames("mb-4 h-28px px-7", {
            "bg-white cursor-default text-gray-500": !changed,
            "bg-fireck-4 hover:bg-fireck-4-hover": changed,
          })}
          onClick={() => {
            if (!collectionTypeDocId) return;
            updateCollectionType(collectionTypeDocId, { webhooks });
            dispatch({
              type: "UPDATE_COLLECTION_TYPE",
              docId: collectionTypeDocId,
              payload: { webhooks },
            });
          }}
        >
          {!changed ? "Saved!" : "Save"}
        </Button>
      }
    />
  );
};

export default Webhooks;
