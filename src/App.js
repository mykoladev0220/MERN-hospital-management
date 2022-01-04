import React from "react";
import "./App.css";
import Routes from "./routes/routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3EC19A",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
