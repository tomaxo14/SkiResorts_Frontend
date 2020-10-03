import React, { Component } from "react";
import AuthService from "../services/auth.service";
import NavBar from "./NavBar";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.login}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Imię:</strong>{" "}
          {currentUser.name}
        </p>
        <p>
          <strong>Nazwisko:</strong>{" "}
          {currentUser.surname}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}

export default Profile;