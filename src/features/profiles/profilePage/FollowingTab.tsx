// Semantic UI components
import { Card, Grid, Header, Tab } from "semantic-ui-react";

// Components
import ProfileCard from "./ProfileCard";

// library
import React, { useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// helpers
import {
  getFollowersCollection,
  getFollowingCollection,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToFollowers, listenToFollowings } from "../profileActions";
import { WindowContext } from "../../../app/context/WindowContext";
import { IUser } from "../profileReducer";
import { RootState, useAppDispatch } from "../../../app/store/configureStore";

interface IFollowingTabProps {
  profile: IUser;
  activeTab: number;
}

const FollowingTab: React.VFC<IFollowingTabProps> = ({
  profile,
  activeTab,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { followers, followings } = useSelector(
    (state: RootState) => state.profile
  );
  const { isTablet, isMobile } = useContext(WindowContext);

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
    query:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: (data: IUser) =>
      activeTab === 3
        ? dispatch(listenToFollowers(data))
        : dispatch(listenToFollowings(data)),
    deps: [dispatch, activeTab],
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 3
                ? t("profile.panes.followers.label")
                : t("profile.panes.following.label")
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={cardsPerRow}>
            {activeTab === 3 &&
              followers?.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
            {activeTab === 4 &&
              followings?.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default FollowingTab;
