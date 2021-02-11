import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { Link } from "react-router-dom";
import AuthService from '../services/auth.service'
import '../styles/NavBar.css';


class NavBar extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: undefined,
            userRoles: [],
            admin: false
        }
        this.ifAdmin = this.ifAdmin.bind(this);
    }

    componentDidMount() {
        this.setState({ currentUser: AuthService.getCurrentUser() }, function () {
            console.log(this.state.currentUser);
            if(this.state.currentUser !== undefined && this.state.currentUser !== null) {
                this.setState({ userRoles: this.state.currentUser.roles },
                function () {
                    if (this.ifAdmin()===true) {
                        this.setState({ admin: true });
                    }
                })
            }
        })

    }

    ifAdmin() {
        var i;
        for (i = 0; i < this.state.userRoles.length; i++) {
            if (this.state.userRoles[i] === "ROLE_ADMIN") {
                return true;
            }
        }
        return false;
    }

    logout() {
        AuthService.logout();
    }

    render() {

        return (

            <Navbar id="navbar" variant="dark" expand="lg" className="sticky-top">
                <Navbar.Brand href="/"><h3>PolandSki</h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/osrodki">Ośrodki</Nav.Link>
                        <Nav.Link href="/preferencje">Preferencje</Nav.Link>

                        {this.state.currentUser ? (
                        <Nav>
                        <Nav.Link href="/ulubione">Twoje ulubione</Nav.Link>
                        <Nav.Link href="/oceny">Twoje oceny</Nav.Link>
                        </Nav>
                        ):(
                            <span></span>
                        )
                        }
                        {this.state.admin ? (
                            <Nav.Link href="/admin">Dodaj ośrodek</Nav.Link>
                        ) : (
                                <span></span>
                            )}
                    </Nav>
                    <Nav>
                    {this.state.currentUser ? (
                            <Nav>
                                <Navbar.Text href="#profil" id="login-text">Zalogowany: {this.state.currentUser.login}</Navbar.Text>
                                <NavDropdown title="Zarządzanie kontem" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/lokalizacja">Twoja lokalizacja</NavDropdown.Item>
                                <NavDropdown.Item href="/zmianaHasla">Zmiana hasła</NavDropdown.Item>
                        </NavDropdown>
                                <Nav.Link href="/logowanie" onClick={this.logout}>Wyloguj</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Nav.Link href="/logowanie">Logowanie</Nav.Link>
                                <Nav.Link href="/rejestracja">Rejestracja</Nav.Link>
                            </Nav>
                            )}
                        

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }


}

export default NavBar;