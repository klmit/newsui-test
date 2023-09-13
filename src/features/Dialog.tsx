import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type Props = {
  text: string;
};

export const DialogComp: React.FC<Props> = ({ text }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (text) setOpen(true);
  }, [text]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
