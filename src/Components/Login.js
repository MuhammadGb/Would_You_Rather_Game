import React, {Fragment, useState} from 'react';
import { createTheme, adaptV4Theme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import './../App.css';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {AppBar, Typography, Card} from '@material-ui/core';
import { setAuthedUser } from '../actions/authedUser';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { colors } from '@material-ui/core';
import { Link } from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: {
      main: colors.green.A700
    },
  },
});

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
  buttonSize:{
    textTransform: "none",
    fontWeight: "bold", 
    fontSize: "2em",
  },
  formSize:{
    padding: "8em 8px 8px 8px",
    margin:"8em 8px 8px 8px",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column"
  },
  avatar:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "row",
    margin: "2em",
  },
  badge:{
    animation: "$ripple 1.2s infinite ease-in-out",
    backgroundColor: "lawngreen"
  }
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
      <Grid container spacing={3} justifyContent="center">
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
          <Fragment>
            {Object.keys(users).map(id => (
              <ThemeProvider theme={theme}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                  }}
                color="primary"
                variant="dot">
              <Avatar src={users[id].avatarURL} key={id} alt={`Avatar of ${users[id].name}`}/>
              </Badge>
              </ThemeProvider>
            ))}
          </Fragment>

          <form className={classes.formSize} autoComplete="off" onSubmit={handleSubmit}>
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
          >
            {Object.keys(users).map(id => (
              <MenuItem key={id} value={id}>{users[id].name}</MenuItem>
            ))}
          </TextField>
          {error? (
          <div>{error}</div>
          ): ""}
          </form>
        </Card>
        </Grid>
      </Grid>
  </Fragment>
  );
}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login);
















