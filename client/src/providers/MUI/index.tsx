import type { FC, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface MuiProviderProps {
  children: ReactNode;
}

declare module "@mui/material/styles" {
  interface Palette {
    customColors: Record<string, string>;
  }

  interface PaletteOptions {
    customColors?: Record<string, string>;
  }
}

const theme = createTheme({
  palette: {
    customColors: {
      whiteLilac: "#F6F7FB",
    },
  },
});

const MuiProvider: FC<MuiProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiProvider;
