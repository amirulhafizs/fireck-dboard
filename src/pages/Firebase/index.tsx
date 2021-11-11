import { connect, ConnectedProps } from "react-redux";
import { RootState } from "store";
import Logo from "assets/logo.svg";
import React from "react";
import { AuthorizeNetlify } from "api/netlify";
import { ConnectionState } from "types";
import Dropzone from "components/Dropzone";
import { ReactComponent as FolderImage } from "assets/folder.svg";
import LinearProgress from "@material-ui/core/LinearProgress";
import { TasksManager } from "facades/TasksManager";

const FirebaseSettings: React.FC<PropsFromRedux> = ({ configState, configKeys }) => {
  const [serviceAccountFile, setServiceAccountFile] = React.useState<File>();

  const handleFiles = (files: File[]) => {
    if (!configKeys.netlifyAccessToken) {
      AuthorizeNetlify();
      return;
    }
    if (files.length) {
      var reader = new FileReader();
      reader.onload = async function () {
        const json = JSON.parse(reader.result as string);
        setServiceAccountFile(files[0]);
        TasksManager.connectAdminSdk(json);
      };
      reader.readAsText(files[0]);
    }
  };

  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto bg-fireck-1 p-12">
      <img alt="" src={Logo} className="absolute left-7 top-5"></img>
      <div className="m-auto py-16 max-w-922px w-full">
        <div className="w-full md:flex rounded overflow-hidden">
          {configState.adminSdkState === "not connected" ? (
            <div className="p-9 bg-white md:w-7/12 justify-between items-center">
              <div className="mb-10 text-center">
                <div className="flex font-medium text-22px justify-between leading-none">
                  <div>1/2</div>
                  <div>Connect admin sdk</div>
                </div>
              </div>
              <Dropzone
                onFiles={handleFiles}
                onClick={!configKeys.netlifyAccessToken ? () => AuthorizeNetlify() : () => {}}
                disabled={!configKeys.netlifyAccessToken}
              ></Dropzone>
            </div>
          ) : configState.adminSdkState === "building" ? (
            <div className="p-9 bg-white max-w-544px justify-between items-center">
              <div className="mb-10 text-center">
                <div className="font-medium text-28px mb-3">App is building...</div>
                <div className="text-gray-600 text-sm">
                  It usually takes up to 2 minutes. Once the building is finished, the app will
                  automatically be reloaded
                </div>
              </div>
              <div className="flex items-center justify-center mb-9">
                <FolderImage className="mr-4"></FolderImage>
                <div>{serviceAccountFile ? serviceAccountFile.name : ""}</div>
              </div>
              <LinearProgress
                classes={{
                  colorPrimary: "bg-gray-400",
                  barColorPrimary: "bg-fireck-3",
                }}
                color="primary"
              ></LinearProgress>
            </div>
          ) : null}
          <div className="md:w-5/12 bg-fireck-4 flex p-9 flex-wrap">
            <div className="m-auto">
              <div className="mb-7 flex flex-wrap">
                {"How to get a service account private keys file?".split(" ").map((x, i) => (
                  <div
                    className="bg-fireck-2 text-white font-medium px-1 py-0.5"
                    key={`text-part-${i}`}
                  >
                    {x}
                  </div>
                ))}
              </div>
              <div className="w-full pt-60% rounded relative">
                <iframe
                  className="absolute left-0 top-0 right-0 bottom-0 w-full h-full"
                  src="https://www.youtube.com/embed/x_vhtPSV7s8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state: RootState, ownProps: { [index: string]: any }) => {
  return {
    configState: state.configState,
    configKeys: state.configKeys,
    ...ownProps,
  };
};

const mapDispatch = () => {
  return {
    setConnections: (update: { [index: string]: { state: ConnectionState } }) => ({
      type: "SET_FIREBASE_CONNECTION",
      payload: update,
    }),
  };
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FirebaseSettings);
