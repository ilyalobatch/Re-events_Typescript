// Semantic UI components
import { Icon, Item, List, Segment, Button, Label } from "semantic-ui-react";

// Components
import EventListAttendee from "./EventListAttendee";

// library
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IEvent } from "../eventReducer";

interface IEventListItemProps {
  event: IEvent;
}

const EventListItem: React.VFC<IEventListItemProps> = ({ event }) => {
  const { t } = useTranslation();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>
                {t("event.hostedBy")}
                <Link
                  to={`/profile/${event.hostUid}`}
                >{` ${event.hostedBy}`}</Link>
              </Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon="right"
                  color="red"
                  content={t("event.cancelledLabel")}
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(event.date, "MMMM d, yyyy h:mm a")}
          <Icon name="marker" /> {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          floated="right"
          color="teal"
          content={t("event.button.view")}
          as={Link}
          to={`/events/${event.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
