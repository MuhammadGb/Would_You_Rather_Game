import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../App.css';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {AppBar, Typography, CardContent, Card} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "0em",
    margin: "2em",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  appBar: {
    backgroundColor: "lightslategray",
    alignItems: "center",
    color: "red",
    margin: 0
  },
  center: {
    display: "flex",
    justifyContent: "center",
  }, 
  buttonSize:{
    textTransform: "none",
    fontWeight: "bold", 
    fontSize: "2em"
  },
  formSize:{
    padding: "8px",
    margin:"8px"
  }
});

 function Login() {

  const classes = useStyles();
  const [state, setState] = useState({userID: ""});

  const handleInput = (event) => {
    setState({userID: event.target.value})
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const {userID} = state;
  }

  return (
    <Fragment>
      <Grid container spacing={3} justify="center">
        <Grid item xs={8} >
        <Card className={classes.root}>
          <AppBar className={classes.appBar} position="static">
              <Typography variant="h5">
                Play the Would You Rather Game
              </Typography>
              <Typography variant="h5">
                Sign Up to Start!
              </Typography>
          </AppBar>
          <CardContent className={classes.center}>
            <Button size="large" className={classes.buttonSize} color="primary">
              Sign In
            </Button>
          </CardContent>
            <form className={classes.formSize} autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
                  select 
                  value={state.userID}
                  onChange={handleInput} 
                  label="Choose a User" 
                  helperText="Sign in to one of these users" 
                  variant="filled"
                  fullWidth
              >
              <MenuItem key={"options.value"} value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
            </form>
        </Card>
        </Grid>
      </Grid>
  </Fragment>
  );
}


function mapStateToProps({users}) {
  return {
    userIds: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login);