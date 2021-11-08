import Button from "components/Button";
import React from "react";
import DragIndicatorRounded from "@material-ui/icons/DragIndicatorRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import OpenInNew from "@material-ui/icons/OpenInNew";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CloseRounded from "@material-ui/icons/CloseRounded";
import DraggableList from "./DraggableList";

export interface ReorderSelectedFilesProps {
  selectedFiles: string[];
  setSelectedFiles: Function;
  onClose: () => void;
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ReorderSelectedFiles: React.FC<ReorderSelectedFilesProps> = ({
  selectedFiles,
  setSelectedFiles,
  onClose,
}) => {
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(selectedFiles, result.source.index, result.destination.index);

    setSelectedFiles(items);
  };

  return (
    <div
      className="fixed z-30 left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40 p-7"
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="m-auto rounded bg-white max-w-552px w-full max-h-552px relative flex-col flex animate-littlemoveup"
      >
        <CloseRounded
          className="absolute right-0 top-0 cursor-pointer"
          onClick={onClose}
        ></CloseRounded>
        <div className="flex justify-between flex-wrap mb-4 px-9 pt-9 flex-shrink-0">
          <div className="font-medium text-2xl mr-4 mb-4">Reorder files</div>
          <Button className="mb-4 bg-fireck-4 hover:bg-fireck-4-hover" onClick={onClose}>
            Finish
          </Button>
        </div>
        <DraggableList
          onDragEnd={onDragEnd}
          containerClassName="px-9 pb-9 flex-grow overflow-auto"
          items={selectedFiles.map((x) => ({ item: x }))}
          Item={({ item, index }: { item: string; index: number }) => {
            return (
              <div className="pb-3">
                <div className="bg-gray-300 flex items-center rounded p-2 justify-between">
                  <div className="flex items-center">
                    <DragIndicatorRounded className="mr-4" />
                    <div className="bg-fireck-5 rounded">
                      <div
                        className="bg-center bg-cover bg-no-repeat w-11 h-11"
                        style={{ backgroundImage: `url(${item})` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex">
                    <ButtonBase
                      onClick={() => window.open(item, "_blank")}
                      className="outline-none mr-2 h-26px w-26px rounded bg-fireck-4 hover:bg-fireck-4-hover"
                    >
                      <OpenInNew fontSize="small"></OpenInNew>
                    </ButtonBase>
                    <ButtonBase className="outline-none h-26px w-26px rounded bg-fireck-4 hover:bg-fireck-4-hover">
                      <DeleteIcon
                        fontSize="small"
                        onClick={() => {
                          let arr = [...selectedFiles];
                          arr.splice(index, 1);
                          setSelectedFiles(arr);
                        }}
                      ></DeleteIcon>
                    </ButtonBase>
                  </div>
                </div>
              </div>
            );
          }}
        ></DraggableList>
      </div>
    </div>
  );
};

export default ReorderSelectedFiles;
