import Button from "components/Button";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorRounded from "@material-ui/icons/DragIndicatorRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import OpenInNew from "@material-ui/icons/OpenInNew";
import DeleteIcon from "@material-ui/icons/Delete";

export interface ReorderSelectedFilesProps {
  selectedFiles: string[];
  setSelectedFiles: Function;
  onClose: Function;
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
      className="fixed z-30 left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40"
      onMouseDown={() => onClose()}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="m-auto rounded bg-white max-w-552px w-full max-h-552px h-full relative flex-col flex"
      >
        <div className="flex justify-between flex-wrap mb-4 px-9 pt-9 flex-shrink-0">
          <div className="font-medium text-2xl mr-4 mb-4">Reorder files</div>
          <Button className="mb-4 bg-orange-300 hover:bg-orange-301" onClick={() => onClose()}>
            Finish
          </Button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="flex-grow overflow-auto h-0 px-9 pb-9"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectedFiles.map((item, index) => (
                  <Draggable key={item + index} draggableId={item + index} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-300 flex items-center rounded pl-4 py-4 pr-7 mb-3 justify-between"
                      >
                        <div className="flex items-center">
                          <DragIndicatorRounded className="mr-4" />
                          <div className="bg-blue-300 rounded">
                            <div
                              className="bg-center bg-contain bg-no-repeat w-24"
                              style={{ paddingTop: "61%", backgroundImage: `url(${item})` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex">
                          <ButtonBase
                            onClick={() => window.open(item, "_blank")}
                            className="outline-none mr-2 h-26px w-26px rounded bg-orange-300 hover:bg-orange-301"
                          >
                            <OpenInNew fontSize="small"></OpenInNew>
                          </ButtonBase>
                          <ButtonBase className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301">
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ReorderSelectedFiles;
