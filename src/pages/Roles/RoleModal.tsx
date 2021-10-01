import Modal from "@material-ui/core/Modal";
import GrayInput from "components/GrayInput";
import { RoleDocument, permissions } from "api/roles";
import React from "react";
import { useFormik } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/Button";

export interface RoleModalProps {
  open: boolean;
  onClose: Function;
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

  return (
    <Modal open={open} hideBackdrop>
      <div className="w-full h-full flex overflow-auto bg-black bg-opacity-40">
        <div className="m-auto rounded bg-white max-w-644px w-full p-9">
          <div className="mb-9 font-medium text-2xl">
            {values.docId ? "Edit role" : "Create role"}
          </div>
          <div className="mb-9">
            <div className="mb-2">Role name</div>
            <GrayInput
              disabled={["public", "authenticated"].includes(values.name)}
              onChange={handleChange}
              name="name"
              value={values.name}
              error={errors.name && submitCount > 0 ? errors.name : false}
            ></GrayInput>
          </div>
          <div className="mb-2">Default permissions</div>
          <div className="flex flex-wrap mb-9">
            {permissions.map((p, i) => (
              <div key={p} className="sm:w-1/3 w-1/2">
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
              className="border-2 border-red-500 text-red-500 mb-10 hover:bg-red-500 hover:text-white"
            >
              Delete role
            </Button>
          )}
          <div className="flex justify-between">
            <Button onClick={() => onClose()} className="bg-blue-300 hover:bg-blue-400 text-white">
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()} className="bg-orange-300 hover:bg-orange-301">
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoleModal;
