import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
//
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { appActions } from "./store/slices/app.slice";
import { SpeedDialComponent } from "components/SpeedDial/SpeedDial";

function App() {
  const { isDarkTheme } = useAppSelector((state) => state.app);

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // const theme = React.useMemo(() => {
  //   dispath(setDarkTheme(prefersDarkMode));

  //   return createTheme({
  //     palette: { mode: prefersDarkMode ? "dark" : "light" },
  //   });
  // }, [prefersDarkMode]);

  const theme = React.useMemo(
    () => createTheme({ palette: { mode: isDarkTheme ? "dark" : "light" } }),
    [isDarkTheme]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>Hello</div>
        <SpeedDialComponent />
      </ThemeProvider>
    </>
  );
}

export default App;
