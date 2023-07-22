// Semantic UI components
import { List, Image } from "semantic-ui-react";

// library
import React from "react";
import { Link } from "react-router-dom";
import { IAttendee } from "../eventReducer";

interface IEventListAttendeeProps {
  attendee: IAttendee;
}

const EventListAttendee: React.VFC<IEventListAttendeeProps> = ({
  attendee,
}) => {
  return (
    <List.Item as={Link} to={`/profile/${attendee.id}`}>
      <Image size="mini" circular src={attendee.photoURL} />
    </List.Item>
  );
};

export default EventListAttendee;
