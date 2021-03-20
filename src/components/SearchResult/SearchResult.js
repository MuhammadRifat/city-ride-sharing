import React from 'react';
import { useContext } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { userContext } from '../../App';
import GoogleMap from '../GoogleMap/GoogleMap';
import Header from '../Header/Header';
import vehicles from '../../vehicleData/vehicleData.json';
import { useEffect } from 'react';
import { useState } from 'react';
import './SearchResult.css';
import VehicleDetail from '../VehicleDetail/VehicleDetail';

const SearchResult = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {pickFrom, pickTo, vehicle} = loggedInUser;
    const [selectVehicle, setSelectVehicle] = useState({});
    useEffect( () => {
       const selectCar =  vehicles.find(vh => vh.name === vehicle);
       setSelectVehicle(selectCar);
    }, [])
    const image = selectVehicle.image;
    const capacity = selectVehicle.capacity;
    return (
        <Container>
            <Header/>
            <hr/>
            <Row className="mt-3">
                <Col md={4}>
                    <div className="search-result">
                    <Card body className="bg-success text-white card">
                        <div className="vertical-line">
                            <h5><li>{pickFrom}</li></h5>
                            <h5 className="mt-4"><li>{pickTo}</li></h5>
                        </div>
                    </Card>
                    {
                        selectVehicle?.available?.map(quality => <VehicleDetail quality={quality} image={image} capacity={capacity}></VehicleDetail>)
                    }
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