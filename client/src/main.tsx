import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { createTheme, ThemeProvider } from '@mui/material/styles';


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
    },
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
