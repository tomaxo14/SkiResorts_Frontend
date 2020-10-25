import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Navbar } from "react-bootstrap";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vlogin = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const vname = value => {
    if (value.length < 2 || value.length > 30) {
      return (
        <div className="alert alert-danger" role="alert">
          Imię musi zawierać od 2 do 30 znaków.
        </div>
      );
    }
  };
  
  const vsurname = value => {
      if (value.length < 2 || value.length > 30) {
        return (
          <div className="alert alert-danger" role="alert">
            Nazwisko musi zawierać od 2 do 30 znaków.
          </div>
        );
      }
    };

const vemail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);

    this.state = {
      login: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      repeatPassword: "",
      successful: false,
      message: ""
    };
  }

  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeSurname(e) {
    this.setState({
      surname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeRepeatPassword(e) {
    this.setState({
      repeatPassword: e.target.value
    });
  }


  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if(this.state.password !== this.state.repeatPassword) {
        this.setState({message : "Hasła różnią się od siebie."});
        return;
    }

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.login,
        this.state.email,
        this.state.name,
        this.state.surname,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Login</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="login"
                    value={this.state.login}
                    onChange={this.onChangeLogin}
                    validations={[required, vlogin]}
                  />
                </div>

                <div className="form-group">
                  <label >Imię</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                  <label >Nazwisko</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="surname"
                    value={this.state.surname}
                    onChange={this.onChangeSurname}
                    validations={[required, vsurname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, vemail]}
                  />
                </div>



                <div className="form-group">
                  <label htmlFor="password">Hasło</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Powtórz hasło</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.repeatPassword}
                    onChange={this.onChangeRepeatPassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
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
      </div>
      <Footer></Footer>
      </div>
    );
  }
}

export default RegisterForm;