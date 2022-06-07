import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '94.5%',
  height: '17%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  // apiKey: 'AIzaSyD05rQaUDeF8CY3x4aq5mMNm3hH34GiiV4'
  apiKey: 'AIzaSyDxBqw5XPORNQafOy0MgjsKkbMh1VFc4jY'
})(MapContainer);
