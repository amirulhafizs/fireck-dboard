import React from "react";
import Button from "components/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { permissions, RoleDocument } from "api/roles";
import Create from "@material-ui/icons/Create";
import { CollectionType } from "api/collectionTypes";
import SimpleBar from "simplebar-react";

export interface RoleEditorProps {
  role: RoleDocument;
  collections: CollectionType[];
  onSave: (r: RoleDocument) => void;
  setEditRole: (a: RoleDocument) => void;
}

const RoleEditor: React.FC<RoleEditorProps> = ({ role, collections, onSave, setEditRole }) => {
  const [roleCopy, setRoleCopy] = React.useState<RoleDocument>();
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (role) {
      setRoleCopy(JSON.parse(JSON.stringify(role)));
    }
  }, [role]);

  const hasBeenChanged = !(JSON.stringify(role) === JSON.stringify(roleCopy));

  return roleCopy ? (
    <div className="bg-gray-300 p-9 rounded">
      <div className="flex justify-between mb-3 flex-wrap">
        <div className="flex mr-3 mb-4 items-center">
          <div className="text-2xl font-medium capitalize">{roleCopy.name}</div>
          <Create
            onClick={() => {
              setEditRole(roleCopy);
            }}
            className="ml-3 text-lg cursor-pointer"
            fontSize="inherit"
          ></Create>
        </div>

        <Button
          onClick={async () => {
            setIsSaving(true);
            await onSave(roleCopy);
            setIsSaving(false);
          }}
          disabled={!hasBeenChanged || isSaving}
          className={`mb-4 ${
            !hasBeenChanged && !isSaving
              ? "bg-white cursor-default text-gray-500"
              : "bg-orange-300 hover:bg-orange-301"
          }`}
        >
          {isSaving ? "Saving..." : hasBeenChanged ? "Save" : "Saved!"}
        </Button>
      </div>
      <SimpleBar className="pb-4 scrollbar-dark">
        <table className="w-full min-w-544px">
          <thead>
            <tr>
              <th></th>
              {permissions.map((p, i) => (
                <th className="font-normal pb-2" key={p}>
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collections.map((c, i) => (
              <tr key={c.docId}>
                <td>
                  <div className=" max-w-135px truncate">{c.name}</div>
                </td>
                {permissions.map((p, pi) => (
                  <td key={p + c.docId} className="text-center">
                    <Checkbox
                      classes={{ checked: "text-blue-400" }}
                      checked={
                        roleCopy.permissions[c.docId]
                          ? roleCopy.permissions[c.docId].includes(p)
                          : false
                      }
                      onChange={(e) =>
                        setRoleCopy((prev) => {
                          if (prev == null) {
                            return prev;
                          }
                          const checked = e.target.checked;
                          let perms = { ...prev.permissions };
                          if (checked) {
                            if (c.docId in perms) {
                              perms[c.docId].push(p);
                              perms[c.docId].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
                            } else {
                              perms[c.docId] = [p];
                            }
                          } else {
                            if (c.docId in perms) {
                              let index = perms[c.docId].findIndex((perm) => perm === p);
                              perms[c.docId].splice(index, 1);
                              if (!perms[c.docId].length) {
                                delete perms[c.docId];
                              }
                            }
                          }

                          return { ...prev, permissions: perms };
                        })
                      }
                    ></Checkbox>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleBar>
    </div>
  ) : null;
};

export default RoleEditor;
