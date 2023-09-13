import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { appActions } from "./store/slices/app.slice";
import { SpeedDialComponent } from "components/SpeedDial";
import { Header } from "features/Header";
import { BrowserRouter } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UseRouter } from "shared/hooks/router";
import { Notify } from "features/Notify";
import { darkMode, lightMode } from "utils/themes";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { isDarkMode } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { setDarkTheme } = appActions;
  const { setInfoMessage } = appActions;

  React.useEffect(() => {
    dispatch(setDarkTheme(prefersDarkMode));
    dispatch(
      setInfoMessage(
        `Тема оформления была изменена на системный: ${
          prefersDarkMode ? "Темный" : "Светлый"
        }`
      )
    );
  }, [prefersDarkMode]);

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
        <CssBaseline />
        <BrowserRouter>
          <main>
            <Header />
            <UseRouter />
            <SpeedDialComponent />
          </main>
        </BrowserRouter>
        <Notify />
      </ThemeProvider>
    </>
  );
}

export default App;
