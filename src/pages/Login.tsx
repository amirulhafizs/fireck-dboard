import Input from "components/GrayInput";
import Logo from "assets/logo.svg";
import Button from "components/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "api/adminUsers";
import store, { RootState } from "store";
import { useNotify } from "components/NotificationsProvider";
import { useSelector } from "react-redux";

export interface LoginProps {
  firebase: any;
}

const Login: React.FC<LoginProps> = ({ firebase }) => {
  const notify = useNotify();
  const logo = useSelector((state: RootState) => state.appearance.logo);

  const { values, errors, submitCount, handleSubmit, handleChange } = useFormik({
    onSubmit: async (vals) => {
      const res = await login(vals, firebase);
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
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto p-sm-12 p-7 bg-blue-400">
      <img alt="" src={logo || Logo} width={135} className="absolute left-6 top-6"></img>
      <div className="m-auto max-w-430px w-full md:py-10 py-16">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-12 text-sm">
          <div className="text-center mb-7">
            <div className="mb-2 text-2xl font-medium">Login</div>
          </div>
          <div className="mb-7">
            <div className="mb-2">Email</div>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              error={submitCount > 0 && errors.email ? errors.email : false}
            ></Input>
          </div>
          <div className="mb-9">
            <div className="mb-2">Password</div>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={submitCount > 0 && errors.password ? errors.password : false}
            ></Input>
          </div>
          <Button type="submit" className="bg-orange-300 hover:bg-orange-301 w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
