import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
//
import { useAppDispatch, useAppSelector } from "store/hooks";
import { appActions } from "store/slices/app.slice";

const hideDuration = 5000;

export const Notify: React.FC = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = React.useState<"info" | "success" | "error">("info");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { setSuccessMessage, setErrorMessage, setInfoMessage } = appActions;
  const { errorMessage, infoMessage, successMessage } = useAppSelector(
    (state) => state.app
  );

  React.useEffect(() => {
    if (errorMessage) setType("error");
    if (infoMessage) setType("info");
    if (successMessage) setType("success");

    if (errorMessage || infoMessage || successMessage) setIsOpen(true);
  }, [errorMessage, infoMessage, successMessage]);

  const closeHandler = () => {
    setIsOpen(false);
    dispatch(setSuccessMessage(""));
    dispatch(setInfoMessage(""));
    dispatch(setErrorMessage(""));
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={hideDuration}
      onClose={closeHandler}
    >
      <Alert onClose={closeHandler} severity={type}>
        {errorMessage || infoMessage || successMessage}
      </Alert>
    </Snackbar>
  );
};
