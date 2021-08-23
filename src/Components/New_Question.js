import React, {Fragment, useState} from 'react';
import {createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import {AppBar, Paper, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: "column",
    width: "30em",
  },
  center: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  appBar: {
    padding: "0.5em",
    display: "flex",
    alignItems: "center",
  },
  spacing: {
    margin: "0.5em 1em 1em 1em", 
  },
  font: {
    fontWeight: 700,
  },
  button: {
    margin: "2em 0em",
  },
  background: {
    backgroundColor: "black",
    // margin: theme.spacing(1),
    margin: "2em",
  },
  subtitle: {
    display: "flex", 
    flexDirection: "column", 
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

export default function NewQuestion() {
  
  const classes = useStyles();
  const [isActive, setIsActive] = React.useState(false);

  const handleClicking = () => {
    isActive === false
    ?setIsActive(true)
    :setIsActive(false)
  };

  return (
    <div className={classes.center}>
      <Paper elevation={12}>
        <ThemeProvider theme={theme}>
          <form  autoComplete="off" onSubmit={""} className={`${classes.root}`}>
            <AppBar className={`${classes.appBar}`} position="static">
              <Typography variant="h5">
                Play the Would You Rather Game.
              </Typography>
            </AppBar>
            <Box className={`${classes.spacing}`}>
              <div className={`${classes.spacing} ${classes.subtitle}`}>
                <Typography variant="h7" gutterBottom	>
                  Enter your question:
                </Typography>
                <Typography variant="h7" sx={{ marginTop: "0.5em" }} className={`${classes.font}`}>
                  Would you rather:
                </Typography>
              </div>
              <div className={`${classes.spacing}`}>
                <TextField 
                  value={""}
                  onChange={""} 
                  label="Enter a first option" 
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={`${classes.spacing}`}>
                <Divider>
                  <Chip label="OR" variant="h1"/>
                </Divider>
              </div>
              <div className={`${classes.spacing}`}>
                <TextField 
                  value={""}
                  onChange={""} 
                  label="Enter a second option" 
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={`${classes.spacing}`}>
                <Button size="large" fullWidth className={`${classes.button}`} color="primary" type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </Box>
          </form>
        </ThemeProvider>
      </Paper>
    </div>
  );
}