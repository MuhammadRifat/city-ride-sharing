import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './Destination.css';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import GoogleMap from '../GoogleMap/GoogleMap';
import { useContext } from 'react';
import { userContext } from '../../App';
import { Link } from 'react-router-dom';

const Destination = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {vehicle} = useParams();
    const [search, setSearch] = useState({
          pickFrom: '',
          pickTo: '',
          date: '',
          time: '',
          vehicle: vehicle
      });
    // For accessing data from input field.
    const handleBlur = (event) => {
        if(event.target.name === 'pickFrom' || event.target.name === 'pickTo' || event.target.name === 'date' || event.target.name === 'time'){
            const newSearch = {...search};
            newSearch[event.target.name] = event.target.value;
            setSearch(newSearch);
        }
    }

    const history = useHistory();
    // For searching destination
    const handleSearch = (event) => {
        const newData = {...loggedInUser};
        newData.pickFrom = search.pickFrom;
        newData.pickTo = search.pickTo;
        newData.vehicle = search.vehicle;
        setLoggedInUser(newData);
        history.push("/search-result");

        event.preventDefault();
    }
    return (
        <Container>
            <Header/>
            <hr/>
            <Row className="mt-3">
                <Col md={4}>
                    <div className="search-location">
                        <form onSubmit={handleSearch}>
                            <label for="pickFrom">Pick From</label>
                            <input onBlur={handleBlur} type="text" id="pickFrom" name="pickFrom" required/><br/>
                            <label for="pickTo">Pick To</label>
                            <input onBlur={handleBlur} type="text" id="pickTo" name="pickTo" required/><br/>
                            <label for="date">Date</label>
                            <input onBlur={handleBlur} type="date" id="date" name="date" required/><br/>
                            <label for="time">Time</label>
                            <input onBlur={handleBlur} type="time" id="time" name="time" required/><br/>
                            <button>Search</button>
                        </form>
                    </div>
                </Col>
                <Col md={8}>
                <div className="google-maps">
                    {/* For google map */}
                    <GoogleMap/>    
                </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Destination;