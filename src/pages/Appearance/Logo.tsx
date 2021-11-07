import EditRounded from "@material-ui/icons/EditRounded";
import IconButton from "components/IconButton";
import { callMedia } from "pages/Media/SelectMedia";
import Button from "components/Button";

interface LogoProps {
  value: string;
  onValue: (newVal: string) => void;
}

const Logo: React.FC<LogoProps> = ({ value, onValue }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-white leading-none">Logo</div>
        <Button
          onClick={() => onValue("")}
          className="h-5 px-2 bg-fireck-4 hover:bg-fireck-4-hover text-black min-w-unset text-xs"
        >
          Reset
        </Button>
      </div>

      <div className="bg-fireck-3 p-3 relative rounded">
        <IconButton
          className="absolute right-2 top-2"
          onClick={async () => {
            const res = await callMedia(false);
            if (typeof res === "string") {
              onValue(res);
            }
          }}
        >
          <EditRounded fontSize="inherit" className="text-base"></EditRounded>
        </IconButton>
        <img alt="" className="max-w-135px w-full" src={value}></img>
      </div>
    </div>
  );
};

export default Logo;
