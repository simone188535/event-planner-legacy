import { type FC } from "react";
import AuthForm from "../Auth";

const LoginForm: FC = () => {
  return (
    <>
    <AuthForm
        header={{
          primaryTxt: "Welcome back",
          secondaryTxt: "Sign in to access your event planner",
        }}
        inputFields={[
          {
            label: "Email",
            name: "email",
            fullWidth: true,
            placeholder: "you@example.com",
            type: "email",
            InputProps: {
              sx: {
                borderRadius: 2,
                bgcolor: "#fbfbfe",
              },
            },
          },
          {
            label: "Password",
            name: "password",
            fullWidth: true,
            placeholder: "••••••••",
            type: "password",
            InputProps: {
              sx: {
                borderRadius: 2,
                bgcolor: "#fbfbfe",
              },
            },
          },
        ]}
        footer={{
          submitBtnTxt: "Log in",
          link: {
            detailTxt: "Don't have an account?",
            linkTxt: "Sign up",
            linkHref: "/signup",
          },
        }}
      />
    </>
  );
};

export default LoginForm;
