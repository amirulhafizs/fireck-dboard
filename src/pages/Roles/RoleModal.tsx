import Modal from "@material-ui/core/Modal";
import Input from "components/Input";
import { RoleDocument, permissions } from "api/roles";
import React from "react";
import { useFormik } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/Button";
import CloseRounded from "@material-ui/icons/CloseRounded";

export interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  editRole: RoleDocument | undefined;
  onDelete: (docId: string) => void;
  onSave: (r: RoleDocument, notify?: boolean) => void;
  onCreate: (r: RoleDocument) => void;
}

const RoleModal: React.FC<RoleModalProps> = ({
  open,
  onClose,
  editRole,
  onDelete,
  onSave,
  onCreate,
}) => {
  const { values, errors, isSubmitting, submitCount, handleChange, setFieldValue, handleSubmit } =
    useFormik<RoleDocument>({
      onSubmit: async (vals) => {
        vals.docId ? await onSave(vals) : await onCreate(vals);
      },
      enableReinitialize: true,
      initialValues: editRole
        ? editRole
        : {
            name: "",
            defaultPermissions: [],
            permissions: {},
            docId: "",
          },
      validate: (vals) => {
        let errors: Partial<typeof vals> = {};
        if (vals.name.length === 0) {
          errors.name = "required";
        }
        return errors;
      },
    });

  return !open ? null : (
    <Modal open={open} hideBackdrop>
      <div className="w-full h-full flex overflow-auto bg-black bg-opacity-40 p-7">
        <div
          style={{ maxWidth: 570 }}
          className="m-auto rounded bg-white w-full p-7 animate-littlemoveup relative"
        >
          <CloseRounded
            className="absolute top-0 right-0 cursor-pointer"
            onClick={onClose}
          ></CloseRounded>
          <div className="mb-9 font-medium text-2xl">
            {values.docId ? "Edit role" : "Create role"}
          </div>
          <div className="mb-9">
            <div className="mb-2">Role name</div>
            <Input
              className="h-34px"
              groundColor="white"
              disabled={["public", "authenticated"].includes(values.name)}
              onChange={handleChange}
              name="name"
              value={values.name}
              error={errors.name && submitCount > 0 ? errors.name : false}
            ></Input>
          </div>
          <div className="mb-2">Default permissions</div>
          <div className="flex flex-wrap mb-9">
            {permissions.map((p, i) => (
              <div key={p} className="sm:w-1/3 w-1/2 flex">
                <FormControlLabel
                  classes={{ label: "font-poppins line-clamp-1" }}
                  control={
                    <Checkbox
                      classes={{ checked: "text-blue-300" }}
                      className="mr-3"
                      checked={values.defaultPermissions.includes(p)}
                      onChange={(e) => {
                        let perms = [...values.defaultPermissions];
                        if (e.target.checked) {
                          perms.push(p);
                        } else {
                          const index = perms.findIndex((perm) => perm === p);
                          perms.splice(index, 1);
                        }
                        setFieldValue("defaultPermissions", perms);
                      }}
                    ></Checkbox>
                  }
                  label={p}
                ></FormControlLabel>
              </div>
            ))}
          </div>
          {!editRole || ["public", "authenticated"].includes(editRole.name.toLowerCase()) ? null : (
            <Button
              onClick={() => onDelete(editRole.docId)}
              className="border-2 h-34px border-red-FF0000 text-red-FF0000 mb-10 hover:bg-red-FF0000 hover:text-white"
            >
              Delete role
            </Button>
          )}
          <div className="flex justify-between">
            <Button
              onClick={() => onClose()}
              className="bg-blue-300 hover:bg-blue-400 text-white h-34px"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              className="bg-fireck-4 hover:bg-fireck-4-hover h-34px"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoleModal;
