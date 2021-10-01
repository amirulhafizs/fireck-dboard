import Button from "components/Button";
import { IoAdd } from "react-icons/io5";
import React from "react";
import { FileDocument, deleteFile, uploadFile } from "api/files";
import store from "store";
import InViewFetcher from "components/InViewFetcher";
import ButtonBase from "@material-ui/core/ButtonBase";
import OpenInNew from "@material-ui/icons/OpenInNew";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirm } from "components/Confirm";
import { useNotify } from "components/NotificationsProvider";
import PageTitle from "components/PageTitle";
import EmptyScreen from "components/EmptyScreen";
import { getCollection } from "api/collections";

export function formatBytes(a: number, b = 2) {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  );
}

export interface MediaProps {}

const Media: React.FC<MediaProps> = () => {
  const uploadRef = React.useRef(null as any);
  const [assets, setAssets] = React.useState<Array<FileDocument>>([]);
  const notify = useNotify();

  React.useEffect(() => {
    (async () => {
      try {
        store.dispatch({ type: "SET_LOADING", payload: true });
        const res = await getCollection({
          collectionId: "FilesReservedCollection",
          orderBy: "createdAt",
        });
        if ("error" in res) {
        } else {
          setAssets(res);
        }

        store.dispatch({ type: "SET_LOADING", payload: false });
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);
  return (
    <div>
      <div className="flex justify-between flex-wrap mb-7">
        <PageTitle className="mb-4 mr-4">Media</PageTitle>
        <input
          type="file"
          multiple
          className="hidden"
          ref={uploadRef}
          onChange={async (e) => {
            const files = e.target.files;
            if (files && files.length) {
              store.dispatch({
                type: "SET_LOADING",
                payload: `Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`,
              });
              let uploaded = 0;
              for (let file of files) {
                const res = await uploadFile(file);
                if (!("error" in res)) {
                  uploaded++;
                  store.dispatch({
                    type: "SET_LOADING",
                    payload: `${uploaded}/${files.length} uploaded.`,
                  });
                  setAssets((prev) => [res, ...prev]);
                } else {
                  notify("Permission denied. Try reload the app", { variant: "error" });
                }
              }

              store.dispatch({ type: "SET_LOADING", payload: false });
            }
          }}
        />
        <Button
          noMinWidth
          onClick={() => uploadRef.current.click()}
          className="bg-orange-300 hover:bg-orange-301 mb-4"
        >
          <div className="flex items-center">
            <IoAdd className="mr-2" size={18}></IoAdd>
            <span>Upload</span>
          </div>
        </Button>
      </div>
      {/* <div className="mb-6 text-gray-600 leading-none">{count} files in total</div> */}
      {!assets.length ? (
        <EmptyScreen
          buttonTitle="Upload"
          title="There are no media files yet"
          onCreate={() => uploadRef.current.click()}
        ></EmptyScreen>
      ) : (
        <div className="flex flex-wrap -mx-3">
          {assets.map((x, i) => (
            <div key={`asset-${i}`} className="xl:w-3/12 lg:w-4/12 xs:w-6/12 w-full px-3 mb-6">
              <div className="w-full relative rounded-sm overflow-hidden group">
                <div className="absolute top-0 left-0 justify-between p-3 w-full z-20 group-hover:opacity-100 opacity-0 transition duration-200 flex">
                  <ButtonBase
                    onClick={() => window.open(x.url, "_blank")}
                    className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301"
                  >
                    <OpenInNew fontSize="small"></OpenInNew>
                  </ButtonBase>
                  <ButtonBase className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301">
                    <DeleteIcon
                      fontSize="small"
                      onClick={async () => {
                        if (
                          await confirm({
                            confirmation: "Do you really want to delete this file?",
                          })
                        ) {
                          setAssets((prev) => {
                            let arr = [...prev];
                            arr.splice(i, 1);
                            return arr;
                          });
                          const res = await deleteFile(x.docId, x.storagePath);
                          if (!("error" in res)) {
                            notify("File deleted!", { variant: "success" });
                          }
                        }
                      }}
                    ></DeleteIcon>
                  </ButtonBase>
                </div>

                <div style={{ paddingTop: "61%" }} className="bg-blue-300"></div>
                <div
                  style={{ paddingTop: "61%", backgroundImage: `url(${x.url})` }}
                  className="bg-center bg-contain bg-no-repeat absolute left-0 top-0 z-10 w-full"
                ></div>

                <div className="p-4 bg-gray-300">
                  <div className="line-clamp-1 font-medium mb-3">{x.name}</div>
                  <div className="flex justify-between">
                    <div>{formatBytes(x.size)}</div>
                    <div>
                      <div className="bg-orange-300 rounded px-2 py-0.5 text-sm">
                        {x.name.split(".").slice(-1).pop()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {assets.length ? (
            <InViewFetcher
              limit={10}
              onValue={(results: Array<FileDocument>) => {
                setAssets((prev) => [...prev, ...results]);
              }}
              fetcher={() =>
                getCollection({
                  collectionId: "FilesReservedCollection",
                  startAfter: assets[assets.length - 1].createdAt,
                  orderBy: "createdAt",
                })
              }
            ></InViewFetcher>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Media;
