import React from "react";
import Homepage from './Homepage';
import {BrowserRouter as  Router, Route, Switch} from "react-router-dom";
import Navbar from './Navbar'

export default function Routes(props) {

  //const {authedUser} = props;

  return (<Router>
  <Switch>
    <Route path="/" exact>
      <Navbar/>
    </Route>
    <Route path="/" exact>
      <Homepage/>
    </Route>
  </Switch>
</Router>
  )
}