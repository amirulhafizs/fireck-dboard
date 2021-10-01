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
    <div className="sm:px-42px sm:pt-42px px-7 pt-7">
      {toDos.map((x) => (
        <div
          key={x.title}
          className="rounded-md bg-blue-300 text-white flex items-center justify-between p-3 mb-2"
        >
          <div className="flex items-center">
            <Error className="mr-3"></Error>
            <div>{x.title}</div>
          </div>

          <Button
            onClick={x.onClick}
            noMinWidth
            className="bg-orange-300 hover:bg-orange-301 text-black"
          >
            {loading === x.id ? <Loader size="tiny"></Loader> : x.btnTitle}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ToDos;
