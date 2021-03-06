import Menu from "components/Menu";
import TopBar from "components/TopBar";
import "simplebar/dist/simplebar.min.css";
import { useState, useRef, Suspense, useEffect } from "react";
import { RootState } from "store";
import { connect, ConnectedProps, useSelector } from "react-redux";
import PagesRoot from "pages";
import FirebaseSettings from "pages/Firebase";
import AdminCreation from "pages/AdminCreation";
import Login from "pages/Login";
import Loader from "components/Loader";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import ButtonBase from "@mui/material/ButtonBase";
import { InView } from "react-intersection-observer";
import FirestoreSettings from "pages/Firestore";
import Modal from "@mui/material/Modal";
import ToDos from "pages/Firestore/ToDos";
import UpdateAppWidget from "components/UpdateAppWidget";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "assets/logo.svg";
import { TasksManager } from "facades/TasksManager";

const PageLoader = ({ loading }: { loading: boolean | string }) => {
  return (
    <div className="flex w-full h-full bg-fireck-1 text-white">
      <div className="m-auto">
        <div className="flex justify-center mb-2">
          <Loader></Loader>
        </div>
        {typeof loading === "string" ? <div>{loading}</div> : null}
      </div>
    </div>
  );
};

const App = (props: PropsFromRedux) => {
  const pageTopRef = useRef<any>(null);
  const [isTopVisible, setIsTopVisible] = useState(true);
  const [menuOpened, setMenuOpened] = useState(false);
  const [openAdminCreation, setOpenAdminCreation] = useState(false);

  useEffect(() => {
    TasksManager.initTasks();
  }, []);

  const { adminSdkState, checkCompleted, isAppCreated, isAdminSet, firestoreWorks, authWorks } =
    useSelector((state: RootState) => state.configState);

  return (
    <div>
      {checkCompleted ? (
        adminSdkState !== "connected" ? (
          <FirebaseSettings adminSdkState={adminSdkState}></FirebaseSettings>
        ) : !firestoreWorks || !authWorks ? (
          <FirestoreSettings></FirestoreSettings>
        ) : isAdminSet && !props.user.token ? (
          <Login></Login>
        ) : (
          <div className="fixed left-0 top-0 w-full h-full flex flex-col">
            <UpdateAppWidget></UpdateAppWidget>
            <ToDos
              isAdminSet={isAdminSet}
              isAppCreated={isAppCreated}
              onCreateAdmin={() => setOpenAdminCreation(true)}
              onCreateApp={() => TasksManager.updateState("isAppCreated", true)}
            ></ToDos>
            <div className="w-full bg-fireck-2 h-34px flex md:hidden justify-between items-center text-white px-5">
              <div>
                <img alt="" src={Logo} width={85}></img>
              </div>
              <MenuIcon className="cursor-pointer" onClick={() => setMenuOpened(true)}></MenuIcon>
            </div>
            <div className="h-0 flex-grow w-full flex">
              <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened}></Menu>
              <div className="flex flex-col flex-grow w-0">
                <TopBar></TopBar>

                <div className="flex-grow h-0 p-7 overflow-auto relative bg-fireck-1">
                  <div className="absolute top-0" ref={pageTopRef}>
                    <InView onChange={(inView) => setIsTopVisible(inView)}>
                      <div></div>
                    </InView>
                  </div>
                  {!isTopVisible ? (
                    <ButtonBase
                      className="z-30 fixed shadow-2xl outline-none right-6 bottom-3 w-34px h-34px rounded flex cursor-pointer text-black bg-orange-300 hover:bg-orange-301 items-center justify-center"
                      onClick={() => pageTopRef.current.scrollIntoView({ behavior: "smooth" })}
                    >
                      <ExpandLessRounded></ExpandLessRounded>
                    </ButtonBase>
                  ) : null}

                  {props.loading ? (
                    <div className="absolute left-0 top-0 z-20 w-full h-full bg-white">
                      <PageLoader loading={props.loading}></PageLoader>{" "}
                    </div>
                  ) : null}
                  <Suspense fallback={<PageLoader loading={props.loading}></PageLoader>}>
                    <PagesRoot></PagesRoot>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className={`fixed left-0 top-0 w-full h-full ${checkCompleted ? "hidden" : ""}`}>
          <PageLoader loading={true}></PageLoader>
        </div>
      )}
      <Modal open={openAdminCreation} onClose={() => setOpenAdminCreation(false)}>
        <AdminCreation onClose={() => setOpenAdminCreation(false)}></AdminCreation>
      </Modal>
    </div>
  );
};

const connector = connect((state: RootState) => {
  return {
    user: state.user,
    loading: state.loading,
  };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
