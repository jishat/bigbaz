// import favicon from './favicon.png';
import './App.css';
import React, { createContext } from 'react';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = ()=> {

  return (
      <Router>
        <Switch>
          <Route path='/login'>
            <Home></Home>
          </Route>
          <Route path='/register'>
            <Home></Home>
          </Route>
          <Route path='/checkout'>
            <Home></Home>
          </Route>
          <Route path='/orders'>
            <Home></Home>
          </Route>
          <Route path='/review'>
            <Home></Home>
          </Route>
          <Route path='/admin'>
            <Admin></Admin>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
