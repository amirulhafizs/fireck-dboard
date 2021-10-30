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
  track: {
    background: "white",
  },
})(Switch);

const CustomSwitch: React.FC<SwitchProps> = ({ value, onChange }) => {
  return (
    <PurpleSwitch
      checked={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
    ></PurpleSwitch>
  );
};

export default CustomSwitch;
