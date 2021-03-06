import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Grid} from "@material-ui/core";
import "../styles/LoginForm.css";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.translateErrorMessage = this.translateErrorMessage.bind(this);

    this.state = {
      login: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  translateErrorMessage(errorType){
    switch (errorType) {
      case 'Network Error':
        return 'Błąd połączenia, spróbuj ponownie za jakiś czas !'
      case "Unauthorized":
        return 'Niepoprawne dane logowania'
      default:
        return 'Błąd połączenia';
    }
  }
  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.login, this.state.password).then(
        () => {
          this.props.history.push("/osrodki");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.error) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: this.translateErrorMessage(resMessage)
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {

    const {login,password,message,loading} = this.state;

    return (
      <div>
      <NavBar></NavBar>
        <Grid className="grid">
        <div className="card card-container">
          <h3>Zaloguj się</h3>

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="username">Login</label>
              <Input
                type="text"
                className="form-control"
                name="login"
                value={login}
                onChange={this.onChangeLogin}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Hasło</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                id="login-button"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Zaloguj</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
        </Grid>
      <div id="login-footer"><Footer></Footer></div>
      </div>
    );
  }
}

export default LoginForm;