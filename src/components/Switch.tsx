import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { ChangeEvent } from "react";

export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  groundColor: "black" | "white";
}

const useStyles = makeStyles({
  switchBase: {
    "&$checked": {
      color: getComputedStyle(document.documentElement).getPropertyValue("--fireck-4"),
    },
    "&$checked + $track": {
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--fireck-4"),
    },
  },
  checked: {},
  track: (props: any) => ({
    background: props.groundColor === "white" ? "black" : "white",
  }),
});

const CustomSwitch: React.FC<SwitchProps> = ({ value, onChange, groundColor }) => {
  const classes = useStyles({ groundColor });
  return (
    <Switch
      classes={classes}
      checked={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
    ></Switch>
  );
};

export default CustomSwitch;
