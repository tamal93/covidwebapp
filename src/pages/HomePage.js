import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Upload from "../components/Upload";
// import Download from "../components/Download";
// import Update from "../components/Update";
import Format from "../components/Format";

import Change from "../components/Change";

const HomePage = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    step: 1
  });

  const nextStep = () => {
    setState({
      ...state,
      step: state.step + 1
    });
  };

  const prevStep = () => {
    setState({
      ...state,
      step: state.step - 1
    });
  };

  let dataVisible = "";

  switch (state.step) {
    case 1:
      dataVisible = (
        <div>
          <Upload />
          <Change nextStep={nextStep} />
        </div>
      );
      break;
    case 2:
      dataVisible = (
        <div>
          <Format />
          <Change prevStep={prevStep} />
        </div>
      );
      break;
    default:
      dataVisible = "";
      break;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Covid19 Admin
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">{dataVisible}</Container>
    </div>
  );
};

export default HomePage;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
