import Checkbox from "@material-ui/core/Checkbox";
import { Document } from "api/collections";
import classNames from "classnames";

export interface SelectBarProps {
  docs: Document[];
  onSelect: (docId: string, checked: boolean) => void;
  selected: string[];
  selectAll: (select: boolean) => void;
  hoveredRow: number;
}

const SelectBar: React.FC<SelectBarProps> = ({
  docs,
  onSelect,
  selected,
  selectAll,
  hoveredRow,
}) => {
  return (
    <div className="absolute left-0 top-0 z-10">
      <div className="h-48px bg-gray-300 flex items-center w-12 justify-center">
        <Checkbox
          size="small"
          classes={{ checked: "text-blue-400" }}
          checked={selected.length === docs.length}
          onChange={(e) => selectAll(e.target.checked)}
        ></Checkbox>
      </div>
      {docs.map((x, i) => (
        <div
          className={classNames("h-48px flex items-center w-12 justify-center", {
            "bg-gray-300": hoveredRow === i,
            "bg-white": hoveredRow !== i,
          })}
          key={`checkbox-${x.docId}`}
        >
          <Checkbox
            size="small"
            classes={{ checked: "text-blue-400" }}
            checked={selected.includes(x.docId)}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onSelect(x.docId, e.target.checked)}
          ></Checkbox>
        </div>
      ))}
      {/* {docs.length <= 8 ? null : (
        <div className="h-48px bg-gray-301 flex items-center w-12 justify-center">
          <Checkbox
            size="small"
            classes={{ checked: "text-blue-400" }}
            checked={selected.length === docs.length}
            onChange={(e) => selectAll(e.target.checked)}
          ></Checkbox>
        </div>
      )} */}
    </div>
  );
};

export default SelectBar;
