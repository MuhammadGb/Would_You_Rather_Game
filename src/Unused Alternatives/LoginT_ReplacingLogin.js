import React, {Component, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../App.css';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {AppBar, Typography, Card} from '@material-ui/core';
import { setAuthedUser } from '../actions/authedUser';


 class Login extends Component {

  useStyles = () => {
    
    return makeStyles({
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
      
    }
  });
}

  state = {
    userID: "",
    error: ""
  }

   handleInput = (event) => {
    this.setState({userID: event.target.value})
  }
   handleSubmit = (event) => {
    const {userID} = this.state;
    const {dispatch} = this.props;

    this.state.userID !== ""
    ?dispatch(setAuthedUser(userID))
    :this.setState({error: "Select a user to Login!"})
    event.preventDefault();
  }
  render() {
    const classes = this.useStyles();
    const {users} = this.props;
    const {error} = this.state;
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
            <form className={classes.formSize} autoComplete="off" onSubmit={this.handleSubmit}>
            <Button size="large" className={classes.buttonSize} color="primary" type="submit" variant="contained">
              Sign In
            </Button>
            <TextField 
                  select 
                  value={this.state.userID}
                  onChange={this.handleInput} 
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
  )
  }
}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login);