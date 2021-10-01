import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/styles/withStyles";
import { ChangeEvent } from "react";

export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const PurpleSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: getComputedStyle(document.documentElement).getPropertyValue("--primary-darker"),
    },
    "&$checked + $track": {
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(
        "--primary-darker"
      ),
    },
  },
  checked: {},
  track: {},
})(Switch);

const CustomSwitch: React.FC<SwitchProps> = ({ value, onChange }) => {
  return (
    // <div
    //   className="relative rounded bg-gray-300 h-8 w-90px cursor-pointer select-none text-xs"
    //   onClick={() => onChange(!value)}
    // >
    //   <div
    //     className={`${
    //       value ? "left-45px bg-orange-300" : "left-0 bg-blue-300 text-white"
    //     } absolute transition-all w-45px rounded h-full flex items-center justify-center`}
    //   >
    //     {value ? "On" : "Off"}
    //   </div>
    // </div>
    <PurpleSwitch
      checked={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
    ></PurpleSwitch>
  );
};

export default CustomSwitch;
