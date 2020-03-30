import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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

export default function Upload() {
  const classes = useStyles();
  const [state, setState] = useState({
    selectedFile: null,
    fileName: "",
    fileUploaded: false
  });
  const fileInput = useRef(null);

  const fileSelectionHandler = event => {
    const file = event.target.files[0];
    if (file) {
      console.log("Upload -> file", file);
      setState({
        ...state,
        selectedFile: file,
        fileName: file.name,
        fileUploaded: false
      });
    }
  };

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const uploadFileHandler = () => {
    const fd = new FormData();
    fd.append("csv", state.selectedFile, state.selectedFile.name);

    axios
      .post(`${BASE_URL}uploadcsv`, fd, {
        onUploadProgress: progressEvent => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              " %"
          );
        }
      })
      .then(res => {
        if (res && res.status === 200) {
          const secs = 10000;
          sleep(secs).then(() => {
            console.log(`Slept for ${secs} secs`);

            setState({
              ...state,
              selectedFile: null,
              fileName: "",
              fileUploaded: true
            });
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
            Upload CSV File
          </Typography>
        </div>
        <input
          style={{ display: "none" }}
          type="file"
          accept=".csv"
          onChange={fileSelectionHandler}
          ref={fileInput}
          name="selectedFile"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => fileInput.current.click()}
          className={classes.submit}
        >
          Select File
        </Button>

        {state.fileName.length ? (
          <div className={classes.alert}>
            <Alert severity="info">{state.fileName}</Alert>
          </div>
        ) : null}

        <Button
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
          onClick={uploadFileHandler}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>

        {state.fileUploaded ? (
          <div className={classes.alert}>
            <Alert severity="success">File uploaded successfully</Alert>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
