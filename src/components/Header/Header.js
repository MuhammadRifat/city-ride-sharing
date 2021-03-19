import React from 'react';
import './Header.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Nav className="justify-content-end">
            <Link className="link" to="/home">Home </Link>
            <Link className="link" to="/destination">Destination </Link>
            <Link className="link" to="/blog">Blog </Link>
            <Link className="link" to="/contact">Contact </Link>
        </Nav>
    );
};

export default Header;