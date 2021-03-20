import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

const VehicleDetail = (props) => {
    const {costPerKM} = props.quality;
    return (
        <Card body className="bg-white card">
            <div className="d-flex justify-content-between">
                <img style={{ width: '60px', height: '40px' }} src={props.image} alt="" />
                <h6><FontAwesomeIcon icon={faUserFriends} /> {props.capacity}</h6>
                <h6>${costPerKM}</h6>
            </div>
        </Card>
    );
};

export default VehicleDetail;