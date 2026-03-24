import { Container } from "@mui/material";

import Routes from "./providers/Routes";
import AuthProvider from "./providers/Auth";

export default function App() {
  return (
    <>
      <AuthProvider>
        {/* Header here */}
        <Container
          sx={{ bgcolor: "customColors.whiteLilac", minHeight: "100vh" }}
          maxWidth={false}
          disableGutters
          component="main"
        >
          <Routes />
        </Container>
        {/* Footer here */}
      </AuthProvider>
    </>
  );
}
