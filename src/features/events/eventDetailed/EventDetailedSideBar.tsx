// Semantic UI components
import { Segment, Item, Label } from "semantic-ui-react";

// library
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IAttendee } from "../eventReducer";

interface IEventDetailedSideBarProps {
  attendees: IAttendee[];
  hostUid: string;
}

const EventDetailedSideBar: React.VFC<IEventDetailedSideBarProps> = ({
  attendees,
  hostUid,
}) => {
  const { t } = useTranslation();

  return (
    <Segment.Group className="eventSidebar">
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {t("event.message.attendeeGoing", {
          count: attendees.length,
          defaultValue: "{{count}} Person Going",
        })}
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) => (
            <Item
              as={Link}
              to={`/profile/${attendee.id}`}
              key={attendee.id}
              style={{ position: "relative" }}
            >
              {hostUid === attendee.id && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                  content="Host"
                />
              )}
              <Item.Image
                size="tiny"
                src={attendee.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedSideBar;
