import React, {Component} from "react";
import './../App.css';
import {connect} from "react-redux";
import {handleInitialData} from "../actions/index";
import Login from './Login';
import {Route, Switch, BrowserRouter as  Router} from "react-router-dom";
import Navbar from './Navbar'



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
      ?<Route path="/" >
        <Navbar/>
      </Route>
      :<Route path="/">
        <Login/>
      </Route> 
    }</Switch>
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
