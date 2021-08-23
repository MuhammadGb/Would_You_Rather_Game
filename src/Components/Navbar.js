import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { colors } from '@material-ui/core';
import { resetAuthedUser } from '../actions/authedUser';
import { Link } from "react-router-dom";
import Dashboard from "./DashBoard";
import AnswerPage from "./AnswerPage";
import LeaderBoard from "./Leader_Board";
import NewQuestion from "./New_Question";
import {Route, Switch, BrowserRouter as  Router} from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: {
      main: colors.green.A700
    },
  },
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3)
  },
  outerDiv: {
    fontWeight: 'bolder',
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    borderBottom: '2px solid black',
    paddingBottom: "0px",
  },
  innerDiv:{
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    marginRight: theme.spacing(3)
  },
  tabSpacing: {
    marginLeft: theme.spacing(15),
    marginBottom: "0px",
  },
  spacing: {
    margin: theme.spacing(0.5),
  },
  capitals: {
    textTransform: "none",
  }
});


function Navbar(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const {users, dispatch} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = () => {
		dispatch(resetAuthedUser());
  };

return (
  <Fragment>
    <div className={`${classes.root} ${classes.outerDiv}`}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="standard"
          className={classes.tabSpacing}
        >
          <Tab label="Home" component={Link} to="/" className={classes.capitals}/>
          <Tab label="New Poll" component={Link} to="/new_question" className={classes.capitals}/>
          <Tab label="Leader Board" component={Link} to="/leaderboard" className={classes.capitals}/>
        </Tabs>
      <div className={classes.innerDiv}>
        <ThemeProvider theme={theme} >
          <Typography className={classes.spacing}>{`Hi ${users.name}`}</Typography>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
              }}
            color="primary"
            variant="dot"
            className={classes.spacing}>
          <Avatar src={users.avatarURL} alt={`Avatar of ${users.name}`}/>
          </Badge>
        </ThemeProvider>
        <Button 
          variant="contained" 
          onClick={handleLogout} 
          size="medium" 
          endIcon={<ExitToAppIcon/>}
          className={`${classes.spacing} ${classes.capitals}`}
        >
          Sign out
        </Button>
      </div>
    </div>
  </Fragment>
  );
}
function mapStateToProps({users, authedUser}) {
  return {
    users: users[authedUser]
  }
}
export default connect(mapStateToProps)(Navbar);