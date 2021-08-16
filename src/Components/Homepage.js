import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Question from './Question';
import {Paper, Typography} from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "lghtgreen",
    minWidth: 550,
  },
  background: {
    backgroundColor: "lightgray !important"
  },
  capitals: {
    textTransform: "none !important",
  },
  dividerOne: {
    width: 3,
    background: "grey",
  },
}));

export default function Homepage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [toggle, setToggle] = React.useState(false)

  const {answeredIds, unansweredIds,} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleClicking = () => {
    toggle === false
    ?setToggle(true)
    :setToggle(false)
  };

  return (
    <Paper elevation={12} className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example">
          <Tab 
            label="Unanswered" {...a11yProps(0)}
            className = {`${classes.capitals} ${toggle === true? "": classes.background}`}
            onClick={handleClicking}/>
          <Tab label="Answered" {...a11yProps(1)}
            className = {`${classes.capitals} ${toggle === true? classes.background:""} `}
            onClick={handleClicking}/>
        </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {unansweredIds.map(unanswered => 
            <Box key={unansweredIds}>
              <Question ids={unanswered}/>
            </Box>
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {answeredIds.map(answered => 
            <Box key={answeredIds}>
              <Question ids={answered}/>
            </Box>
          )}
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
}
