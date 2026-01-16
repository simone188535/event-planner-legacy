import { Container } from "@mui/material";

import Routes from "./providers/Routes";

export default function App() {
  return (
    <>
      {/* Header here */}
      <Container
        sx={{ bgcolor: "customColors.whiteLilac", minHeight: '100vh' }}
        maxWidth={false}
        disableGutters
        component="main"
      >
        <Routes />
      </Container>
      {/* Footer here */}
    </>
  );
}
