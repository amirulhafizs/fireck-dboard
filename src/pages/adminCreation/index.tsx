import Input from "components/Input";
import Button from "components/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { createSuperAdmin } from "api/adminUsers";
import store from "store";
import { useNotify } from "components/NotificationsProvider";
import CloseRounded from "@material-ui/icons/CloseRounded";

export interface AdminCreationProps {
  setIsAdminSet: (a: boolean) => void;
  onClose: () => void;
}

const AdminCreation: React.FC<AdminCreationProps> = ({ setIsAdminSet, onClose }) => {
  const notify = useNotify();

  const { values, errors, submitCount, isSubmitting, handleSubmit, handleChange } = useFormik({
    onSubmit: async (vals) => {
      const res = await createSuperAdmin(vals);
      if (!res.error) {
        store.dispatch({ type: "SET_USER", payload: res });
        store.dispatch({ type: "SET_FIREBASE_USER_TOKEN", payload: res.firebaseToken });
        setIsAdminSet(true);
        notify("Admin successfully created!", { variant: "success" });
      } else {
        notify(
          typeof res.error === "string"
            ? res.error
            : (res.error.details || "Erorr occured").toString(),
          {
            variant: "error",
          }
        );
      }
      onClose();
    },
    initialValues: {
      password: "",
      confirmationPassword: "",
      email: "",
      subscribeEmails: false,
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .test("validate-password", "1 upper case, 1 number, at least 8 symbols length", (val) => {
          return val ? /[A-Z]/.test(val) && /[0-9]/.test(val) && val.length >= 8 : false;
        }),
      confirmationPassword: yup
        .mixed()
        .test("must-match", "Passwords do not match", function (val) {
          return this.parent.password === val;
        }),
      email: yup.string().email().required(),
    }),
  });

  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto p-7" onMouseDown={onClose}>
      <div
        className="m-auto w-full"
        style={{ maxWidth: 360 }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-9 text-sm relative">
          <CloseRounded
            className="absolute top-0 right-0 cursor-pointer"
            onClick={onClose}
          ></CloseRounded>
          <div className="text-center mb-7">
            <div className="mb-2 text-2xl font-medium">Create admin</div>
            <div className="text-gray-600 text-sm max-w-xs mx-auto">
              Fill the form below to create your admin account and secure you app.
            </div>
          </div>
          <div className="mb-7">
            <div className="mb-2">Email</div>
            <Input
              groundColor="white"
              className="h-34px"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={submitCount > 0 && errors.email ? errors.email : false}
            ></Input>
          </div>
          <div className="mb-7">
            <div className="mb-2">Password</div>
            <Input
              groundColor="white"
              className="h-34px"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={submitCount > 0 && errors.password ? errors.password : false}
            ></Input>
          </div>
          <div className="mb-9">
            <div className="mb-2">Confirmation Password</div>
            <Input
              groundColor="white"
              className="h-34px"
              type="password"
              name="confirmationPassword"
              value={values.confirmationPassword}
              onChange={handleChange}
              error={
                submitCount > 0 && errors.confirmationPassword ? errors.confirmationPassword : false
              }
            ></Input>
          </div>

          <div className="flex text-sm mb-9 items-center">
            <input
              checked={values.subscribeEmails}
              name="subscribeEmails"
              onChange={handleChange}
              type="checkbox"
              className="my-0.5 mr-4"
            ></input>
            Subscribe the newsletter
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-fireck-4 hover:bg-fireck-4-hover h-34px w-full"
          >
            {isSubmitting ? "Loading..." : "Let's get started"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreation;
