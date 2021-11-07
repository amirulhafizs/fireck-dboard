import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Button from "components/Button";
import AddRounded from "@material-ui/icons/AddRounded";
import { useHistory } from "react-router-dom";
import Table from "components/TableElements/CollectionTable";
import OpenInNew from "@material-ui/icons/OpenInNew";

type CollectionParams = { id: string };
export interface CollectionProps extends RouteComponentProps<CollectionParams> {}

const Collection: React.FC<CollectionProps> = ({ match }) => {
  const id = match.params.id;
  const { collectionType } = useSelector((state: RootState) => {
    return {
      collectionType: state.collectionTypes.find((x) => x.id === id),
    };
  });

  const history = useHistory();

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex flex-wrap justify-between mb-5">
        <div className="mr-3 mb-3 text-27px font-medium capitalize leading-none text-white">
          {!collectionType ? null : (
            <div className="flex items-center">
              {collectionType.name}
              <div
                onClick={() =>
                  window.open(window.location.origin + `/api/${collectionType.id}`, "_blank")
                }
                className="hover:bg-fireck-1-hover rounded h-8 w-8 ml-3 inline-flex cursor-pointer"
              >
                <OpenInNew className="m-auto"></OpenInNew>
              </div>
            </div>
          )}
        </div>
        <Button
          onClick={() => history.push(`/collections/${id}/add`)}
          className="bg-fireck-4 hover:bg-fireck-4-hover mb-3 h-34px min-w-unset"
        >
          <div className="flex items-center">
            <AddRounded fontSize="inherit" className="text-lg sm:mr-3"></AddRounded>
            <span className="sm:block hidden">Add Document</span>
            <span className="sm:hidden">Add</span>
          </div>
        </Button>
      </div>

      {collectionType ? (
        <div className="flex-grow h-0">
          <Table
            groundColor="black"
            key={collectionType.id}
            collectionType={collectionType}
          ></Table>
        </div>
      ) : null}
    </div>
  );
};

export default Collection;
