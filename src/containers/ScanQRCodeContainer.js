import React, { useState } from "react";

import NavBar from "../components/NavBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: "10% auto",
    width: "75%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export function ScanQRCodeContainer({ errorData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(errorData.error !== "");

  return (
    <React.Fragment>
      <NavBar text="Scan QR Code!" />
      <Box className={classes.box}>
        <img
          src="https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2F192.168.2.7%3A3000%2Fauthentication%2F1&chs=180x180&choe=UTF-8&chld=L|2"
          rel="nofollow"
          alt="qr code"
        />
      </Box>
      <Snackbar
        open={open}
        data-testid="error"
        autoHideDuration={8000}
        message={errorData.error}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="error"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              data-testid="close-error-button"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {errorData.error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    errorData: state.error,
  };
};

export default connect(mapStateToProps)(ScanQRCodeContainer);
