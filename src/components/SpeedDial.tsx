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
import { styles } from "shared/styles/SpeedDial.style";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { appActions } from "store/slices/app.slice";

const actions = [{ icon: <FileCopyIcon />, name: "Theme", click: () => {} }];

const initialTheme = (isDarkMode: boolean): React.ReactElement => {
  return isDarkMode ? <WbSunnyIcon /> : <DarkModeIcon />;
};

export const SpeedDialComponent: React.FC = () => {
  const dispath = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.app);
  const { setDarkTheme } = appActions;

  const iconTheme = React.useMemo(() => initialTheme(isDarkMode), [isDarkMode]);

  const setTheme = (): void => {
    dispath(setDarkTheme(!isDarkMode));
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
