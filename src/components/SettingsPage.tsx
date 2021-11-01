import Button from "components/Button";
import React, { ReactElement, useState } from "react";
import Edit from "@material-ui/icons/EditRounded";
import Select from "components/Select";
import SimpleBar from "simplebar-react";
import AddRounded from "@material-ui/icons/AddRounded";

export interface CollectionsBuilderProps {
  entity: string;
  enitityPlural: string;
  onAddEntity?: () => void;
  entities: { name: string; docId: string }[];
  onSelectEntity: (id: string) => void;
  entityButtons: ReactElement;
  onInvokeEntityEdit?: () => void;
  entityContent: ReactElement;
  selectedEntityId: string;
}

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const CollectionsBuilder: React.FC<CollectionsBuilderProps> = ({
  entity,
  enitityPlural,
  onAddEntity,
  entities,
  onSelectEntity,
  entityButtons,
  onInvokeEntityEdit,
  entityContent,
  selectedEntityId,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap justify-between mb-4">
        <div className="font-medium text-27px leading-none mb-4 mr-4 text-white capitalize">
          {enitityPlural}
        </div>
        {!onAddEntity ? null : (
          <Button
            noMinWidth
            data-testid="add-collection-btn"
            onClick={onAddEntity}
            className="bg-fireck-4 hover:bg-fireck-4-hover mb-4"
          >
            <div className="flex items-center pointer-events-none h-34px">
              <AddRounded className="mr-2 text-lg" fontSize="inherit"></AddRounded>
              <span className="hidden md:block">Add {entity}</span>
              <span className="md:hidden">Add</span>
            </div>
          </Button>
        )}
      </div>
      {!entities.length ? (
        <div></div>
      ) : (
        <div className="flex flex-wrap lg:flex-nowrap w-full flex-grow">
          <SimpleBar
            className="max-w-192px w-full flex-shrink-0 mr-4 hidden lg:block max-h-96 scrollbar-dark pr-3"
            autoHide={false}
          >
            {entities.map((x) => (
              <div
                data-testid={`entity-name-${x.name}`}
                onClick={() => {
                  onSelectEntity(x.docId);
                }}
                key={`entity-${x.docId}`}
                className={`mb-1 capitalize truncate select-none cursor-pointer ${
                  selectedEntityId === x.docId
                    ? "bg-fireck-4"
                    : "hover:bg-fireck-1-hover text-white"
                } rounded h-28px leading-28px px-3`}
              >
                {x.name}
              </div>
            ))}
          </SimpleBar>

          <div className="lg:flex-grow w-full rounded-lg bg-fireck-3 p-7 flex flex-col">
            <div className="flex justify-between mb-3 flex-wrap">
              <div className="font-medium text-22px capitalize mb-3 mr-3 text-white">
                <span className="hidden lg:inline-block">
                  {entities.find((x) => x.docId === selectedEntityId)?.name || ""}
                </span>
                <div className="lg:hidden inline-block text-black text-base">
                  <Select
                    className="h-28px"
                    groundColor="black"
                    onChange={(e) => onSelectEntity(e.target.value)}
                    value={selectedEntityId}
                    options={entities.map((x) => ({ label: x.name, value: x.docId }))}
                  ></Select>
                </div>
                {!onInvokeEntityEdit ? null : (
                  <Edit
                    data-testid="edit-collection-btn"
                    onClick={onInvokeEntityEdit}
                    className="ml-3 text-lg cursor-pointer"
                    fontSize="inherit"
                  ></Edit>
                )}
              </div>
              {entityButtons}
            </div>

            <div className="flex-grow h-0">{entityContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsBuilder;
