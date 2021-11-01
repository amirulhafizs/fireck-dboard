import Button from "components/Button";
import React, { useState } from "react";
import { uploadFile } from "api/files";
import store, { RootState } from "store";
import { useNotify } from "components/NotificationsProvider";
import PageTitle from "components/PageTitle";
import CollectionTable from "components/TableElements/CollectionTable";
import { useSelector } from "react-redux";
import AddRounded from "@material-ui/icons/AddRounded";
import { formatBytes } from "helper";

export interface MediaProps {}

export const MediaDocumentFormatters = {
  url: (value: string) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        window.open(value, "_blank");
      }}
      className="bg-center bg-cover h-10 w-10 mx-auto bg-gray-E1E1E1"
      style={{ backgroundImage: `url(${value})` }}
    ></div>
  ),
  size: (value: number) => formatBytes(value),
};

const Media: React.FC<MediaProps> = () => {
  const uploadRef = React.useRef(null as any);
  const notify = useNotify();
  const [refreshCounter, setCounter] = useState(0);

  const { collectionType } = useSelector((state: RootState) => {
    return {
      collectionType: state.systemCollectionTypes.find((x) => x.id === "FilesReservedCollection"),
    };
  });

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between flex-wrap mb-3">
        <PageTitle className="mb-4 mr-4">Media</PageTitle>
        <input
          key={`file-input-${refreshCounter}`}
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
                } else {
                  alert(JSON.stringify(res));
                  notify("Permission denied. Try reload the app", { variant: "error" });
                }
              }

              store.dispatch({ type: "SET_LOADING", payload: false });
              setCounter((prev) => prev + 1);
            }
          }}
        />
        <Button
          noMinWidth
          onClick={() => uploadRef.current.click()}
          className="bg-fireck-4 hover:bg-fireck-4-hover mb-4 h-34px pr-6 pl-5"
        >
          <div className="flex items-center">
            <AddRounded className="mr-2 text-lg" fontSize="inherit"></AddRounded>
            <span>Upload</span>
          </div>
        </Button>
      </div>

      {!collectionType ? null : (
        <CollectionTable
          groundColor="black"
          key={`files-table-${refreshCounter}`}
          valueFormatters={MediaDocumentFormatters}
          collectionType={collectionType}
        ></CollectionTable>
      )}
    </div>
  );
};

export default Media;
