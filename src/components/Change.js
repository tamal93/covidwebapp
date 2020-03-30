import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function Change({ prevStep, nextStep }) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {prevStep ? (
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={prevStep}
              >
                Previous
              </Button>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {nextStep ? (
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
