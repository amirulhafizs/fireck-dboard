import { Document } from "api/collections";
import SettingsRounded from "@material-ui/icons/SettingsOutlined";
import IconButton from "components/IconButton";
import EditRounded from "@material-ui/icons/EditOutlined";
import DeleteRounded from "@material-ui/icons/DeleteOutlineOutlined";
import classNames from "classnames";

export interface ActionsBarProps {
  configureView: () => void;
  docs: Document[];
  onlySelect?: boolean;
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
  hoveredRow: number;
}

const ActionsBar: React.FC<ActionsBarProps> = ({
  configureView,
  docs,
  onlySelect = false,
  onEdit,
  onDelete,
  hoveredRow,
}) => {
  return (
    <div className="absolute top-0 right-3 z-10">
      <div className="h-48px bg-gray-300">
        <div className="flex justify-end px-2 items-center h-full">
          <IconButton
            variant="transparent"
            onClick={() => configureView()}
            className="cursor-pointer"
          >
            <SettingsRounded fontSize="small"></SettingsRounded>
          </IconButton>
        </div>
      </div>
      {docs.map((x, i) => (
        <div
          key={x.docId}
          className={classNames(
            "h-48px bg-white",
            { "bg-gray-300": hoveredRow === i },
            { "bg-white": hoveredRow !== i }
          )}
        >
          {!onlySelect ? (
            <div className="flex justify-end px-2 items-center h-full">
              <IconButton
                variant="transparent"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  onEdit(x);
                }}
                className="cursor-pointer"
              >
                <EditRounded fontSize="small"></EditRounded>
              </IconButton>
              <IconButton
                variant="transparent"
                className="cursor-pointer"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  onDelete(x);
                }}
              >
                <DeleteRounded fontSize="small"></DeleteRounded>
              </IconButton>
            </div>
          ) : null}
        </div>
      ))}
      {/* {docs.length <= 8 ? null : (
        <div className="h-48px bg-gray-301">
          <div className="flex justify-end px-2 items-center h-full">
            <IconButton
              variant="transparent"
              onClick={() => configureView()}
              className="cursor-pointer"
            >
              <SettingsRounded fontSize="small"></SettingsRounded>
            </IconButton>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ActionsBar;
