import Logo from "assets/logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Button from "components/Button";
import { confirm } from "components/Confirm";
import { TasksManager } from "facades/TasksManager";

export interface FirestorePageProps {}

const FirestorePage: React.FC<FirestorePageProps> = () => {
  const projectId = useSelector((state: RootState) => state.configState.projectId);

  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto p-sm-12 p-7 bg-fireck-1">
      <img alt="" src={Logo} className="absolute left-7 top-5"></img>
      <div className="m-auto max-w-922px w-full md:py-10 py-16">
        <div className="w-full md:flex rounded overflow-hidden">
          <div className="p-9 bg-white md:w-7/12 justify-between items-center flex flex-col">
            <div className="mb-7 text-center w-full">
              <div className="flex font-medium text-22px justify-between">
                <div>2/2</div>
                <div className="text-right max-w-247px">Enable Firestore and Authentication</div>
              </div>
            </div>
            <div className="text-gray-600 mb-7 flex-grow text-center">
              Go to{" "}
              <a
                className="text-fireck-5 hover:underline"
                target="_blank"
                rel="noreferrer"
                href={`https://console.firebase.google.com/project/${projectId}/firestore`}
              >
                firebase console
              </a>
              , then start your Firestore instance and Authentication service. Give a few minutes
              for the changes to propogate.
            </div>
            <div className="flex justify-end w-full">
              <Button
                className="bg-fireck-4 hover:bg-fireck-4-hover h-34px"
                onClick={async () => {
                  const res = await confirm({
                    confirmation: "Step completed?",
                  });

                  if (res) {
                    TasksManager.updateState("firestoreWorks", true);
                    TasksManager.updateState("authWorks", true);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="md:w-5/12 bg-fireck-4 flex p-9 flex-wrap">
            <div className="m-auto">
              <div className="mb-7 flex flex-wrap">
                {"How to enable the Firestore and Authentication?".split(" ").map((x, i) => (
                  <div className="bg-fireck-3 text-white font-medium px-1 py-0.5">{x}</div>
                ))}
              </div>
              <div className="w-full pt-60% rounded relative">
                <iframe
                  className="absolute left-0 top-0 right-0 bottom-0 w-full h-full"
                  src="https://www.youtube.com/embed/cd5vi0qylmE"
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

export default FirestorePage;
