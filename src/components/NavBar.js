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
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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