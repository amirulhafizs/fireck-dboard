import Input from "components/Input";
import Logo from "assets/logo.svg";
import Button from "components/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "api/adminUsers";
import store, { RootState } from "store";
import { useNotify } from "components/NotificationsProvider";
import { useSelector } from "react-redux";

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const notify = useNotify();
  const logo = useSelector(
    (state: RootState) => state.appearance.items.find((x) => x.id === "logo")?.value
  );

  const { values, errors, submitCount, handleSubmit, handleChange } = useFormik({
    onSubmit: async (vals) => {
      const res = await login(vals);
      if (!res.error) {
        store.dispatch({ type: "SET_USER", payload: res });
        store.dispatch({ type: "SET_FIREBASE_USER_TOKEN", payload: res.firebaseToken });
      } else {
        notify(res.error, { variant: "error" });
      }
    },
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      password: yup.string().required(),
      email: yup.string().email().required(),
    }),
  });
  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto p-sm-12 p-7 bg-fireck-1">
      <img alt="" src={logo || Logo} className="absolute left-6 top-6"></img>
      <div style={{ maxWidth: 380 }} className="m-auto w-full md:py-10 py-16">
        <form onSubmit={handleSubmit} className="border-2 border-white rounded-lg p-9 text-sm">
          <div className="text-center mb-7">
            <div className="mb-2 text-27px font-medium text-white">Login</div>
          </div>
          <div className="mb-7">
            <div className="mb-2 text-white">Email</div>
            <Input
              className="h-34px"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={submitCount > 0 && errors.email ? errors.email : false}
            ></Input>
          </div>
          <div className="mb-9">
            <div className="mb-2 text-white">Password</div>
            <Input
              className="h-34px"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={submitCount > 0 && errors.password ? errors.password : false}
            ></Input>
          </div>
          <Button type="submit" className="bg-fireck-4 hover:bg-fireck-4-hover w-full h-34px">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
