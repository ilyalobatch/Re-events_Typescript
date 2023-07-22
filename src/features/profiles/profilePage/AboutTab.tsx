// Semantic UI components
import { Button, Grid, Header, Tab } from "semantic-ui-react";

// Components
import ProfileForm from "./ProfileForm";

// library
import React, { useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { IUser } from "../profileReducer";

interface IAboutTabProps {
  profile: IUser;
  isCurrentUser: boolean;
}

const AboutTab: React.VFC<IAboutTabProps> = ({ profile, isCurrentUser }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`${t("profile.panes.about.label")} ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={
                editMode
                  ? t("profile.panes.about.cancelEdit")
                  : t("profile.panes.about.edit")
              }
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  {t("profile.panes.about.memberSince")}{" "}
                  {format(profile.createdAt, "dd MMM yyyy")}
                </strong>
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default AboutTab;
