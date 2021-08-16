import React, {Fragment, useState} from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import TryIcon from '@material-ui/icons/Try';
import {AppBar, Typography} from '@material-ui/core';
import { grey, } from '@material-ui/core/colors';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    '& > :not(style)': {
      m: 10,
      width: 628,
      height: 128,
    },
  },
  outerPaper: {
    display: 'flex',
    flexDirection: "column",
    margin: "2em",
  },
  content: {
    display: 'flex',
    flexDirection: "row",
    margin: "0em 2em 0em 2em",
  },
  middle: {
    display: 'flex',
    flexDirection: "row",
    position: "relative",
    left: 150,
  },
  innerContent: {
    margin: "0em 1em",
    width: 100,
  },
  innerPaper: {
    position: 'relative',
    left: 270,
  },
  appBar: {
    borderBottom: "2px solid gray",
    marginBottom: "1em"
  },
  dividerOne: {
    width: 1,
    background: "grey",
  },
  dividerTwo: {
    height: 1,
    background: "grey",
  },
})
const theme = createTheme({
  // palette: {
  //   primary: grey,
  // },
  palette: {
    primary: {
      main: grey[300],
    }
  },
});

export default function LeaderBoard() {

  const classes = useStyles();

  return (
    <Box className={`${classes.root}`}>
      <Paper className={`${classes.outerPaper}`} outlined elevation={12}>
        <TryIcon/>
        <div className={`${classes.content}`}>
          <div>Left</div>
          <div className={`${classes.middle}`}>
            <Divider orientation="vertical" className={`${classes.dividerOne}`}/>
            <div className={`${classes.innerContent}`}>
              <div>Top</div>
              <Divider orientation="horizontal" className={`${classes.dividerTwo}`}/> 
              <div>Bottom</div>
            </div>
            <Divider orientation="vertical" className={`${classes.dividerOne}`}/> 
          </div>
          <Paper className={`${classes.innerPaper}`} elevation={6}>
            <ThemeProvider theme={theme}>
              <AppBar className={`${classes.appBar}`} position="static">
                <Typography variant="h6">
                  Score
                </Typography>
              </AppBar>
            </ThemeProvider>
            <div>Score Number</div>
          </Paper>
        </div>
      </Paper>
    </Box>
  );
}
