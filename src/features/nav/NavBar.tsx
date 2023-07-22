// Semantic UI components
import { Menu, Container, Button } from "semantic-ui-react";

// Components
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import LanguageSwitcher from "./LanguageSwitcher";

// library
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// helpers
import { WindowContext } from "../../app/context/WindowContext";
import { RootState } from "../../app/store/configureStore";

function NavBar() {
  const { t } = useTranslation();
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const { isDesktop } = useContext(WindowContext);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" className="logo">
          <img src="/assets/logo.png" alt="Logo" />
          {t("common.appName")}
        </Menu.Item>
        {isDesktop && (
          <Menu.Item
            as={NavLink}
            exact
            to="/events"
            name={t("navigation.item.events")}
          />
        )}
        {authenticated && isDesktop && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button
              positive
              inverted
              content={t("navigation.item.createEvent")}
            />
          </Menu.Item>
        )}
        {isDesktop && (
          <Menu.Item position="right">
            <LanguageSwitcher inverted={true} />
          </Menu.Item>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}

export default NavBar;
