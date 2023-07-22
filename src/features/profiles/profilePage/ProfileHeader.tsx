// Semantic UI components
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";

// library
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// helpers
import {
  followUser,
  getFollowingDoc,
  unfollowUser,
} from "../../../app/firestore/firestoreService";

import { IUser } from "../profileReducer";
import { RootState, useAppDispatch } from "../../../app/store/configureStore";
import { CLEAR_FOLLOWINGS } from "../profileContansts";
import { setFollowUser, setUnfollowUser } from "../profileActions";

interface IProfileHeaderProps {
  profile: IUser;
  isCurrentUser: boolean;
}

const ProfileHeader: React.VFC<IProfileHeaderProps> = ({
  profile,
  isCurrentUser,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { followingUser } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (isCurrentUser) {
      return;
    }
    setLoading(true);

    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchFollowingDoc().then(() => setLoading(false));

    return () => {
      dispatch({ type: CLEAR_FOLLOWINGS });
    };
  }, [dispatch, profile.id, isCurrentUser]);

  async function handleFollowUser() {
    setLoading(true);

    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUnfollowUser() {
    setLoading(true);

    try {
      await unfollowUser(profile);
      dispatch(setUnfollowUser());
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid stackable>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ marginBottom: 10, display: "block" }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4} verticalAlign="middle">
          <Statistic.Group size="small" widths={2}>
            <Statistic
              label={t("profile.stats.followers", {
                defaultValue: "Followers",
              })}
              value={profile.followerCount || 0}
            />
            <Statistic
              label={t("profile.stats.following", {
                defaultValue: "Following",
              })}
              value={profile.followingCount || 0}
            />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color="teal"
                    content={
                      followingUser
                        ? t("profile.button.following", {
                            defaultValue: "Following",
                          })
                        : t("profile.button.notFollowing", {
                            defaultValue: "Not following",
                          })
                    }
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    loading={loading}
                    onClick={() =>
                      followingUser ? handleUnfollowUser() : handleFollowUser()
                    }
                    fluid
                    color={followingUser ? "red" : "green"}
                    content={
                      followingUser
                        ? t("profile.button.unfollow", {
                            defaultValue: "Unfollow",
                          })
                        : t("profile.button.follow", { defaultValue: "Follow" })
                    }
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ProfileHeader;
