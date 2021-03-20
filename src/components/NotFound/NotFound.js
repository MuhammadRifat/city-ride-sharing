import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header';

const NotFound = () => {
    return (
        <Container>
            <Header/>
            <hr/>
            <h2 style={{textAlign: 'center'}}>404! Page Not Found</h2>
        </Container>
    );
};

export default NotFound;