import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { BASE_URL } from "../utils/config";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  alert: {
    margin: theme.spacing(4, 0, 0),
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 0)
  }
}));

export default function Download() {
  const classes = useStyles();
  const [state, setState] = useState({
    fileDownloaded: false
  });

  const downloadFileHandler = () => {
    axios
      .get(`${BASE_URL}downloadCSV`, {
        onUploadProgress: progressEvent => {
          console.log(
            "Download Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              " %"
          );
        }
      })
      .then(res => {
        if (res && res.status === 200) {
          setState({
            ...state,
            fileDownloaded: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <div className={classes.title}>
          <Typography component="h1" variant="h5">
            Download CSV File
          </Typography>
        </div>
        <Button
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
          onClick={downloadFileHandler}
          startIcon={<CloudDownloadIcon />}
        >
          Download
        </Button>

        {state.fileDownloaded ? (
          <div className={classes.alert}>
            <Alert severity="success">File downloaded successfully</Alert>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
