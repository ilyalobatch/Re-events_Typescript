// Semantic UI components
import { Menu, Image, Dropdown } from "semantic-ui-react";

// Components
import LanguageSwitcher from "./LanguageSwitcher";

// library
import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// helpers
import { signOutFirebase } from "../../app/firestore/firebaseService";
import { WindowContext } from "../../app/context/WindowContext";
import { RootState } from "../../app/store/configureStore";

function SignedInMenu() {
  const { t } = useTranslation();
  const { currentUserProfile } = useSelector(
    (state: RootState) => state.profile
  );
  const history = useHistory();
  const { isDesktop } = useContext(WindowContext);

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUserProfile?.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top right" text={currentUserProfile?.displayName}>
        <Dropdown.Menu>
          {!isDesktop && (
            <Dropdown.Item
              as={Link}
              to="/events"
              icon="calendar alternate outline"
              text={t("navigation.item.events")}
            />
          )}
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            icon="plus"
            text={t("navigation.item.createEvent", {
              defaultValue: "Create Event",
            })}
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
            icon="user"
            text={t("navigation.item.profile", { defaultValue: "My Profile" })}
          />
          <Dropdown.Item
            as={Link}
            to="/account"
            icon="settings"
            text={t("navigation.item.account", { defaultValue: "My Account" })}
          />
          <Dropdown.Item
            icon="power"
            text={t("navigation.item.signOut", { defaultValue: "Sign out" })}
            onClick={handleSignOut}
          />
          {!isDesktop && (
            <Dropdown.Item>
              <i className="ui icon language"></i>
              <LanguageSwitcher inverted={false} />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
