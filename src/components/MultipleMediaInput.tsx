import PhotoLibrary from "@mui/icons-material/PhotoLibrary";
import React from "react";
import ArrowBackIosRounded from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import ButtonBase from "@mui/material/ButtonBase";
import { callComponent } from "api/callComponent";
import SelectMedia, { SelectMediaProps } from "pages/Media/SelectMedia";
import ReorderSelectedFiles from "components/ReorderSelectedFiles";
import Modal from "@mui/material/Modal";
import { ReactComponent as MediaIcon } from "assets/media.svg";

export interface MediaInputProps {
  selectedFiles: string[];
  setSelectedFiles: Function;
}

const MediaInput: React.FC<MediaInputProps> = ({ selectedFiles, setSelectedFiles }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [openReordering, setOpenReordering] = React.useState(false);

  const selectFiles = async () => {
    const res = await callComponent<SelectMediaProps, string[] | boolean>({
      Component: SelectMedia,
      props: { multiple: true },
    });

    if (typeof res !== "boolean") {
      const prevFiles = [...selectedFiles];
      setSelectedFiles([...res, ...prevFiles]);
    }
  };

  return (
    <div className="h-208px border-2 border-white rounded-md relative">
      {!selectedFiles.length ? (
        <div className="flex w-full h-full cursor-pointer relative z-10" onClick={selectFiles}>
          <div className="m-auto flex items-center text-white">
            <MediaIcon className="text-39px mr-3" fontSize="inherit"></MediaIcon>
            <div>Upload multiple files</div>
          </div>
        </div>
      ) : null}
      {selectedFiles.map((x, i) => (
        <>
          <div
            className={`absolute left-0 top-0 w-full h-full bg-center bg-contain bg-no-repeat ${
              i !== activeIndex ? "hidden" : ""
            }`}
            style={{ backgroundImage: `url(${x})` }}
          ></div>
          <img src={x} alt="" className="hidden"></img>
        </>
      ))}
      {selectedFiles.length ? (
        <div className="absolute left-0 top-0 w-full h-full">
          <div className="relative flex items-center justify-between h-full">
            <div className="absolute left-0 top-0 p-3">
              <div className="h-26px rounded bg-fireck-4 px-3 text-sm leading-26px">
                {activeIndex + 1}/{selectedFiles.length}
              </div>
            </div>
            <div className="absolute top-0 right-0 flex p-3">
              <ButtonBase
                onClick={selectFiles}
                className="outline-none h-26px w-26px mr-2 rounded bg-fireck-4 hover:bg-fireck-4-hover"
              >
                <AddRounded fontSize="small"></AddRounded>
              </ButtonBase>
              <ButtonBase
                onClick={() => {
                  setOpenReordering(true);
                }}
                className="outline-none h-26px w-26px rounded bg-fireck-4 hover:bg-fireck-4-hover"
              >
                <EditRounded fontSize="small"></EditRounded>
              </ButtonBase>
              <Modal open={openReordering}>
                <ReorderSelectedFiles
                  onClose={() => setOpenReordering(false)}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={(files: string[]) => {
                    setActiveIndex(0);
                    setSelectedFiles(files);
                  }}
                ></ReorderSelectedFiles>
              </Modal>
            </div>
            <ButtonBase
              className="bg-fireck-4 hover:bg-fireck-4-hover p-4 outline-none"
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))}
            >
              <ArrowBackIosRounded></ArrowBackIosRounded>
            </ButtonBase>
            <ButtonBase
              className="bg-fireck-4 hover:bg-fireck-4-hover p-4 outline-none"
              onClick={() =>
                setActiveIndex((prev) => (prev < selectedFiles.length - 1 ? prev + 1 : prev))
              }
            >
              <ArrowForwardIosRounded></ArrowForwardIosRounded>
            </ButtonBase>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MediaInput;
