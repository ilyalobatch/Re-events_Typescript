// Semantic UI components
import { Grid } from "semantic-ui-react";

// Components
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// library
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

// helpers
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToSelectedEvent } from "../eventActions";
import { RootState, useAppDispatch } from "../../../app/store/configureStore";
import { IAttendee, IEvent } from "../eventReducer";

interface IEventDetailedPageProps {
  match: any;
}

const EventDetailedPage: React.VFC<IEventDetailedPageProps> = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const event = useSelector((state: RootState) => state.event.selectedEvent);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading, error } = useSelector((state: RootState) => state.async);

  const isHost = event?.hostUid === currentUser?.uid;
  const isGoing = event?.attendees?.some(
    (attendee: IAttendee) => attendee.id === currentUser?.uid
  ) || false;

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event: IEvent) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) {
    return <LoadingComponent content={t("event.loading")} />;
  }

  if (error) {
    return <Redirect to="/error" />;
  }

  return (
    event && (
      <Grid className="eventDetailView stackable">
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat eventId={event.id} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSideBar
            attendees={event.attendees}
            hostUid={event.hostUid}
          />
        </Grid.Column>
      </Grid>
    )
  );
};

export default EventDetailedPage;
