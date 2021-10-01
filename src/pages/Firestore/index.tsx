import Logo from "assets/logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Button from "components/Button";
import { confirm } from "components/Confirm";

export interface AdminCreationProps {
  setFirestoreWorks: (a: boolean) => void;
  setAuthWorks: (a: boolean) => void;
}

const AdminCreation: React.FC<AdminCreationProps> = ({ setFirestoreWorks, setAuthWorks }) => {
  const projectId = useSelector((state: RootState) => state.projectId);

  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto p-sm-12 p-7 bg-blue-400">
      <img alt="" src={Logo} width={135} className="absolute left-8 top-8"></img>
      <div className="m-auto max-w-922px w-full md:py-10 py-16">
        <div className="w-full md:flex ">
          <div className="p-12 bg-white md:w-7/12 justify-between items-center flex flex-col">
            <div className="mb-7 text-center w-full">
              <div className="flex font-medium text-22px justify-between">
                <div>2/2</div>
                <div className="text-right max-w-247px">Enable Firestore and Authentication</div>
              </div>
            </div>
            <div className="text-gray-600 mb-7 flex-grow text-center">
              Go to{" "}
              <a
                className="text-blue-400 hover:underline"
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
                className="bg-orange-300 hover:bg-orange-301"
                onClick={async () => {
                  const res = await confirm({
                    confirmation: "Are you sure you have enabled firestore and authentication?",
                  });

                  if (res) {
                    setFirestoreWorks(true);
                    setAuthWorks(true);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="md:w-5/12 bg-orange-300 flex p-12 flex-wrap">
            <div className="m-auto">
              <div className="mb-7 flex flex-wrap">
                {"How to enable the Firestore and Authentication".split(" ").map((x, i) => (
                  <div className="bg-blue-300 text-white px-1 py-0.5">{x}</div>
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

export default AdminCreation;
