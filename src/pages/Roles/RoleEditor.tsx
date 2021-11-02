import React, { Dispatch, SetStateAction } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { permissions, RoleDocument, CollectionPermission } from "api/roles";
import { CollectionType } from "api/collectionTypes";
import SimpleBar from "simplebar-react";
import Star from "@material-ui/icons/Star";

export interface RoleEditorProps {
  roleCopy: RoleDocument | undefined;
  setRoleCopy: Dispatch<SetStateAction<RoleDocument | undefined>>;
  collections: CollectionType[];
}

const RoleEditor: React.FC<RoleEditorProps> = ({ roleCopy, collections, setRoleCopy }) => {
  const sorter = (a: string, b: string) => (a > b ? 1 : a < b ? -1 : 0);
  //sorter sorts permissions in arrays in order the comparison to work

  const selectColumn = (checked: boolean, permission: CollectionPermission) => {
    if (!roleCopy) return;
    let perms = { ...roleCopy.permissions };
    let existingKeys = Object.keys(perms);
    collections.forEach((c) => {
      if (checked) {
        if (!existingKeys.includes(c.docId)) {
          perms[c.docId] = [permission];
        } else {
          if (!perms[c.docId].includes(permission)) {
            perms[c.docId].push(permission);
            perms[c.docId].sort(sorter);
          }
        }
      } else {
        if (existingKeys.includes(c.docId) && perms[c.docId].includes(permission)) {
          perms[c.docId] = perms[c.docId].filter((cp) => cp !== permission);
        }
      }
    });
    setRoleCopy((prev) => (!prev ? prev : { ...prev, permissions: perms }));
  };

  const selectRow = (checked: boolean, colDocId: string) => {
    if (!roleCopy) return;
    let perms = { ...roleCopy.permissions };
    perms[colDocId] = checked ? permissions : [];
    setRoleCopy((prev) => (!prev ? prev : { ...prev, permissions: perms }));
  };

  const selectAll = (checked: boolean) => {
    if (!roleCopy) return;
    let perms = { ...roleCopy.permissions };
    if (checked) {
      collections.forEach((c) => {
        perms[c.docId] = permissions;
        perms[c.docId].sort(sorter);
      });
    } else {
      perms = {};
    }
    setRoleCopy((prev) => (!prev ? prev : { ...prev, permissions: perms }));
  };

  return roleCopy ? (
    <div className="h-full bg-white rounded overflow-hidden">
      <SimpleBar className="pb-2 scrollbar-light h-full">
        <table className="w-full min-w-544px">
          <thead>
            <tr>
              <th className="text-center bg-gray-E1E1E1 sticky top-0 z-10"></th>
              <th className="text-center font-semibold bg-gray-E1E1E1 sticky top-0 z-10">
                <div className="opacity-0">All</div>
                <Checkbox
                  size="small"
                  classes={{ checked: "text-fireck-1", root: "p-0" }}
                  checked={
                    !collections.find(
                      (c) =>
                        !roleCopy.permissions[c.docId] ||
                        roleCopy.permissions[c.docId].length < permissions.length
                    )
                  }
                  onChange={(e) => selectAll(e.target.checked)}
                ></Checkbox>
              </th>
              {permissions.map((p, i) => (
                <th className="font-semibold sticky top-0 bg-gray-E1E1E1 z-10" key={p}>
                  <div>{p}</div>
                  <Checkbox
                    size="small"
                    classes={{ checked: "text-fireck-1", root: "p-0" }}
                    checked={!collections.find((c) => !roleCopy.permissions[c.docId]?.includes(p))}
                    onChange={(e) => selectColumn(e.target.checked, p)}
                  ></Checkbox>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collections.map((c, i) => (
              <tr key={c.docId} className="hover:bg-fireck-4">
                <td>
                  <div className=" max-w-160px truncate pl-2 capitalize flex items-center">
                    {!c.isSystem ? null : <Star fontSize="inherit" className="text-sm mr-1"></Star>}
                    {c.name}
                  </div>
                </td>
                <td className="text-center">
                  <Checkbox
                    size="small"
                    classes={{ checked: "text-fireck-1", root: "p-0" }}
                    checked={
                      roleCopy.permissions[c.docId]
                        ? roleCopy.permissions[c.docId].length === permissions.length
                        : false
                    }
                    onChange={(e) => selectRow(e.target.checked, c.docId)}
                  ></Checkbox>
                </td>
                {permissions.map((p, pi) => (
                  <td key={p + c.docId} className="text-center">
                    <Checkbox
                      size="small"
                      classes={{ checked: "text-fireck-1", root: "p-0" }}
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
                              perms[c.docId].sort(sorter);
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
