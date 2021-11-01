import ButtonBase from "@material-ui/core/ButtonBase";
import React from "react";
import { uploadFile } from "api/files";
import Button from "components/Button";
import AddRounded from "@material-ui/icons/AddRounded";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import { InView } from "react-intersection-observer";
import { callComponent } from "api/callComponent";
import { useSelector } from "react-redux";
import { RootState } from "store";
import CollectionTable from "components/TableElements/CollectionTable";
import { MediaDocumentFormatters } from ".";
import CloseRounded from "@material-ui/icons/CloseRounded";

export interface SelectMediaProps {
  multiple?: boolean;
  proceed: Function;
}

const SelectMedia: React.FC<SelectMediaProps> = ({ multiple = false, proceed }) => {
  const uploadRef = React.useRef(null as any);
  const topRef = React.useRef(null as any);
  const [loading, setLoading] = React.useState<boolean | string>(false);
  const [isTopVisible, setIsTopVisible] = React.useState(false);
  const [refreshCounter, setCounter] = React.useState(0);

  const { collectionType } = useSelector((state: RootState) => {
    return {
      collectionType: state.systemCollectionTypes.find((x) => x.id === "FilesReservedCollection"),
    };
  });

  return (
    <div className="fixed z-30 left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40">
      <div className="m-auto p-8 rounded bg-white max-w-846px w-full max-h-552px h-full relative flex-col flex">
        {!isTopVisible ? (
          <ButtonBase
            className="z-30 absolute shadow-2xl outline-none right-6 bottom-3 w-34px h-34px rounded flex cursor-pointer text-black bg-orange-300 hover:bg-orange-301 items-center justify-center"
            onClick={() => topRef.current.scrollIntoView({ behavior: "smooth" })}
          >
            <ExpandLessRounded></ExpandLessRounded>
          </ButtonBase>
        ) : null}
        <CloseRounded
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => proceed(false)}
        ></CloseRounded>
        <InView onChange={(inView) => setIsTopVisible(inView)}>
          <div ref={topRef}></div>
        </InView>
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
                setLoading(`Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`);
                let uploaded = 0;
                for (let file of files) {
                  const res = await uploadFile(file);
                  uploaded++;

                  setLoading(`${uploaded}/${files.length} uploaded.`);
                }
                setCounter((prev) => prev + 1);
                setLoading(false);
              }
            }}
          />
          <Button
            noMinWidth
            onClick={() => uploadRef.current.click()}
            className="bg-fireck-4 hover:bg-fireck-4-hover h-28px mb-4"
          >
            <div className="flex items-center">
              <AddRounded className="mr-2 text-lg" fontSize="inherit"></AddRounded>
              <span>Upload</span>
            </div>
          </Button>
        </div>
        <div className="flex-grow h-0">
          {!collectionType ? null : (
            <CollectionTable
              groundColor="white"
              key={`media-table-${refreshCounter}`}
              onPick={(files) => {
                proceed(multiple ? files.map((f) => f.url) : files[0].url);
              }}
              singleSelect={!multiple}
              collectionType={collectionType}
              valueFormatters={MediaDocumentFormatters}
            ></CollectionTable>
          )}
        </div>
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
