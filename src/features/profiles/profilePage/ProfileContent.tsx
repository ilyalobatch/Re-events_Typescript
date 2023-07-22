// Semantic UI components
import { Tab, TabProps } from "semantic-ui-react";

// Components
import AboutTab from "./AboutTab";
import EventsTab from "./EventsTab";
import FollowingTab from "./FollowingTab";
import PhotosTab from "./PhotosTab";

// library
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

// helpers
import { WindowContext } from "../../../app/context/WindowContext";
import { IUser } from "../profileReducer";

interface IProfileContentProps {
  profile: IUser;
  isCurrentUser: boolean;
}

const ProfileContent: React.VFC<IProfileContentProps> = ({
  profile,
  isCurrentUser,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const { isMobile } = useContext(WindowContext);

  const panes = [
    {
      menuItem: t("profile.panes.about.label", { defaultValue: "About" }),
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: t("profile.panes.photos.label", { defaultValue: "Photos" }),
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: t("profile.panes.events.label", { defaultValue: "Events" }),
      render: () => <EventsTab profile={profile} />,
    },
    {
      menuItem: t("profile.panes.followers.label", {
        defaultValue: "Followers",
      }),
      render: () => (
        <FollowingTab
          profile={profile}
          key={profile.id}
          activeTab={activeTab}
        />
      ),
    },
    {
      menuItem: t("profile.panes.following.label", {
        defaultValue: "Following",
      }),
      render: () => (
        <FollowingTab
          profile={profile}
          key={profile.id}
          activeTab={activeTab}
        />
      ),
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: !isMobile, style: { overflowX: "auto" } }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data: TabProps) => {
        setActiveTab(
          typeof data.activeIndex === "number" ? data.activeIndex : 0
        );
      }}
      activeIndex={activeTab}
    />
  );
};

export default ProfileContent;
