import Dropdown from "components/Dropdown";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";

export interface EnumInputProps {
  value: string;
  options: string[];
  setValue: Function;
}

const EnumInput: React.FC<EnumInputProps> = ({ options, value, setValue }) => {
  return (
    <Dropdown
      className="w-full"
      content={
        <div className="max-h-36 overflow-auto">
          {options.map((opt, ind) => (
            <div
              key={`opt-${ind}`}
              onClick={() => setValue(opt)}
              className="py-1 px-3 hover:bg-gray-300"
            >
              {opt}
            </div>
          ))}
        </div>
      }
    >
      <div className="h-34px rounded bg-gray-300 flex items-center px-3 w-full">
        <div className="flex-grow line-clamp-1">{value ? value : "Select"}</div>
        <ArrowDown></ArrowDown>
      </div>
    </Dropdown>
  );
};

export default EnumInput;
