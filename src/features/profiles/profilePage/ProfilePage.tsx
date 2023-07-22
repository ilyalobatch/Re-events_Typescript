// Semantic UI components
import { Grid } from "semantic-ui-react";

// Components
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// library
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// helpers
import { getUserProfile } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToSelectedUserProfile } from "../profileActions";
import { RootState, useAppDispatch } from "../../../app/store/configureStore";
import { IUser } from "../profileReducer";

interface IProfilePageProps {
  match: any;
}

const ProfilePage: React.VFC<IProfilePageProps> = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state: RootState) => state.profile
  );
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { loading, error } = useSelector((state: RootState) => state.async);
  let profile;

  if (match.params.id === currentUser?.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile: IUser) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser?.id,
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content={t("profile.loading")} />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile}
          isCurrentUser={currentUser?.uid === profile?.id}
        />
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser?.uid === profile?.id}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ProfilePage;
