import type { FC } from "react";
import { Box } from "@mui/material";
import LoginForm from "../../components/Forms/Login";

const Login: FC = () => {
  return (
    <Box component="form">
      <LoginForm />
    </Box>
  );
};

export default Login;
