import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authHeader from "../services/auth-header"
import NavBar from './NavBar';
import Footer from './Footer';
import {Button, Container, Row, Col} from 'react-bootstrap';
import '../styles/ChangePassword.css'

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                To pole jest wymagane !
            </div>
        )
    }
}

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Hasło musi zawierać od 6 do 40 znaków.
            </div>
        );
    }
};

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeRepeatedNewPassword = this.onChangeRepeatedNewPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.state = {
            loading: false,
            message: '',
            oldPassword: '',
            repeatedNewPassword: '',
            newPassword: '',
            alertStyle: "alert alert-danger"
        }
    }

    onChangeOldPassword(e) {
        this.setState({ oldPassword: e.target.value })
    }

    onChangeRepeatedNewPassword(e) {
        this.setState({ repeatedNewPassword: e.target.value })
    }

    onChangeNewPassword(e) {
        this.setState({ newPassword: e.target.value })
    }

    handleChangePassword(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        })

        this.form.validateAll();

        if (this.state.newPassword !== this.state.repeatedNewPassword) {
            this.setState({
                loading: false,
                message: "Podane hasła są różne"
            })

            return;
        }

        if (this.checkBtn.context._errors.length === 0) {

            const { oldPassword, newPassword, repeatedNewPassword } = this.state;

            let url = `http://localhost:8080/api/auth/changePassword?oldPassword=${oldPassword}&newPassword1=${newPassword}&newPassword2=${repeatedNewPassword}`;
            let options = {
                method: 'POST',
                headers: authHeader()
            };

            fetch(url, options)
                .then(
                    response => {
                        if (response.status === 400) {
                            this.setState({
                                alertStyle: "alert alert-danger"
                            })
                        } else {
                            this.setState({
                                alertStyle: "alert alert-success"
                            })
                        }
                        return response.json()
                    }
                ).then(response => this.setState({ message: response.message, loading: false }))
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {

        const { loading, message, oldPassword, repeatedNewPassword, newPassword } = this.state;

        return (
            <div>
                <NavBar></NavBar>
                <Container id="changePasswordForm">
                    <header className="text-center">
                        <h2>Zmiana hasła</h2>

                    </header>

                    <Form onSubmit={this.handleChangePassword} ref={c => this.form = c}>
                        <div class="form-group">
                            <label for="exampleInputOldPassword">Podaj swoje stare hasło</label>
                            <Input type="password" id="password-form" className="form-control" value={oldPassword} onChange={this.onChangeOldPassword} validations={[required]} id="exampleInputOldPassword" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputNewPassowrd">Podaj nowe hasło</label>
                            <Input type="password" id="password-form" className="form-control" value={newPassword} onChange={this.onChangeNewPassword} validations={[required, vpassword]} id="exampleInputNewPassowrd" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputRepeatedOldPassword">Powtórz swoje noew hasło</label>
                            <Input type="password" id="password-form" className="form-control" value={repeatedNewPassword} onChange={this.onChangeRepeatedNewPassword} validations={[required, vpassword]} id="exampleInputRepeatedOldPassword" />
                        </div>

                        <button
                            className="btn btn-block btn-dark"

                            id="password-button"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Zmień hasło</span>
                        </button>

                        {message && (
                            <div className="form-group">
                                <div className={this.state.alertStyle} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}


                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => { this.checkBtn = c; }}
                        />
                    </Form>

                </Container>
                <div id="password-footer">
                <Footer></Footer>
                </div>
            </div>
        );
    }

}

export default ChangePassword;


// import React from 'react';
// import NavBar from './NavBar';
// import Footer from './Footer';
// import Form from 'react-bootstrap/Form';
// import {Button, Container, Row, Col} from 'react-bootstrap';

// const required = value => {
//     if(!value) {
//       return(
//         <div className="alert alert-danger" role="alert">
//           To pole jest wymagane !
//         </div>
//       )
//     }
//   }

//   const vpassword = value => {
//     if (value.length < 6 || value.length > 40) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           Hasło musi zawierać od 6 do 40 znaków.
//         </div>
//       );
//     }
//   };

// class ChangePassword extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             oldPassword: "",
//             newPassword: "",
//             repeated: ""
//         }
//     }

//     onChangeOldPassword(e) {
//         this.setState({
//           oldPassword: e.target.value
//         });  
//     }

//     onChangeNewPassword(e) {
//         this.setState({
//           newPassword: e.target.value
//         });  
//     }

//     onChangeRepeated(e) {
//         this.setState({
//           repeated: e.target.value
//         });  
//     }

//     render() {
//         return (
//             <div>
//             <NavBar></NavBar>
//                 <Container>
//                     <h3>Zmień hasło</h3>

//                 <Form onSubmit={this.onSubmit}>

//                     <Form.Group>
//                         <Form.Label>Stare hasło</Form.Label>
//                         <Form.Control className="form-control-password" type="password" onChange={this.onChangeOldPassword}  />
//                     </Form.Group>

//                     <Form.Group>
//                         <Form.Label>Nowe hasło</Form.Label>
//                         <Form.Control className="form-control-password" type="password" onChange={this.onChangeNewPassword} />
//                     </Form.Group>

//                     <Form.Group>
//                         <Form.Label>Powtórz nowe hasło</Form.Label>
//                         <Form.Control className="form-control-password" type="password" onChange={this.onChangeRepeated}/>
//                     </Form.Group>

//                     <div id="change-button-div">
//                         <Button id="add-button" variant="primary" type="submit" >
//                         Zmień hasło
//                         </Button>
//                     </div>
//                 </Form>
//                 </Container>
//                 <Footer></Footer>
//             </div>
//         )
//     }
// }
// export default ChangePassword;