import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
//
import { useAppSelector } from "store/hooks";

const hideDuration = 5000;

export const Notify: React.FC = () => {
  const [type, setType] = React.useState<"info" | "success" | "error">("info");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { errorMessage, infoMessage, successMessage } = useAppSelector(
    (state) => state.app
  );

  React.useEffect(() => {
    if (errorMessage) setType("error");
    if (infoMessage) setType("info");
    if (successMessage) setType("success");

    setIsOpen(true);
  }, [errorMessage, infoMessage, successMessage]);

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={hideDuration}
      onClose={closeHandler}
    >
      <Alert onClose={closeHandler} severity={type}>
        <AlertTitle>{type}</AlertTitle>
        {errorMessage || infoMessage || successMessage}
      </Alert>
    </Snackbar>
  );
};
