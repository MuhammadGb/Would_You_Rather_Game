import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import {Paper, Typography } from '@material-ui/core';
import {connect} from "react-redux";
import {createTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { handleSaveAnswer } from '../actions/questions';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 550,
  },
  background: {
    background: grey[300],
    border: "2px solid black"
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  avatar: {
    width: "7em !important",
    height: "7em !important",
  },
  progressBox: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: grey[200],
    }
  },
});
const colorGreen = createTheme({
  palette: {
    primary: {
      main: green[500],
    }
  },
});

function CircularProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box className={classes.progressBox}>
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function AnswerPage(props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Choose wisely');
  const classes = useStyles();
  const { authedUser, userAnswers, optionOne, optionTwo, author, id, firstPerc, secondPerc, dispatch} = props;

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText('');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value !== "") {
      setError(false);
			dispatch(handleSaveAnswer(id, value));
    }else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={10}>
      {userAnswers.hasOwnProperty(id)
        ?<form className={classes.formControl}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  width: "30%", 
                  alignItems: "center", 
                  borderRight: "1px solid gray"
                }}>
                <ThemeProvider theme={theme}>
                  <Typography sx={{textAlign:"center", width: "100%"}} className={classes.background}>{author.name} asks:</Typography>
                </ThemeProvider>
                <Avatar className={`${classes.avatar}`} src={author.avatarURL} alt={author.name}/>
              </Box>
              <FormControl
                sx={{ m: 0, width: "70%", }}
                component="fieldset"
                error={error}
                variant="outlined"
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <ThemeProvider theme={theme}>
                    <Typography sx={{width: "55%"}} className={classes.background}>Would You Rather</Typography>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <Typography sx={{width: "45%"}} className={classes.background}>
                      General Users' Choice
                    </Typography>
                  </ThemeProvider>
                </Box>
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={optionOne.votes.includes(authedUser) ?"optionOne":"optionTwo"}
                  sx={{pl: "5px" }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                    <FormControlLabel 
                      value="optionOne" 
                      control={<Radio />} 
                      label={optionOne.text}
                    />
                    <CircularProgressWithLabel value={firstPerc} />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <FormControlLabel 
                      value="optionTwo"
                      control={<Radio />} 
                      label={optionTwo.text}
                    />
                    <CircularProgressWithLabel value={secondPerc} />
                  </Box>
                </RadioGroup>
                <FormHelperText sx={{ml: "10%", }}>
                  {`Your Option: ${optionOne.votes.includes(authedUser)? optionOne.text: optionTwo.text}`}
                </FormHelperText>
                <ThemeProvider theme={colorGreen}>
                  <Button 
                    component={Link} 
                    sx={{ width: "50%", height: "2em", ml: "10%", mb: "2%", textTransform: "none"}} 
                    to="/" variant="contained"
                  >
                    Back
                  </Button>
                </ThemeProvider>
              </FormControl>
            </Box>
        </form>
        :<form onSubmit={handleSubmit} >
          <FormControl
            sx={{ m: 3 }}
            component="fieldset"
            error={error}
            variant="standard"
          >
            <ThemeProvider theme={theme}>
              <Typography className={classes.background}>Would You Rather</Typography>
            </ThemeProvider>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="optionOne" control={<Radio />} label={optionOne.text} />
              <FormControlLabel value="optionTwo" control={<Radio />} label={optionTwo.text} />
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
            <Button 
              sx={{ mt: 1, mr: 1, textTransform: "none", background: "navy" }} 
              type="submit" 
              variant="contained"
            >
              Submit Choice
            </Button>
          </FormControl>
        </form>
        }
    </Paper>
  </div>
  );
}


function mapStateToProps({authedUser, questions, users}, props) {
  const {id} = props.match.params
  const question = questions[id]
  const total = question.optionOne.votes.length + question.optionTwo.votes.length;
  return {
    authedUser,
    id,
    optionOne: question.optionOne,
    optionTwo: question.optionTwo,
    userAnswers: users[authedUser].answers,
    author: users[questions[id].author],
    firstPerc: Math.round((question.optionOne.votes.length/total)*100),
    secondPerc: Math.round((question.optionTwo.votes.length/total)*100),
  }
}

export default connect(mapStateToProps)(AnswerPage);


