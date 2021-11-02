import Button from "components/Button";
import PageTitle from "components/PageTitle";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { CollectionType } from "api/collectionTypes";
import EmptyScreen from "components/EmptyScreen";
import { addDocument, updateDocument, getCollection } from "api/collections";
import EmailEditorModal from "components/EmailEditorModal";
import AddRounded from "@material-ui/icons/AddRounded";
import EmailTemplateCard from "components/EmailTemplateCard";
import useWindowSize from "hooks/useWindowSize";
import { deleteDocument } from "api/collections";

import { confirm } from "components/Confirm";

export interface EmailsProps {}

export type Template = { name: string; html: string; template: Object; docId: string };

const COLLECTION_ID = "EmailsTemplatesReservedCollection";

const Emails: React.FC<EmailsProps> = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [editTemplate, setEditTemplate] = useState<Template>();
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCollection({ collectionId: COLLECTION_ID });

        setTemplates(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const emailsColType = useSelector((state: RootState) =>
    state.collectionTypes.find((x) => x.id === COLLECTION_ID)
  );

  const dispatch = useDispatch();

  const onEnable = () => {
    const colType = {
      id: COLLECTION_ID,
      name: COLLECTION_ID,
      docId: COLLECTION_ID,
      isSystem: true,
      fields: [
        { type: "string", id: "name" },
        { type: "string", id: "html" },
        { type: "json", id: "template" },
        { id: "createdAt", type: "date", displayOnTable: true, isDefault: true },
        { id: "modifiedAt", type: "date", displayOnTable: true, isDefault: true },
        { id: "docId", type: "string", displayOnTable: true, isDefault: true },
      ],
    } as CollectionType;

    addDocument(COLLECTION_ID, colType);

    dispatch({ type: "ADD_COLLECTION_TYPE", payload: colType });
  };

  const closeEditor = () => {
    setOpenEditor(false);
    setEditTemplate(undefined);
  };

  return !emailsColType ? (
    <div className="w-full h-full flex">
      <div className="m-auto">
        <div className="text-center mb-4 text-28px font-medium text-white">Emails</div>
        <Button onClick={onEnable} className="bg-fireck-4 hover:bg-fireck-4-hover h-34px">
          Enable
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex justify-between flex-wrap mb-7">
        <PageTitle className="mb-4 mr-4">Emails</PageTitle>
        <Button
          onClick={() => setOpenEditor(true)}
          className="bg-fireck-4 hover:bg-fireck-4-hover h-34px mb-4 min-w-unset"
        >
          <div className="flex items-center">
            <AddRounded className="mr-3 text-xl"></AddRounded>
            <span>Add template</span>
          </div>
        </Button>
      </div>
      {!templates.length ? (
        <EmptyScreen
          title="There are no templates"
          buttonTitle="Create"
          onCreate={() => setOpenEditor(true)}
        ></EmptyScreen>
      ) : (
        <div className="flex flex-wrap -mx-3">
          {templates.map((x, i) => (
            <div key={`email-template-${i}`} className="lg:w-3/12 md:w-4/12 w-6/12 px-3">
              <div className="w-full relative">
                <EmailTemplateCard
                  onOpen={() => {
                    setEditTemplate(x);
                    setOpenEditor(true);
                  }}
                  onDelete={async () => {
                    if (
                      await confirm({
                        confirmation: "Do you really want to delete template?",
                      })
                    ) {
                      setTemplates((prev) => {
                        let arr = [...prev];
                        arr.splice(i, 1);
                        return arr;
                      });
                      deleteDocument("EmailTemplatesReservedCollection", x.docId);
                    }
                  }}
                  windowWidth={windowWidth}
                  name={x.name}
                  html={x.html}
                ></EmailTemplateCard>
              </div>
            </div>
          ))}
        </div>
      )}
      {!openEditor ? null : (
        <EmailEditorModal
          onSave={async (template: any) => {
            if (template.docId) {
              updateDocument("EmailTemplatesReservedCollection", template.docId, template);
              setTemplates((prev) => {
                let arr = [...prev];
                const index = arr.findIndex((x) => x.docId === template.docId);
                if (index === -1) return prev;
                arr[index] = template;
                return arr;
              });
            } else {
              try {
                const res = await addDocument("EmailTemplatesReservedCollection", template);
                setTemplates((prev) => [res, ...prev]);
              } catch (error) {
                console.log(error);
              }
            }

            closeEditor();
          }}
          onClose={closeEditor}
          editTemplate={editTemplate}
        ></EmailEditorModal>
      )}
    </div>
  );
};

export default Emails;
