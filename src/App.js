import React from "react";
import "./App.css";
import Routes from "./routes/routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

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
      <Provider store={store}>
        <PersistGate Loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
