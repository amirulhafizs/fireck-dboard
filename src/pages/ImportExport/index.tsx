import { exportJson, importJson } from "api/importExport";
import { useRef, useState } from "react";
import { useNotify } from "components/NotificationsProvider";
import { findCollectionTypes } from "api/collectionTypes";
import store from "store";
import Button from "components/Button";
import Modal from "@material-ui/core/Modal";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getAppearance } from "api/adminUsers";
import { setColors } from "hooks/useConfiguration";
import PageTitle from "components/PageTitle";

export interface ImportExportProps {}

const ImportExport: React.FC<ImportExportProps> = () => {
  const uploadRef = useRef<any>(null);
  const notify = useNotify();
  const sections = [
    {
      title: "Export JSON",
      btnText: "Export",
      description:
        "Export database JSON schema. This JSON file is meant to be imported into other Fireck app",
      onClick: () => setExportOpen(true),
    },
    {
      title: "Import JSON",
      btnText: "Import",
      description: "Import database JSON schema file that was exported from other Fireck app.",
      onClick: () => {
        uploadRef.current.click();
      },
    },
  ];

  const [exportOpen, setExportOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState<{ [key: string]: boolean }>({
    collections: true,
    collectionTypes: true,
    roles: true,
    appearance: true,
  });

  const [isExporting, setIsExporting] = useState(false);

  return (
    <div>
      <PageTitle className="mb-12">Import & Export</PageTitle>
      <input
        className="hidden"
        ref={uploadRef}
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length) {
            var reader = new FileReader();
            reader.onload = async function () {
              store.dispatch({ type: "SET_LOADING", payload: "Importing database..." });
              const json = JSON.parse(reader.result as string);
              const res = await importJson(json);
              store.dispatch({ type: "SET_LOADING", payload: false });
              if (!res.error) {
                notify("Database imported!", { variant: "success" });
                const res1 = await findCollectionTypes();
                if (!res1.error) {
                  store.dispatch({ type: "SET_COLLECTION_TYPES", payload: res1 });
                }

                const res2 = await getAppearance();
                if (!res2.error) {
                  store.dispatch({ type: "SET_APPEARANCE", payload: res2 });
                  store.dispatch({ type: "SET_NEW_APPEARANCE", payload: res2 });
                  setColors(res2.colors);
                }
              }
            };
            reader.readAsText(files[0]);
          }
        }}
      ></input>
      <Modal open={exportOpen} hideBackdrop>
        <div
          className="w-full h-full overflow-auto flex bg-black bg-opacity-40"
          onMouseDown={() => setExportOpen(false)}
        >
          <div className="bg-white p-9 rounded m-auto" onMouseDown={(e) => e.stopPropagation()}>
            <div className="flex flex-wrap max-w-422px w-full mb-9">
              {Object.keys(exportOptions).map((k) => (
                <div key={k} className="flex w-1/2 px-2 items-center select-none">
                  <FormControlLabel
                    classes={{ label: "font-poppins line-clamp-1" }}
                    control={
                      <Checkbox
                        classes={{ root: "text-blue-300" }}
                        className="mr-3"
                        checked={exportOptions[k]}
                        onChange={(e) => {
                          setExportOptions((prev) => ({ ...prev, [k]: e.target.checked }));
                          if (k === "collections" && e.target.checked) {
                            setExportOptions((prev) => ({
                              ...prev,
                              collectionTypes: true,
                            }));
                          } else if (k === "collectionTypes" && !e.target.checked) {
                            setExportOptions((prev) => ({
                              ...prev,
                              collections: false,
                            }));
                          }
                        }}
                      ></Checkbox>
                    }
                    label={k}
                  ></FormControlLabel>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={async () => {
                  setIsExporting(true);
                  await exportJson(exportOptions);
                  setIsExporting(false);
                  setExportOpen(false);
                }}
                className="bg-orange-300 hover:bg-orange-301"
              >
                {isExporting ? "Exporting..." : "Export"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-wrap">
        {sections.map((s, i) => (
          <div
            key={`section-${i}`}
            className="p-7 bg-gray-300 rounded mr-3 mb-3 max-w-sm w-full flex flex-col"
          >
            <div className="font-medium text-lg mb-2">{s.title}</div>
            <div className="mb-7 text-sm">{s.description}</div>
            <div className="flex justify-end flex-grow items-end">
              <Button
                noMinWidth
                onClick={s.onClick}
                className="bg-orange-300 hover:bg-orange-301 w-140px"
              >
                {s.btnText}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportExport;
