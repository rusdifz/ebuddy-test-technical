// theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0d47a1" }, // biru tua modern
    secondary: { main: "#ef5350" },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&:before": { borderBottom: "none" },
          "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.05)" },
        },
      },
    },
  },
});

export default theme;
