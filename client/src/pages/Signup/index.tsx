import type { FC } from "react";
import { Container } from "@mui/material";
import SignupForm from "../../components/Forms/Signup";

const Signup: FC = () => {

  return (
    <Container>
      <SignupForm />
    </Container>
  );
};

export default Signup;
