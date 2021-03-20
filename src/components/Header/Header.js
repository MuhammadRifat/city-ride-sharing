import React, { useContext } from 'react';
import './Header.css';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/default-monochrome.svg';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const destinationVehicle = loggedInUser.vehicle || 'Bike';      // conditionally set vehicle
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="#">
            <img
                src={logo}
                width="200px"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
                
                <Link className="link" to="/home">Home </Link>
                <Link className="link" to={`/destination/${destinationVehicle}`}>Destination </Link>
                <Link className="link" to="/blog">Blog </Link>
                <Link className="link" to="/contact">Contact </Link>
                {
                    // For using conditionally shows login button or user name
                    loggedInUser.name ? <span className="link userName">{loggedInUser.name}</span> : <Link className="link" to="/login"><button className="btn-login">Login</button></Link>
                }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;