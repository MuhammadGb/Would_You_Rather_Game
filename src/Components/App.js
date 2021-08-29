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

class App extends Component {

  componentDidMount(){
    this.props.handleInitialData();
  }

  render() {
    const {authedUser} = this.props;

  return ( 
  <Router>
    <Switch>
      {authedUser !== null
      ?<Fragment>
        <Navbar/>
        <Route exact path="/" component={Dashboard} />
        <Route path="/questions/:id" component={AnswerPage} />
        <Route path="/new_question" component={NewQuestion} />
        <Route path="/leaderboard" component={LeaderBoard} />
       </Fragment>
      :<Route exact path="/">
        <Login/>
      </Route>}
    </Switch>
    <Switch>
    </Switch>
  </Router>
  //SWITCH RENDERS THE FIRST COMPONENT AND ACCORDINGLY.
  //It RENDERED THE NAV AND HOME BECAUSE A ROOT WAS NEEDED.
  //EVEN IF I CHANGED THE RULE LOGIN IS NOT BEING RENDERED BECAUSE A ROOT IS NEEDED.
  //IT CAN NEVER RENDER THE LOGIN ROUTE FIRST BECAUSE A ROOT ROUTE NEEDS TO APPEAR FIRST.
  //IT CAN NEVER RENDER ANY ROUTE FIRST OVER A ROOT ROUTE.
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
