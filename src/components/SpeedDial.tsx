import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloseIcon from "@mui/icons-material/Close";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
//
import { styles } from "styles/speeddial.styles";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { appActions } from "store/slices/app.slice";

const actions = [{ icon: <FileCopyIcon />, name: "Theme", click: () => {} }];

const initialTheme = (isDarkTheme: boolean): React.ReactElement => {
  return isDarkTheme ? <WbSunnyIcon /> : <DarkModeIcon />;
};

export const SpeedDialComponent: React.FC = () => {
  const dispath = useAppDispatch();
  const { isDarkTheme } = useAppSelector((state) => state.app);
  const { setDarkTheme } = appActions;

  const iconTheme = React.useMemo(
    () => initialTheme(isDarkTheme),
    [isDarkTheme]
  );

  const setTheme = (): void => {
    dispath(setDarkTheme(!isDarkTheme));
  };

  return (
    <Box sx={{ ...styles.global }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ ...styles.speedial }}
        icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.name === "Theme" ? iconTheme : action.icon}
            tooltipTitle={action.name}
            onClick={() => action.name === "Theme" && setTheme()}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
