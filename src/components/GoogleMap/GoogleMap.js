import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = () => {
    const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };
    return (
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
    );
};

export default GoogleMap;