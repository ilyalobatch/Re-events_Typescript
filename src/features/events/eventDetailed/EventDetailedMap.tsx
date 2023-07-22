// Semantic UI components
import { Segment, Icon } from "semantic-ui-react";

// library
import React from "react";
import GoogleMapReact from "google-map-react";
import { ILatLng } from "../eventReducer";

function Marker({ lat, lng }) {
  return <Icon name="marker" size="big" color="red" />;
}

interface IEventDetailedMapProps {
  latLng: ILatLng;
}

const EventDetailedMap: React.VFC<IEventDetailedMapProps> = ({ latLng }) => {
  const zoom = 14;

  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: 300, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY || "" }}
          center={latLng}
          zoom={zoom}
        >
          <Marker lat={latLng.lat} lng={latLng.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
