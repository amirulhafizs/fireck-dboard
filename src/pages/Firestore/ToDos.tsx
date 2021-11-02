import { createApp } from "api/adminUsers";
import store from "store";
import { useNotify } from "components/NotificationsProvider";
import Button from "components/Button";
import Error from "@material-ui/icons/Error";
import Loader from "components/Loader";
import { useState } from "react";

export interface ToDosProps {
  isAdminSet: boolean;
  isAppCreated: boolean;
  onCreateAdmin: () => void;
  onCreateApp: () => void;
}

const ToDos: React.FC<ToDosProps> = ({ isAdminSet, isAppCreated, onCreateAdmin, onCreateApp }) => {
  const notify = useNotify();
  const [loading, setLoading] = useState<string | boolean>(false);

  const toDos = [];
  if (!isAdminSet) {
    toDos.push({
      id: "admin",
      title: "Admin user is not created",
      btnTitle: "Create",
      onClick: onCreateAdmin,
    });
  }

  if (!isAppCreated) {
    toDos.push({
      id: "app",
      title: "Firebase app is not created",
      btnTitle: "Create",
      onClick: async () => {
        setLoading("app");
        const res = await createApp();
        setLoading(false);
        if (res.error) {
          notify(res.error, { variant: "error" });
          return;
        }
        store.dispatch({ type: "SET_FIREBASE_APP_API_KEY", payload: res.apiKey });
        onCreateApp();
      },
    });
  }
  return !toDos.length ? null : (
    <div className="text-sm flex flex-wrap w-full bg-fireck-1">
      {toDos.map((x) => (
        <div key={x.title} className="flex items-center px-3 h-34px mr-4">
          <div className="flex items-center text-white mr-3">
            {/* <Error className="mr-3 text-lg"></Error> */}
            <div>{x.title}</div>
          </div>

          <Button
            onClick={x.onClick}
            className="bg-fireck-4 hover:bg-fireck-4-hover h-6 px-4 min-w-unset"
          >
            {loading === x.id ? <Loader size="tiny"></Loader> : x.btnTitle}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ToDos;
