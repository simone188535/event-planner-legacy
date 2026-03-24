import { type FC } from "react";
import AuthForm from "../Auth";

const SignupForm: FC = () => {
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  return (
      <AuthForm
        header={{
          primaryTxt: "Create an account",
          secondaryTxt: "Sign up to start organizing your events",
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
          submitBtnTxt: "Sign up",
          link: {
            detailTxt: "Already have an account?",
            linkTxt: "Log in",
            linkHref: "/login",
          },
        }}
      />
  );
};

export default SignupForm;
