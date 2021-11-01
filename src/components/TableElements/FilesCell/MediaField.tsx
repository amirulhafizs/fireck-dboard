import TooltipChild from "components/TooltipChild";
import Tooltip from "@material-ui/core/Tooltip";

interface MediaFieldProps {
  src: string;
}

const MediaField: React.FC<MediaFieldProps> = ({ src }) => {
  return (
    <Tooltip
      arrow
      title={
        <div className="p-1">
          <img src={src} className="max-w-136px max-h-136px w-auto h-auto" alt="" />
        </div>
      }
      placement="top"
      classes={{
        tooltip: "font-poppins text-xs p-0 rounded bg-fireck-1",
        arrow: "text-fireck-1",
      }}
    >
      <TooltipChild>
        <div className="group w-4 h-4 relative flex items-center justify-center rounded hover:bg-gray-535371 hover:bg-opacity-5 cursor-pointer">
          <div
            className="relative w-4 h-4 rounded-full bg-center bg-cover pointer-events-none"
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        </div>
      </TooltipChild>
    </Tooltip>
  );
};

export default MediaField;
