import React, {useState} from 'react';
import {createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import {AppBar, Paper, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';

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
    textTransform: "none !important",
    fontWeight: "bolder"
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

function NewQuestion({dispatch}) {
  
  const classes = useStyles();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [home, setHome] = useState(false);

  const handleFirstChange = (e) => {
    setFirstOption(e.target.value)
  };
  const handleSecondChange = (e) => {
    setSecondOption(e.target.value)
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleSaveQuestion(firstOption, secondOption));
    debugger
    setHome(true);
  };


  if (home === true) {
    return <Redirect to="/"/>
  }return (
    <div className={classes.center}>
      <Paper elevation={12}>
        <ThemeProvider theme={theme}>
          <form  autoComplete="off" onSubmit={handleSubmit} className={`${classes.root}`}>
            <AppBar className={`${classes.appBar}`} position="static">
              <Typography variant="h5">
                Set Your Questions
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
                  value={firstOption}
                  onChange={handleFirstChange} 
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
                  value={secondOption}
                  onChange={handleSecondChange} 
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

export default connect()(NewQuestion);