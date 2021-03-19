import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Vehicle.css';

const Vehicle = (props) => {
    console.log(props.vehicle);
    const {name, image} = props.vehicle;
    return (
        <Col md={3} className="mt-3">
            <Link to={`/destination/${name}`}> <div className="vehicle">
                <img src={image} alt=""/>
                <h5>{name.toUpperCase()}</h5>
            </div></Link>
        </Col>
    );
};

export default Vehicle;