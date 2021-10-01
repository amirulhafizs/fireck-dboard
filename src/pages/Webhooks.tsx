import { HttpMethod, updateCollectionType } from "api/collectionTypes";
import classNames from "classnames";
import PageTitle from "components/PageTitle";
import Select from "components/Select";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import Button from "components/Button";
import Input from "components/Input";
import SimpleBar from "simplebar-react";
import { useHistory } from "react-router-dom";
import EmptyScreen from "components/EmptyScreen";
import { Webhooks as WebhooksInterface, CmsEvent } from "api/collectionTypes";

export interface WebhooksProps {}

const initialWebhooks: WebhooksInterface = {
  find: { method: "POST", url: "" },
  "find one": { method: "POST", url: "" },
  create: { method: "POST", url: "" },
  update: { method: "POST", url: "" },
  delete: { method: "POST", url: "" },
};

const Webhooks: React.FC<WebhooksProps> = () => {
  const [collectionTypeDocId, setCollectionTypeDocId] = useState<string>();
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

  const history = useHistory();

  return (
    <div>
      <PageTitle className="mb-1">Webhooks</PageTitle>
      <div className="mb-12">Create webhooks for events in each collection</div>

      {!collectionTypes.length ? (
        <EmptyScreen
          title="Create collection to add webhooks for"
          buttonTitle="Create collection type"
          onCreate={() => history.push("/collections")}
        ></EmptyScreen>
      ) : (
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="max-w-192px mb-3 mr-4 block lg:hidden w-full">
            <Select
              onChange={(e) =>
                !changed || window.confirm("Changes will be lost")
                  ? setCollectionTypeDocId(e.target.value)
                  : {}
              }
              value={collectionTypeDocId}
              options={collectionTypes.map((x) => ({ value: x.docId, label: x.name }))}
            ></Select>
          </div>

          <SimpleBar
            className="min-w-192px flex-shrink-0 mr-4 hidden lg:block select-none max-h-72 pr-4 scrollbar-dark"
            autoHide={false}
          >
            {collectionTypes.map((x) => (
              <div
                onClick={() =>
                  !changed || window.confirm("Changes will be lost")
                    ? setCollectionTypeDocId(x.docId)
                    : {}
                }
                key={x.id}
                className={`mb-1 capitalize truncate cursor-pointer ${
                  collectionTypeDocId === x.docId ? "bg-orange-300" : "hover:bg-gray-300"
                } rounded h-34px leading-34px px-3`}
              >
                {x.name}
              </div>
            ))}
          </SimpleBar>
          <div className="lg:flex-grow w-full rounded bg-gray-300 p-7">
            {!colType ? null : (
              <>
                <div className="flex justify-between mb-4">
                  <div className="text-22px capitalize font-medium mb-3">{colType.name}</div>
                  <Button
                    disabled={!changed}
                    className={classNames("mb-3", {
                      "cursor-default bg-white text-gray-400": !changed,
                      "bg-orange-300 hover:bg-orange-301": changed,
                    })}
                    onClick={() => {
                      if (!collectionTypeDocId) return;
                      updateCollectionType(collectionTypeDocId, { webhooks });
                      dispatch({
                        type: "UPDATE_COLLECTION_TYPE",
                        docId: colType.docId,
                        payload: { webhooks },
                      });
                    }}
                  >
                    {!changed ? "Saved!" : "Save"}
                  </Button>
                </div>

                {cmsEvents.map((x) => {
                  const hook = webhooks[x];
                  return (
                    <div className="flex mb-2">
                      <div className="w-32">On {x}</div>
                      <Select
                        className="mr-2"
                        white
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
                          value={hook.url}
                          onChange={(e) => {
                            setWebhooks((prev) => {
                              let obj = { ...prev };
                              obj[x].url = e.target.value;
                              return obj;
                            });
                          }}
                          placeholder="Type your url"
                          className="w-full placeholder-gray-300"
                        ></Input>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Webhooks;
