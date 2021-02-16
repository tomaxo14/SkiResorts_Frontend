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
                <Link to="/" className="nav-brand"><h3>PolandSki</h3></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/osrodki" className="nav-link">Ośrodki</Link>
                        <Link to="/preferemcje" className="nav-link">Preferencje</Link>

                        {this.state.currentUser ? (
                        <Nav>
                        <Link to="/ulubione" className="nav-link">Twoje ulubione</Link>
                        <Link to="/oceny" className="nav-link">Twoje oceny</Link>
                        </Nav>
                        ):(
                            <span></span>
                        )
                        }
                        {this.state.admin ? (
                            <Link to="/admin" className="nav-link">Dodaj ośrodek</Link>
                        ) : (
                                <span></span>
                            )}
                    </Nav>
                    <Nav>
                    {this.state.currentUser ? (
                            <Nav>
                                <Navbar.Text href="#profil" id="login-text">Zalogowany: {this.state.currentUser.login}</Navbar.Text>
                                <NavDropdown title="Zarządzanie kontem" id="basic-nav-dropdown">
                                {/* <NavDropdown.Item href="/lokalizacja">Twoja lokalizacja</NavDropdown.Item> */}
                                <Link to="/lokalizacja" className="dropdown-item">Twoja lokalizacja</Link>
                                {/* <NavDropdown.Item href="/zmianaHasla">Zmiana hasła</NavDropdown.Item> */}
                                <Link to="/zmianaHasla" className="dropdown-item">Zmiana hasła</Link>
                        </NavDropdown>
                                {/* <Nav.Link href="/logowanie" onClick={this.logout}>Wyloguj</Nav.Link> */}
                                <Link to="/logowanie" onClick={this.logout} className="nav-link">Wyloguj</Link>

                            </Nav>
                        ) : (
                            <Nav>
                                <Link to="/logowanie" className="nav-link">Logowanie</Link>
                                <Link to="/rejestracja" className="nav-link">Rejestracja</Link>
                            </Nav>
                            )}
                        

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }


}

export default NavBar;