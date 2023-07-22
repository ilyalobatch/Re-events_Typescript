// Semantic UI components
import { Segment, Grid, Icon, Button } from "semantic-ui-react";

// Components
import EventDetailedMap from "./EventDetailedMap";

// library
import React, { useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { IEvent } from "../eventReducer";

interface IEventDetailedInfoProps {
  event: IEvent | null;
}

const EventDetailedInfo: React.VFC<IEventDetailedInfoProps> = ({ event }) => {
  const { t } = useTranslation();
  const [mapOpen, setMapOpen] = useState(false);

  return event && (
    <Segment.Group className="eventInfo">
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event.date, "MMMM d, yyyy h:mm a")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color="teal"
              size="tiny"
              content={
                mapOpen ? t("event.button.hideMap") : t("event.button.showMap")
              }
              onClick={() => setMapOpen(!mapOpen)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {mapOpen && <EventDetailedMap latLng={event.venue.latLng} />}
    </Segment.Group>
  );
};

export default EventDetailedInfo;
