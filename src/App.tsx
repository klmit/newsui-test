import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { appActions } from "./store/slices/app.slice";
import { SpeedDialComponent } from "components/SpeedDial";
import { Header } from "features/Header";
import { BrowserRouter, useLocation } from "react-router-dom";
import { UseRouter } from "hooks/router";

function App() {
  const { isDarkTheme } = useAppSelector((state) => state.app);
  const dispath = useAppDispatch();
  const { setDarkTheme } = appActions;

  const theme = React.useMemo(() => {
    dispath(setDarkTheme(isDarkTheme));

    return createTheme({
      palette: { mode: isDarkTheme ? "dark" : "light" },
    });
  }, [isDarkTheme]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <main>
            <Header />
            <UseRouter />
            <SpeedDialComponent />
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
