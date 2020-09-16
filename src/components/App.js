import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Profile from './Profile'
import Home from './Home';
import { Switch, BrowserRouter as Router, Route} from "react-router-dom";
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <Switch>
          <Route path="/logowanie" component={LoginForm}/>
          <Route path="/rejestracja" component={RegisterForm}/>
          <Route path="/profil" component={Profile}/>
          <Route exact path="/" component={Home}/>
          </Switch>
      </div>
      </Router>
  )
  }
}

export default App;
