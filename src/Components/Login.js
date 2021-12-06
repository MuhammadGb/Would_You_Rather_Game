import React, {Fragment, useState} from 'react';
//import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import './../App.css';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {AppBar, Typography, Card} from '@material-ui/core';
import { setAuthedUser } from '../actions/authedUser';
//import { colors } from '@material-ui/core';


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: colors.green.A700
//     },
//   },
// });

// const theme = createTheme(
//   adaptV4Theme({
//     overrides: {
//     spacing: [1, 2, 3, 4, 5, 6, 7, 8]
//     }
//   }), {
//   palette: {
//     primary: {
//       main: colors.green.A700
//     },
//   },
// });


const useStyles = makeStyles((theme) =>({
  root: {
    width: 500,
    padding: "0em",
    margin: "2em",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  appBar: {
    backgroundColor: "forestgreen !important",
    alignItems: "center",
    borderRadius: "0.5em",
    margin: 0
  },
  buttonSize:{
    textTransform: "none !important",
    fontWeight: "bolder !important", 
    fontSize: "1.5em",
  },
  formSize:{
    padding: "8em 8px 8px 8px",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column"
  },
}));

 function Login(props) {

  const classes = useStyles();
  const [userID, setUserID] = useState("");
  const [error, setError] = useState("")

  const {users, dispatch} = props;

  const handleInput = (event) => {
    setUserID(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    userID !== ""
    ?dispatch(setAuthedUser(userID))
    :setError("Select a user to Login!")
  }
  return (
    <Fragment>
      <Grid container spacing={0} marginTop="7%" justifyContent="center">
        <Grid item xs={5}>
        <Card className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Typography fontWeight="600" color="midnightblue" variant="h6">
              Play the Would You Rather Game
            </Typography>
            <Typography  fontWeight="600" color="midnightblue" variant="h6">
              Sign In to Start!
            </Typography>
          </AppBar>
          <form className={classes.formSize} autoComplete="off" onSubmit={handleSubmit}>
          <Typography color="darkblue" textAlign="center" variant="h5">Select a user to Sign in.</Typography>
          <Button size="large" className={classes.buttonSize} color="success" type="submit" variant="contained">
            Sign In
          </Button>
          <TextField 
            select 
            value={userID}
            onChange={handleInput} 
            label="Choose a User" 
            helperText="Sign in to one of these users" 
            variant="filled"
            fullWidth
            fullWidth
          >
            {Object.keys(users).map(id => (
              <MenuItem key={id} value={id}>{users[id].name}</MenuItem>
            ))}
          </TextField>                                                                
          <TextField>
            {Object.keys(users).map(id => (
              <MenuItem key={id} value={id}>{users[id].name}</MenuItem>
            ))}
          </TextField>
          {error? (
          <div style={{color:"red", marginLeft: "1em"}}>{error}</div>
          ): ""}
          </form>
        </Card>
        </Grid>
      </Grid>
      </Fragment>
  )}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login);
















