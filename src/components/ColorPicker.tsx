import Popover from "components/Popover";
import { SketchPicker } from "react-color";

interface ColorPickerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  onValue: (val: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onValue, ...rest }) => {
  return (
    <Popover
      content={
        <SketchPicker
          color={value}
          onChange={(color, event) => {
            onValue(color.hex);
          }}
        ></SketchPicker>
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <div {...rest}></div>
    </Popover>
  );
};

export default ColorPicker;
