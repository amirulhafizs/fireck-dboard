import KeyboardArrowLeftRounded from "@material-ui/icons/KeyboardArrowLeftRounded";
import { useHistory, matchPath } from "react-router-dom";
import store from "store";
import ButtonBase from "@material-ui/core/ButtonBase";

const TopBar = () => {
  const history = useHistory();

  const match = matchPath<{ id: string }>(window.location.pathname, {
    path: ["/:id", "/collections/:id", "/collections/:id/Add", "/collections/:id/edit/:docId"],
    exact: true,
    strict: false,
  });

  return (
    <>
      <div className="h-34px block md:hidden"></div>
      <div className="h-34px flex bg-fireck-3 text-white text-sm">
        <div className="flex-grow flex items-center">
          <ButtonBase
            onClick={() => history.goBack()}
            className="h-full px-2 hover:bg-fireck-1 inline-flex items-center cursor-pointer outline-none"
          >
            <KeyboardArrowLeftRounded
              fontSize="inherit"
              className="text-2xl"
            ></KeyboardArrowLeftRounded>
          </ButtonBase>
          <span className="capitalize pl-3 ">{match?.params.id}</span>
        </div>
        <ButtonBase
          onClick={() => window.open("https://fireck-docs.netlify.app", "_blank")}
          className="px-9 hover:bg-fireck-1 cursor-pointer flex items-center outline-none"
        >
          Docs
        </ButtonBase>
        <ButtonBase
          className="flex items-center px-9 hover:bg-fireck-1 cursor-pointer outline-none"
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
