import ButtonBase from "@material-ui/core/ButtonBase";
import React from "react";
import { getFiles, FileDocument, uploadFile } from "api/files";
import InViewFetcher from "components/InViewFetcher";
import { formatBytes } from "pages/Media";
import Button from "components/Button";
import AddRounded from "@material-ui/icons/AddRounded";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import { InView } from "react-intersection-observer";
import Loader from "components/Loader";
import { callComponent } from "api/callComponent";
import { getCollection } from "api/collections";

export interface SelectMediaProps {
  multiple?: boolean;
  proceed: Function;
}

const SelectMedia: React.FC<SelectMediaProps> = ({ multiple = false, proceed }) => {
  const [assets, setAssets] = React.useState<Array<FileDocument>>([]);

  const uploadRef = React.useRef(null as any);
  const topRef = React.useRef(null as any);
  const [loading, setLoading] = React.useState<boolean | string>(false);
  const [isTopVisible, setIsTopVisible] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<number[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getCollection({
          orderBy: "createdAt",
          collectionId: "FilesReservedCollection",
        });
        if ("error" in res) {
        } else {
          setAssets(res);
        }

        setLoading(false);
      } catch (er) {
        console.log(er);
      }
    })();
  }, []);

  return (
    <div className="fixed z-30 left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40">
      <div className="m-auto rounded overflow-hidden bg-white max-w-846px w-full max-h-552px h-full relative flex-col flex">
        {!loading ? (
          <>
            <div className="w-full flex-grow relative h-0">
              {!isTopVisible ? (
                <ButtonBase
                  className="z-30 absolute shadow-2xl outline-none right-6 bottom-3 w-34px h-34px rounded flex cursor-pointer text-black bg-orange-300 hover:bg-orange-301 items-center justify-center"
                  onClick={() => topRef.current.scrollIntoView({ behavior: "smooth" })}
                >
                  <ExpandLessRounded></ExpandLessRounded>
                </ButtonBase>
              ) : null}

              <div className="h-full overflow-auto">
                <InView onChange={(inView) => setIsTopVisible(inView)}>
                  <div ref={topRef}></div>
                </InView>
                <div className="p-9">
                  <div className="flex justify-between flex-wrap mb-7">
                    <div className="font-medium text-2xl leading-none mb-4 mr-4">Select file</div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      ref={uploadRef}
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (files && files.length) {
                          setLoading(
                            `Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`
                          );
                          let uploaded = 0;
                          for (let file of files) {
                            const res = await uploadFile(file);
                            uploaded++;

                            setLoading(`${uploaded}/${files.length} uploaded.`);
                            if (!("error" in res)) {
                              setAssets((prev) => [res, ...prev]);
                            }
                          }

                          setLoading(false);
                        }
                      }}
                    />
                    <Button
                      noMinWidth
                      onClick={() => uploadRef.current.click()}
                      className="bg-orange-300 hover:bg-orange-301 mb-4"
                    >
                      <div className="flex items-center">
                        <AddRounded className="mr-2 text-lg" fontSize="inherit"></AddRounded>
                        <span>Upload</span>
                      </div>
                    </Button>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    {assets.map((x, i) => (
                      <div
                        key={`asset-${i}`}
                        className={`xl:w-3/12 sm:w-4/12 xs:w-6/12 w-full px-3 mb-6`}
                      >
                        <div
                          onClick={() =>
                            multiple
                              ? setSelectedFiles((prev) => {
                                  let arr = [...prev];
                                  let index = arr.findIndex((g) => g === i);
                                  if (index > -1) {
                                    arr.splice(index, 1);
                                  } else {
                                    arr.push(i);
                                  }

                                  return arr;
                                })
                              : setSelectedFiles((prev) => (prev[0] === i ? [] : [i]))
                          }
                          className={`w-full relative cursor-pointer rounded-sm border-transparent overflow-hidden border-4 group ${
                            selectedFiles.includes(i) ? "border-orange-300" : ""
                          }`}
                        >
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
                </div>
              </div>
            </div>
            <div className="bg-white px-8 py-5 flex justify-center xs:justify-between flex-shrink-0 flex-wrap">
              <Button
                onClick={() => proceed(false)}
                className="bg-blue-300 hover:bg-blue-400 text-white m-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  selectedFiles.length > 0
                    ? proceed(
                        multiple
                          ? selectedFiles.map((fi) => assets[fi].url)
                          : assets[selectedFiles[0]].url
                      )
                    : {}
                }
                className="bg-orange-300 hover:bg-orange-301 m-1"
              >
                Select
              </Button>
            </div>
          </>
        ) : (
          <div className="m-auto">
            <div className="flex justify-center mb-2">
              <Loader></Loader>
            </div>
            {typeof loading === "string" ? <div>{loading}</div> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMedia;

export const callMedia = (multiple = false) => {
  return callComponent<SelectMediaProps, string | boolean>({
    Component: SelectMedia,
    props: { multiple },
  });
};
