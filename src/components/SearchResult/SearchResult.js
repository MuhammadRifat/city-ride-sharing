import React from 'react';
import { useContext } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { userContext } from '../../App';
import GoogleMap from '../GoogleMap/GoogleMap';
import Header from '../Header/Header';
import vehicles from '../../vehicleData/vehicleData.json';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import './SearchResult.css';

const SearchResult = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {pickFrom, pickTo, vehicle} = loggedInUser;
    const [selectVehicle, setSelectVehicle] = useState({});
    useEffect( () => {
       const selectCar =  vehicles.find(vh => vh.name === vehicle);
       setSelectVehicle(selectCar);
    }, [])
    const {image, capacity, costPerKM} = selectVehicle;
    return (
        <Container>
            <Header/>
            <hr/>
            <Row className="mt-3">
                <Col md={4}>
                    <div className="search-result">
                    <Card body className="bg-success text-white card">
                        <h5>{pickFrom}</h5>
                        <h5>{pickTo}</h5>
                    </Card>
                    <Card body className="bg-white card">
                        <div className="d-flex justify-content-between">
                            <img style={{width:'60px', height:'40px'}} src={image} alt=""/>
                            <h6><FontAwesomeIcon icon={faUserFriends} /> {capacity}</h6>
                            <h6>${costPerKM}</h6>
                        </div>
                    </Card>
                    </div>
                </Col>
                <Col md={8}>
                <div className="google-maps">
                    <GoogleMap/>
                </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchResult;