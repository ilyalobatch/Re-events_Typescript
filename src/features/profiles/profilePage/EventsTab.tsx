// Semantic UI components
import { Card, Grid, Header, Image, Tab } from "semantic-ui-react";

// library
import React, { useState, useContext, useMemo } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// helpers
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { getUserEventsQuery } from "../../../app/firestore/firestoreService";
import { listenToUserEvents } from "../profileActions";
import { WindowContext } from "../../../app/context/WindowContext";
import { IProfileEvents, IUser } from "../profileReducer";
import { RootState, useAppDispatch } from "../../../app/store/configureStore";

interface IEventsTabProps {
  profile: IUser;
}

const EventsTab: React.VFC<IEventsTabProps> = ({ profile }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isTablet, isMobile } = useContext(WindowContext);

  const [activeTab, setActiveTab] = useState(0);

  const { profileEvents } = useSelector((state: RootState) => state.profile);
  const { loading } = useSelector((state: RootState) => state.async);

  const panes = [
    {
      menuItem: t("profile.panes.events.future", {
        defaultValue: "Future Events",
      }),
      pane: { key: "future" },
    },
    {
      menuItem: t("profile.panes.events.past", { defaultValue: "Past Events" }),
      pane: { key: "past" },
    },
    {
      menuItem: t("profile.panes.events.hosting", { defaultValue: "Hosting" }),
      pane: { key: "hosting" },
    },
  ];

  const cardsPerRow = useMemo(() => {
    switch (true) {
      case isTablet:
        return 3;
      case isMobile:
        return 2;
      default:
        return 5;
    }
  }, [isTablet, isMobile]);

  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, profile.id),
    data: (events: IProfileEvents[]) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id],
  });

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="calendar"
            content={t("profile.panes.events.label")}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(e, data) =>
              setActiveTab(
                typeof data.activeIndex === "number" ? data.activeIndex : 0
              )
            }
            panes={panes}
            menu={{
              secondary: true,
              pointing: true,
              style: { overflowX: "auto", paddingBottom: "2px" },
            }}
          />
          <Card.Group itemsPerRow={cardsPerRow} style={{ marginTop: 10 }}>
            {profileEvents?.map((event) => (
              <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                <Image
                  src={`/assets/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign="center" />
                  <Card.Meta>
                    <div>{format(event.date, "dd MMM yyyy")}</div>
                    <div>{format(event.date, "HH:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default EventsTab;
