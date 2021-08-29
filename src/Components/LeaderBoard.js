import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {createTheme} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import TryIcon from '@material-ui/icons/Try';
import Avatar from '@material-ui/core/Avatar';
import {Typography} from '@material-ui/core';
import { grey, } from '@material-ui/core/colors';
import { connect } from 'react-redux';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    '& > :not(style)': {
      m: 10,
      height: 200,
    },
    flexDirection: "column"
  },
  center: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  userName: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    justifyContent: "space-between",
  },
  outerPaper: {
    display: 'flex',
    flexDirection: "column",
    margin: "2em",
    border: "1px solid gray"
  },
  content: {
    display: 'flex',
    flexDirection: "row",
    margin: "0em",
  },
  middle: {
    display: 'flex',
    flexDirection: "row",
    width: "40%"
  },
  innerContent: {
    width: 300,
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  innerPaper: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    width: "30%"
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
    margin: "1em 0em !important",
    width: "100%"
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

function LeaderBoard(props) {

  const classes = useStyles();
  const {users, ids} = props;

  return (
    <div className={classes.center}>
      <Box className={`${classes.root}`}>
        {ids.map((id) => 
        (<Paper className={`${classes.outerPaper}`} key={id} outlined >
          <TryIcon/>
          <div className={`${classes.content}`}>
            <Box className={classes.userName}>
              <Typography variant="h5">Users</Typography>
              <Divider orientation="horizontal" className={`${classes.dividerTwo}`}/>
              <Typography variant="h6">{users[id].name}</Typography>
              <Divider orientation="horizontal" className={`${classes.dividerTwo}`}/>
              <Avatar className={`${classes.avatar}`} src={users[id].avatarURL} alt={users[id].name}/>
            </Box>
            <div className={`${classes.middle}`}>
              <Divider orientation="vertical" className={`${classes.dividerOne}`}/>
              <Box className={`${classes.innerContent}`}>
              <Typography variant="h5">Questions</Typography>
              <Divider orientation="horizontal" className={`${classes.dividerTwo}`}/>
                <Typography variant="h6">{`Answered: ${Object.keys(users[id].answers).length}`}</Typography>
                <Divider orientation="horizontal" className={`${classes.dividerTwo}`}/> 
                <Typography variant="h6">{`Asked: ${users[id].questions.length}`}</Typography>
              </Box>
              <Divider orientation="vertical" className={`${classes.dividerOne}`}/> 
            </div>
            <Box className={classes.innerPaper}>
              <Typography sx={{textAlign: "center"}} variant="h5">
                Points
              </Typography>
              <Divider orientation="horizontal" className={`${classes.dividerTwo}`}/>
              <Typography variant="h6" style={{textAlign: "center"}}>
                {users[id].questions.length + Object.keys(users[id].answers).length}
              </Typography>
            </Box>
          </div>
        </Paper>
        ))}
      </Box>
    </div>
  );
}


function mapStateToProps({users}) {
  return {
    ids: Object.keys(users).sort((a, b) => 
      (Object.keys(users[b].answers).length + users[b].questions.length) 
      -(Object.keys(users[a].answers).length + users[a].questions.length)
    ),
    users,
  }
}

export default connect(mapStateToProps)(LeaderBoard);
