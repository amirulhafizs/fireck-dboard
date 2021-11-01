import { useLocation, useHistory } from "react-router-dom";
import Menu from "components/Menu";
import TopBar from "components/TopBar";
import "simplebar/dist/simplebar.min.css";
import { useState, useRef, Suspense, useEffect } from "react";
import store, { RootState } from "store";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import PagesRoot from "pages";
import FirebaseSettings from "pages/Firebase";
import AdminCreation from "pages/adminCreation";
import Login from "pages/Login";
import Loader from "components/Loader";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import { InView } from "react-intersection-observer";
import { handleAccessToken } from "api/netlify";
import useConfiguration from "hooks/useConfiguration";
import FirestoreSettings from "pages/Firestore";
import useFirebase from "hooks/useFirebase";
import Modal from "@material-ui/core/Modal";
import ToDos from "pages/Firestore/ToDos";
import { CollectionType, findCollectionTypes } from "api/collectionTypes";
import { SystemCollectionIds } from "store";
import UpdateAppWidget from "components/UpdateAppWidget";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "assets/logo.svg";

const PageLoader = ({ loading }: { loading: boolean | string }) => {
  return (
    <div className="flex w-full h-full bg-fireck-1">
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
  const location = useLocation();
  const history = useHistory();
  const [menuOpened, setMenuOpened] = useState(false);

  const [openAdminCreation, setOpenAdminCreation] = useState(false);
  const dispatch = useDispatch();

  if (location.hash.includes("access_token=")) {
    handleAccessToken(location.hash, (token: string) => {
      store.dispatch({ type: "SET_NETLIFY_ACCESS_TOKEN", payload: token });
      localStorage.setItem("netlify-access-token-for-fireck", token);
      history.push("/");
    });
  }

  useEffect(() => {
    (async () => {
      try {
        if (props.user.token) {
          let res = await findCollectionTypes(props.user.token);

          if (!res.error) {
            dispatch({
              type: "SET_COLLECTION_TYPES",
              payload: res.filter((x: CollectionType) => !SystemCollectionIds.includes(x.id)),
            });

            dispatch({
              type: "SET_SYSTEM_COLLECTION_TYPES",
              payload: res.filter((x: CollectionType) => SystemCollectionIds.includes(x.id)),
            });
          }
        }
      } catch (er) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.user]);

  const firebase = useFirebase();

  const {
    adminSdkState,
    checkCompleted,
    isAppCreated,
    setIsAppCreated,
    isAdminSet,
    setIsAdminSet,
    firestoreWorks,
    authWorks,
    setFirestoreWorks,
    setAuthWorks,
  } = useConfiguration();

  return (
    <div>
      {checkCompleted ? (
        !(adminSdkState === "connected") ? (
          <FirebaseSettings adminSdkState={adminSdkState}></FirebaseSettings>
        ) : !firestoreWorks || !authWorks ? (
          <FirestoreSettings
            setFirestoreWorks={setFirestoreWorks}
            setAuthWorks={setAuthWorks}
          ></FirestoreSettings>
        ) : isAdminSet && !props.user.token ? (
          <Login firebase={firebase}></Login>
        ) : (
          <div className="fixed left-0 top-0 w-full h-full flex flex-col">
            <UpdateAppWidget></UpdateAppWidget>
            <ToDos
              isAdminSet={isAdminSet}
              isAppCreated={isAppCreated}
              onCreateAdmin={() => setOpenAdminCreation(true)}
              onCreateApp={() => setIsAppCreated(true)}
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
        <AdminCreation
          setIsAdminSet={setIsAdminSet}
          onClose={() => setOpenAdminCreation(false)}
        ></AdminCreation>
      </Modal>
    </div>
  );
};

const connector = connect((state: RootState) => {
  return {
    user: state.user,
    projectId: state.projectId,
    firebaseAppApiKey: state.firebaseAppApiKey,
    loading: state.loading,
  };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
