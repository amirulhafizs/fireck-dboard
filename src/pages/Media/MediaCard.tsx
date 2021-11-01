import ButtonBase from "@material-ui/core/ButtonBase";
import OpenInNew from "@material-ui/icons/OpenInNew";
import DeleteIcon from "@material-ui/icons/Delete";
import { formatBytes } from "helper";

export interface MediaObject {
  name: string;
  url: string;
  size: number;
}

interface MediaCardProps {
  onDelete: () => void;
  onEdit: (name: string) => void;
  file: MediaObject;
}

const MediaCard: React.FC<MediaCardProps> = ({ onDelete, onEdit, file }) => {
  return (
    <div className="xl:w-3/12 lg:w-4/12 xs:w-6/12 w-full px-3 mb-6">
      <div className="w-full relative rounded overflow-hidden group">
        <div className="absolute top-0 left-0 justify-between p-3 w-full z-20 group-hover:opacity-100 opacity-0 transition duration-200 flex">
          <ButtonBase
            onClick={() => window.open(file.url, "_blank")}
            className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301"
          >
            <OpenInNew fontSize="small"></OpenInNew>
          </ButtonBase>
          <ButtonBase className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301">
            <DeleteIcon fontSize="small" onClick={onDelete}></DeleteIcon>
          </ButtonBase>
        </div>

        <div style={{ paddingTop: "61%" }} className="bg-fireck-3"></div>
        <div
          style={{ paddingTop: "61%", backgroundImage: `url(${file.url})` }}
          className="bg-center bg-contain bg-no-repeat absolute left-0 top-0 z-10 w-full"
        ></div>

        <div className="p-3 bg-white">
          <div className="line-clamp-1 font-medium mb-3">{file.name}</div>
          <div className="flex justify-between text-sm">
            <div>{formatBytes(file.size)}</div>
            <div>
              <div className="bg-orange-300 rounded px-2 py-0.5 text-xs">
                {file.name.split(".").slice(-1).pop()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
