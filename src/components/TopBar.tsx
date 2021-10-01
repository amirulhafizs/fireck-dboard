import { IoChevronDown } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import store from "store";
import ButtonBase from "@material-ui/core/ButtonBase";

const TopBar = () => {
  const history = useHistory();
  return (
    <>
      <div className="h-64px block md:hidden"></div>
      <div className="h-64px flex bg-gray-300">
        <div className="flex-grow">
          <ButtonBase
            onClick={() => history.goBack()}
            className="h-full px-29px hover:bg-white inline-flex items-center cursor-pointer outline-none"
          >
            <IoChevronDown className="transform rotate-90" size={24}></IoChevronDown>
          </ButtonBase>
        </div>
        <ButtonBase
          onClick={() => window.open("https://fireck-docs.netlify.app", "_blank")}
          className="px-9 hover:bg-white cursor-pointer flex items-center outline-none"
        >
          Docs
        </ButtonBase>
        <ButtonBase
          className="flex items-center px-9 hover:bg-white cursor-pointer outline-none"
          onClick={() =>
            store.dispatch({ type: "SET_USER", payload: { username: "", token: "", email: "" } })
          }
        >
          Logout
        </ButtonBase>
      </div>
    </>
  );
};

export default TopBar;
