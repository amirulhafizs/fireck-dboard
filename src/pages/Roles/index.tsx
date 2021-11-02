import SettingsPage from "components/SettingsPage";
import Button from "components/Button";
import React from "react";
import RoleEditor from "./RoleEditor";
import RoleModal from "./RoleModal";
import { getCollection, updateDocument, addDocument, deleteDocument } from "api/collections";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useNotify } from "components/NotificationsProvider";
import { RoleDocument } from "api/roles";
import { confirm } from "components/Confirm";
import classNames from "classnames";

interface RolesProps {}

const Roles: React.FC<RolesProps> = () => {
  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [roles, setRoles] = React.useState<RoleDocument[]>([]);
  const [selectedRole, setSelectedRole] = React.useState("");
  const [editRole, setEditRole] = React.useState<RoleDocument>();
  const collectionTypes = useSelector((state: RootState) => [
    ...state.collectionTypes.filter((x) => x.isSystem),
    ...state.collectionTypes.filter((x) => !x.isSystem),
  ]);
  const notify = useNotify();
  const dispatch = useDispatch();

  const [roleCopy, setRoleCopy] = React.useState<RoleDocument>();
  const [isSaving, setIsSaving] = React.useState(false);
  const role = roles.find((x) => x.docId === selectedRole);

  const hasBeenChanged = !(JSON.stringify(role) === JSON.stringify(roleCopy));

  React.useEffect(() => {
    if (role) {
      setRoleCopy(JSON.parse(JSON.stringify(role)));
    }
  }, [role]);

  React.useEffect(() => {
    (async () => {
      try {
        if (dispatch) {
          dispatch({ type: "SET_LOADING", payload: true });
          const res = await getCollection({ collectionId: "RolesReservedCollection" });
          if (!("error" in res)) {
            setRoles(res);
            if (res.length) {
              setSelectedRole(res[0].docId);
            }
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
        let index = arr.findIndex((x) => x.docId === selectedRole);
        if (index === -1) return arr;
        arr[index] = newRole;
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

  console.log("role updated");

  return (
    <>
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
      <SettingsPage
        selectedEntityId={selectedRole}
        entity="role"
        enitityPlural="roles"
        onAddEntity={() => setRoleModalOpen(true)}
        entities={roles}
        entityButtons={
          <Button
            onClick={async () => {
              if (!roleCopy) return;
              setIsSaving(true);
              await onUpdate(roleCopy);
              setIsSaving(false);
            }}
            disabled={!hasBeenChanged || isSaving}
            className={classNames("mb-4 min-w-unset h-28px px-7", {
              "bg-white cursor-default text-gray-500": !hasBeenChanged && !isSaving,
              "bg-fireck-4 hover:bg-fireck-4-hover": !(!hasBeenChanged && !isSaving),
            })}
          >
            {isSaving ? "Saving..." : hasBeenChanged ? "Save" : "Saved!"}
          </Button>
        }
        onSelectEntity={(docId) => {
          setSelectedRole(docId);
        }}
        onInvokeEntityEdit={() => setEditRole(role)}
        entityContent={
          <RoleEditor
            collections={collectionTypes}
            roleCopy={roleCopy}
            setRoleCopy={setRoleCopy}
          ></RoleEditor>
        }
      ></SettingsPage>
    </>
  );
};

export default Roles;
