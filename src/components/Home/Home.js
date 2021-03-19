import React from 'react';
import Header from '../Header/Header';
import './Home.css';
import vehicleData from '../../vehicleData/vehicleData.json';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect( () => {
        setVehicles(vehicleData);
    }, [])
    return (
        <div className="home">
            <Container>
            <Header/>
                <Row className="mt-5 pt-5">
                    {
                        vehicles?.map(vehicle => <Vehicle vehicle={vehicle} key={vehicle.id}></Vehicle>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Home;