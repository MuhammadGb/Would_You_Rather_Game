import React, {useState} from 'react';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import { grey, } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { red, } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  color: {
    background: grey[300],
  },
  avatar: {
    width: "6em !important",
    height: "6em !important",
  },
  headerOne: {
    textAlign: "center",
    fontWeight: "700 !important",
    fontSize: "0.8em !important",
    width: "100%",
    height: "2em",
  },
  headerTwo: {
    textAlign: "center",
    fontSize: "1em !important",
    height: "1.6em",
  },
  outerBox: {
    display: "flex",
    flexDirection: "row",
    margin: "1em 0em 1em 0em",
    border: "1px solid lightgray",
    borderRadius: "5px"
  },
  innerBoxOne: {
    width: "35%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRight: "0.5px solid lightgray",
  },
  dividerOne: {
    color: "black !important",
    backgroundColor:"black !important",
    width: "0.5em !important"
  },
  innerBoxTwo: {
    width: "65%",
    display: "flex",
    flexDirection: "column"
  },
  optionBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    textTransform: "none !important",
    height: "2em",
    width: "90%",
  },
  optionTexts: {
    display: "flex",
    flexDirection: "column",
    minWidth: "50%",
    justifyContent: "flex-start",
    margin: "0.5em 0em 0.5em 0em !important",
  },
  text: {
    margin: "0.1em 0em 0.1em 0em !important",
    fontWeight: "700 !important"
  },
}))

const theme = createTheme({
  palette: {
    primary: {
      main: grey[200],
    }
  },
	// myColor: {
	// 	main: colors.grey[500]
	// },
});

function Question(props) {

  const classes = useStyles();

  const {ids, question, author, isAnswered, answeredIds} = props;
  const [answered, SetAnswered] = useState(true);

  return(
      <Box className={classes.outerBox}>
        <Box className={classes.innerBoxOne}>
          <Typography className={`${classes.color} ${classes.headerOne}`}>{author.name} asks:</Typography>
            <Avatar className={`${classes.avatar}`} src={author.avatarURL} alt={author.name}/>
        </Box>
        <Box className={`${classes.innerBoxTwo} ${classes.border}`}>
          <Typography className={`${classes.color} ${classes.headerTwo}`}>Would You Rather</Typography>
          <Box className={classes.optionBox}>
            <Box className={classes.optionTexts}>
              <Typography className={classes.text}>{question.optionOne.text}</Typography>
              <Typography>or</Typography>
              <Typography className={classes.text}>{question.optionTwo.text}</Typography>
            </Box>
            <Button className={`${classes.button}`} component={Link} to={`/questions/${question.id}`} color="primary" variant="contained">
              {isAnswered
              ?"Check Results"
              :"Answer Here"
              }
            </Button>
          </Box>
        </Box>
      </Box>
  )
}


function mapStateToProps({ questions, users, authedUser}, props) {
  const { ids } = props;

  const answeredIds = users[authedUser].answers;

	return {
		question: questions[ids], 
    author: users[questions[ids].author],
    answeredIds 
	};
}

export default connect(mapStateToProps)(Question);
