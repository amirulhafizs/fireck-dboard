import useDraggableInPortal from "hooks/useDraggableInPortal";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRef } from "react";

interface DraggableListProps {
  onDragEnd: (val: DropResult) => void;
  Item: React.FC<any>;
  items: any[];
  containerClassName: string;
}

const DraggableList: React.FC<DraggableListProps> = ({
  onDragEnd,
  Item,
  items,
  containerClassName,
}) => {
  const renderDraggable = useDraggableInPortal();
  const uniqid = useRef<number>(Math.random());

  const formatId = (keyword: string, index: number) => {
    return `${keyword}-${index}-${uniqid.current}`;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-sub">
        {(provided) => (
          <div className={containerClassName} {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((x, i) => {
              return (
                <Draggable
                  key={formatId("draggable", i)}
                  draggableId={formatId("draggable", i)}
                  index={i}
                >
                  {renderDraggable((provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Item {...x} index={i}></Item>
                    </div>
                  ))}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
