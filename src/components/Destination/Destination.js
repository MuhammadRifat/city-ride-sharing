import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './Destination.css';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { useParams } from 'react-router';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Destination = () => {
    const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };

    const {vehicle} = useParams();
    const [search, setSearch] = useState({
          pickFrom: '',
          pickTo: '',
          vehicle: vehicle
      });
    const handleBlur = (event) => {
        if(event.target.name === 'pickFrom' || event.target.name === 'pickTo'){
            const newSearch = {...search};
            newSearch[event.target.name] = event.target.value;
            setSearch(newSearch);
        }
    }

    const handleSearch = (event) => {


        event.preventDefault();
    }
    console.log(search);
    return (
        <Container>
            <Header/>
            <hr/>
            <Row className="mt-3">
                <Col md={4}>
                    <div className="search-location">
                        <form onSubmit={handleSearch}>
                            <label for="pickFrom">Pick From</label>
                            <input onBlur={handleBlur} type="text" id="pickFrom" name="pickFrom"/><br/>
                            <label for="pickTo">Pick To</label>
                            <input onBlur={handleBlur} type="text" id="pickTo" name="pickTo"/><br/>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </Col>
                <Col md={8}>
                <div className="google-maps">
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAud69-vjOh2MqwjFPxT7FEcky3PC6tcRA" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="Dhaka"
                    />
                    </GoogleMapReact>
                </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Destination;