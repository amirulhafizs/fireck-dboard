import { ReactComponent as SubColIcon } from "assets/subcollection.svg";

const Media: React.FC = () => {
  return (
    <div className="flex-shrink-0 flex w-42px rounded h-28px bg-blue-300 text-white text-center leading-28px text-xs font-medium">
      <SubColIcon className="m-auto"></SubColIcon>
    </div>
  );
};

export default Media;
