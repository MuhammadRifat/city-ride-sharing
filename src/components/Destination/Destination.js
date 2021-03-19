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
          vehicle: vehicle
      });
    const handleBlur = (event) => {
        if(event.target.name === 'pickFrom' || event.target.name === 'pickTo'){
            const newSearch = {...search};
            newSearch[event.target.name] = event.target.value;
            setSearch(newSearch);
        }
    }

    const history = useHistory();
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
                        <form>
                            <label for="pickFrom">Pick From</label>
                            <input onBlur={handleBlur} type="text" id="pickFrom" name="pickFrom" required/><br/>
                            <label for="pickTo">Pick To</label>
                            <input onBlur={handleBlur} type="text" id="pickTo" name="pickTo" required/><br/>
                            <button onClick={handleSearch}>Search</button>
                        </form>
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

export default Destination;