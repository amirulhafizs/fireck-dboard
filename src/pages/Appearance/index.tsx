import { callMedia } from "pages/Media/SelectMedia";
import Logo from "assets/logo.svg";
import { useState, useEffect } from "react";
import Button from "components/Button";
import { SketchPicker } from "react-color";
import Popover from "@material-ui/core/Popover";
import IconButton from "components/IconButton";
import EditRounded from "@material-ui/icons/EditRounded";
import { useSelector } from "react-redux";
import store, { RootState } from "store";
import { updateAppearance } from "api/adminUsers";
import PageTitle from "components/PageTitle";

export interface AppearanceProps {}

const Appearance: React.FC<AppearanceProps> = () => {
  const [activeColor, setActiveColor] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);

  const [newAppearance, appearance] = useSelector((state: RootState) => [
    state.newAppearance,
    state.appearance,
  ]);

  useEffect(() => {
    document.documentElement.style.setProperty("--secondary-lighter", newAppearance.colors[0]);
    document.documentElement.style.setProperty("--secondary-normal", newAppearance.colors[1]);
    document.documentElement.style.setProperty("--primary-normal", newAppearance.colors[2]);
    document.documentElement.style.setProperty("--primary-darker", newAppearance.colors[3]);
  }, [newAppearance]);

  const changed = !(JSON.stringify(appearance) === JSON.stringify(newAppearance));

  const labels = ["Secondary", "Secondary\ndarker", "Primary", "Primary\ndarker"];

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-8">
        <PageTitle className="mb-4 mr-3">Appearance</PageTitle>
        <Button
          onClick={() => {
            updateAppearance(newAppearance);
            store.dispatch({ type: "SET_APPEARANCE", payload: { ...newAppearance } });
          }}
          disabled={!changed}
          className={`${
            changed
              ? "bg-orange-300 hover:bg-orange-301"
              : "bg-gray-300 text-gray-500 cursor-default"
          }  mb-4`}
        >
          {changed ? "Save" : "Saved!"}
        </Button>
      </div>
      <div className="flex flex-wrap">
        <div className="mr-12 mb-12">
          <div className="mb-2">Logo</div>
          <div className="bg-blue-300 p-3 relative">
            <IconButton
              className="absolute right-2 top-2"
              onClick={async () => {
                const res = await callMedia(false);
                if (typeof res === "string") {
                  store.dispatch({ type: "UPDATE_NEW_APPEARANCE", payload: { logo: res } });
                }
              }}
            >
              <EditRounded fontSize="inherit" className="text-lg"></EditRounded>
            </IconButton>
            <img
              alt=""
              className="max-w-135px w-full"
              src={newAppearance.logo ? newAppearance.logo : Logo}
            ></img>
          </div>
        </div>
        <div>
          <div className="mb-2">Colors</div>

          <div className="flex">
            {newAppearance.colors.map((x, i) => (
              <div key={`color-${i}`} className="w-90px">
                <div
                  onClick={(e: any) => {
                    setAnchorEl(e.currentTarget);
                    setActiveColor(i);
                  }}
                  className="w-90px h-90px relative cursor-pointer flex mb-2"
                  style={{ backgroundColor: x }}
                ></div>
                <div className="text-sm text-center">{labels[i]}</div>
              </div>
            ))}
          </div>
          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            anchorEl={anchorEl}
            open={anchorEl ? true : false}
            onClose={() => {
              setAnchorEl(null);
              setActiveColor(-1);
            }}
          >
            <SketchPicker
              color={newAppearance.colors[activeColor]}
              onChange={(color, event) => {
                let arr = [...newAppearance.colors];
                arr[activeColor] = color.hex;
                store.dispatch({ type: "UPDATE_NEW_APPEARANCE", payload: { colors: arr } });
              }}
            ></SketchPicker>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
