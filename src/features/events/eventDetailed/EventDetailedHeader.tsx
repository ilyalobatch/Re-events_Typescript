// Semantic UI components
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";

// Components
import UnauthModal from "../../auth/UnauthModal";

// library
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// helpers
import {
  addUserAttendance,
  cancelUserAttendance,
} from "../../../app/firestore/firestoreService";
import { IEvent } from "../eventReducer";
import { RootState } from "../../../app/store/configureStore";

interface IEventDetailedHeaderProps {
  event: IEvent;
  isHost: boolean;
  isGoing: boolean;
}

const EventDetailedHeader: React.VFC<IEventDetailedHeaderProps> = ({
  event,
  isHost,
  isGoing,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { authenticated } = useSelector((state: RootState) => state.auth);

  const handleUserJoinEvent = async () => {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserLeaveEvent = async () => {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group className="eventHeader">
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid />
          <Segment basic className="imageText">
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
                  <p>
                    {t("event.hostedBy")}
                    <strong>
                      <Link to={`/profile/${event.hostUid}`}>
                        {` ${event.hostedBy}`}
                      </Link>
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom" clearing>
          {!isHost && (
            <>
              {isGoing ? (
                <Button
                  loading={loading}
                  onClick={handleUserLeaveEvent}
                  content={t("event.button.leaveEvent")}
                />
              ) : (
                <Button
                  onClick={
                    authenticated
                      ? handleUserJoinEvent
                      : () => setModalOpen(true)
                  }
                  loading={loading}
                  color="teal"
                  content={t("event.button.joinEvent")}
                />
              )}
            </>
          )}

          {isHost && (
            <Button
              color="orange"
              floated="right"
              as={Link}
              to={`/manage/${event.id}`}
              content={t("event.button.manageEvent")}
            />
          )}
        </Segment>
      </Segment.Group>
    </>
  );
};

export default EventDetailedHeader;
