import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Profile from './Profile'
import Home from './Home';
import { Switch, HashRouter as Router, Route} from "react-router-dom";
import '../styles/App.css';
import ResortsList from "./ResortsList";
import ResortDetails from "./ResortDetails";
import Preferences from "./Preferences";
import PreferredResortsList from "./PreferredResortsList";
import Favourites from "./Favourites";
import Ratings from "./Ratings";
import UserLocation from "./UserLocation";
import AdminForm from "./AdminForm";
import ChangePassword from "./ChangePassword";
import AuthService from "../services/auth.service";

class App extends Component {

  componentDidMount() {
    AuthService.checkTokenExpiration();
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
      <div>
          <Switch>
          <Route path="/logowanie" component={LoginForm}/>
          <Route path="/rejestracja" component={RegisterForm}/>
          <Route path="/profil" component={Profile}/>
          <Route path="/osrodki" component={ResortsList}/>
          <Route path="/osrodek/:id" component={ResortDetails}/>
          <Route exact path="/" component={Home}/>
          <Route path="/preferencje" component={Preferences}/>
          <Route path="/preferowaneOsrodki" component={PreferredResortsList}/>
          <Route path="/ulubione" component={Favourites}/>
          <Route path="/oceny" component={Ratings}/>
          <Route path="/lokalizacja" component={UserLocation}/>
          <Route path="/admin" component={AdminForm}/>
          <Route path="/zmianaHasla" component={ChangePassword} />
          </Switch>
      </div>
      </Router>
  )
  }
}

export default App;
