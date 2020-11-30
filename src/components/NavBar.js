import React from 'react';
import { Navbar, Nav, NavDropdown, NavLink, Button } from 'react-bootstrap'
import AuthService from '../services/auth.service'
import '../styles/NavBar.css';


class NavBar extends React.Component {

    constructor(){
        super();
        this.state = {
            currentUser: undefined
        }
    }

    componentDidMount() {
        this.setState({currentUser: AuthService.getCurrentUser()})
    }

    logout() {
        AuthService.logout();
    }

    render() {

        return (

            <Navbar className="navbar" variant="dark" expand="lg" className="sticky-top">
                <Navbar.Brand href="/"><h3>PolandSki</h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/osrodki">Ośrodki</Nav.Link>
                        {/* <Nav.Link href="#link">Ranking</Nav.Link> */}
                        <Nav.Link href="/preferencje">Preferencje</Nav.Link>
                        <Nav.Link href="/ulubione">Twoje ulubione</Nav.Link>
                        <NavDropdown title="Zarządzanie kontem" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Zmiana hasła</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Usunięcie konta</NavDropdown.Item>
                        </NavDropdown>
                        {this.state.currentUser ? (
                            <Nav>
                            <Nav.Link href="#profil">{this.state.currentUser.login}</Nav.Link>
                            <Nav.Link href="/logowanie" onClick={this.logout}>Wyloguj</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav.Link href="/logowanie">Logowanie</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }


}

export default NavBar;