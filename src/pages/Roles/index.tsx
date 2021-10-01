import Button from "components/Button";
import React from "react";
import AddRounded from "@material-ui/icons/AddRounded";
import Select from "components/Select";
import RoleEditor from "./RoleEditor";
import RoleModal from "./RoleModal";
import { getCollection, updateDocument, addDocument, deleteDocument } from "api/collections";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useNotify } from "components/NotificationsProvider";
import PageTitle from "components/PageTitle";
import { RoleDocument } from "api/roles";
import { confirm } from "components/Confirm";

export interface RolesProps {}

const Roles: React.FC<RolesProps> = () => {
  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [roles, setRoles] = React.useState<RoleDocument[]>([]);
  const [selectedRole, setSelectedRole] = React.useState(0);
  const [editRole, setEditRole] = React.useState<RoleDocument>();
  const collectionTypes = useSelector((state: RootState) => state.collectionTypes);
  const notify = useNotify();
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      try {
        if (dispatch) {
          dispatch({ type: "SET_LOADING", payload: true });
          const res = await getCollection({ collectionId: "RolesReservedCollection" });
          if (!("error" in res)) {
            setRoles(res);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    })();
  }, [dispatch]);

  React.useEffect(() => {
    if (editRole) {
      setRoleModalOpen(true);
    }
  }, [editRole]);

  const onClose = () => {
    setRoleModalOpen(false);
    setEditRole(undefined);
  };

  const onUpdate = async (newRole: RoleDocument) => {
    const res = await updateDocument("RolesReservedCollection", newRole.docId, newRole);
    if (!("error" in res)) {
      setRoles((prev) => {
        let arr = [...prev];
        arr[selectedRole] = newRole;
        return arr;
      });
      notify("Role updated!", { variant: "success" });
    } else {
      notify(res.error, { variant: "error" });
    }
    onClose();
  };

  const onCreate = async (newRole: RoleDocument) => {
    const res = await addDocument("RolesReservedCollection", newRole);
    if (!("error" in res)) {
      setRoles((prev) => [{ ...newRole, docId: res.docId }, ...prev]);
      notify("Role created!", { variant: "success" });
    } else {
      notify(res.error, { variant: "error" });
    }
    onClose();
  };

  const onDelete = async (docId: string) => {
    if (
      await confirm({
        confirmation: "Do you really want to delete this role",
      })
    ) {
      let res = await deleteDocument("RolesReservedCollection", docId);
      if (!res.error) {
        setRoles((prev) => {
          let arr = [...prev];
          const ind = arr.findIndex((x) => x.docId === docId);
          if (ind === -1) return prev;
          arr.splice(ind, 1);
          return arr;
        });
        notify("Role deleted!", { variant: "success" });
      } else {
        notify("Role was not deleted", { variant: "error" });
      }
      onClose();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-6">
        <PageTitle className="mb-4 mr-4">Roles</PageTitle>
        <Button
          onClick={() => setRoleModalOpen(true)}
          className="bg-orange-300 hover:bg-orange-301 mb-4"
        >
          <div className="flex items-center">
            <AddRounded className="mr-3 text-lg" fontSize="inherit"></AddRounded>
            <span>Create role</span>
          </div>
        </Button>
        <RoleModal
          onCreate={onCreate}
          onDelete={onDelete}
          editRole={editRole}
          open={roleModalOpen}
          onSave={onUpdate}
          onClose={() => {
            setRoleModalOpen(false);
            setEditRole(undefined);
          }}
        ></RoleModal>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="max-w-192px mb-3 mr-4 block lg:hidden w-full">
          <Select
            onChange={(e) => setSelectedRole(parseInt(e.target.value))}
            value={selectedRole}
            options={roles.map((x, i) => ({ label: x.name, value: i }))}
          ></Select>
        </div>

        <div className="max-w-192px w-full flex-shrink-0 mr-4 hidden lg:block">
          {roles.map((x, i) => (
            <div
              onClick={() => setSelectedRole(i)}
              key={`collection-${i}`}
              className={`mb-1 capitalize truncate cursor-pointer ${
                selectedRole === i ? "bg-orange-300" : "hover:bg-gray-300"
              } rounded h-34px leading-34px px-3`}
            >
              {x.name}
            </div>
          ))}
        </div>
        {selectedRole < roles.length ? (
          <div className="lg:flex-grow w-full lg:w-0">
            <RoleEditor
              setEditRole={(r) => setEditRole(r)}
              role={roles[selectedRole]}
              collections={collectionTypes}
              onSave={onUpdate}
            ></RoleEditor>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Roles;
