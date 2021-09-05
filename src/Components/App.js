import React, {Component, Fragment} from "react";
import './../App.css';
import {connect} from "react-redux";
import {handleInitialData} from "../actions/index";
import Login from './Login';
import {Route, Switch, BrowserRouter as  Router} from "react-router-dom";
import Navbar from './Navbar'
import Dashboard from "./DashBoard";
import AnswerPage from "./AnswerPage";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import NotFound from './NotFound';

class App extends Component {

  componentDidMount(){
    this.props.handleInitialData();
  }

  render() {
    const {authedUser} = this.props;

  return ( 
  <Router>
      {authedUser !== null
      ?<Fragment>
        <Navbar/>
        <Switch>
          <Route path="/"  exact component={Dashboard} />
          <Route path="/questions/:id" component={AnswerPage} />
          <Route path="/new"  component={NewQuestion} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route component={NotFound} />
        </Switch>
       </Fragment>
      :<Route exact path="*" component={Login}/>}
  </Router>
  )}
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}
function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
