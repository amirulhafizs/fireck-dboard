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
    <div>
      <div className="flex flex-wrap justify-between mb-7">
        <div className="mr-3 mb-3 text-36px font-medium capitalize leading-none">
          {!collectionType ? null : (
            <>
              {collectionType.name}
              <div
                onClick={() =>
                  window.open(window.location.origin + `/api/${collectionType.id}`, "_blank")
                }
                className="hover:bg-gray-301 rounded h-8 w-8 ml-3 inline-flex cursor-pointer"
              >
                <OpenInNew className="m-auto"></OpenInNew>
              </div>
            </>
          )}
        </div>
        <Button
          onClick={() => history.push(`/collections/${id}/add`)}
          className="bg-orange-300 hover:bg-orange-301 mb-3"
        >
          <div className="flex items-center">
            <AddRounded fontSize="inherit" className="text-lg mr-3"></AddRounded>
            Add Document
          </div>
        </Button>
      </div>

      {collectionType ? (
        <Table key={collectionType.id} collectionType={collectionType}></Table>
      ) : null}
    </div>
  );
};

export default Collection;
