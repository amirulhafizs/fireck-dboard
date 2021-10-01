import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";

const Boolean: React.FC = () => {
  return (
    <div className="w-42px rounded h-28px bg-orange-300 text-center leading-28px text-xs font-medium">
      <CalendarTodayOutlinedIcon
        fontSize="inherit"
        className="text-base"
      ></CalendarTodayOutlinedIcon>
    </div>
  );
};

export default Boolean;
