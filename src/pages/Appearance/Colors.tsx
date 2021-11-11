import Button from "components/Button";
import ColorPicker from "components/ColorPicker";
import { TasksManager } from "facades/TasksManager";
import { useEffect } from "react";

export interface ColorsItem {
  value: string[];
}

interface ColorsProps {
  value: string[];
  onValue: (newVal: string[]) => void;
}

export const COLORS_AMOUNT = 5;

const Colors: React.FC<ColorsProps> = ({ value, onValue }) => {
  let defaultColors = [
    "#091717",
    "#122122",
    "#112929",
    "#23f3f3",
    "#4C9394",
    "#173434",
    "#091717",
    "#112929",
    "#1dcccc",
    "#3B7677",
  ];

  let mainColors =
    value.length === COLORS_AMOUNT * 2
      ? value.slice(0, COLORS_AMOUNT)
      : defaultColors.slice(0, COLORS_AMOUNT);
  let hoverColors =
    value.length === COLORS_AMOUNT * 2
      ? value.slice(COLORS_AMOUNT, COLORS_AMOUNT * 2)
      : defaultColors.slice(COLORS_AMOUNT, COLORS_AMOUNT * 2);

  let packs = [
    { label: "Main", colors: mainColors },
    { label: "Hover", colors: hoverColors },
  ];

  useEffect(() => {
    TasksManager.setColors(value);
  }, [value]);

  return (
    <div className="text-white">
      <div className="flex justify-between mb-2">
        <div className="leading-none">Colors</div>
        <Button
          onClick={() => onValue([])}
          className="h-5 px-2 bg-fireck-4 hover:bg-fireck-4-hover text-black min-w-unset text-xs"
        >
          Reset
        </Button>
      </div>

      <div>
        {packs.map((x, pi) => (
          <>
            <div className="text-xs mb-0.5">{x.label}</div>
            <div className="flex">
              {x.colors.map((c, i) => (
                <div key={`color-${i}-pack-${pi}`} className="mr-2">
                  <ColorPicker
                    value={c}
                    onValue={(val) => {
                      let arr =
                        value.length === COLORS_AMOUNT * 2 ? [...value] : [...defaultColors];
                      arr[pi * COLORS_AMOUNT + i] = val;
                      onValue(arr);
                    }}
                    className=" w-11 h-11 rounded relative cursor-pointer flex mb-2"
                    style={{ backgroundColor: c }}
                  ></ColorPicker>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Colors;
