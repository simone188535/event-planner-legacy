import axios from "axios";

interface signupDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const signup = (signupData: signupDTO) => {
  return axios.post("/users/sign-up", signupData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { signup };
// login,
// forgotPassword,
// resetPassword
