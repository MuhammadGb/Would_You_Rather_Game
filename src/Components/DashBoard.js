import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import Homepage from "./Homepage";
import LeaderBoard from "./Leader_Board";
import NewPoll from "./New_Question";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
}));

function TabPanel(props) {

  const classes = useStyles();

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classes.root}
    >
      {value === index && (
        <Box p={1} >
          <Paper elevation={0}>{children}</Paper>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function DashBoard(props) {

  const { value, answeredIds, unansweredIds } = props;

  return (
    <Fragment>
      <TabPanel value={value} index={0}>
        <Homepage answeredIds={answeredIds} unansweredIds={unansweredIds}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewPoll/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LeaderBoard/>
      </TabPanel>
    </Fragment>
  );
}

function mapStateToProps({authedUser, questions, users}) {
  const getAnsweredId = Object.keys(users[authedUser].answers);

  const answeredIds = Object.keys(questions).filter(question => 
    getAnsweredId.hasOwnProperty(question)).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
     
  const unansweredIds = Object.keys(questions).filter(question => 
    !getAnsweredId.hasOwnProperty(question)).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    answeredIds,
    unansweredIds
  }
}

export default connect(mapStateToProps)(DashBoard);