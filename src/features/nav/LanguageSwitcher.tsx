// Semantic UI components
import { Button } from "semantic-ui-react";

// library
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// helpers
import { switchLanguage } from "../auth/authActions";
import { RootState, useAppDispatch } from "../../app/store/configureStore";

interface ILanguageSwitcherProps {
  inverted?: boolean;
}

const LanguageSwitcher: React.VFC<ILanguageSwitcherProps> = ({
  inverted = true,
}) => {
  const { i18n } = useTranslation();
  const { lang } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  function handleSwitchLanguage(e: any) {
    if (!e.target.value) return;
    dispatch(switchLanguage(e.target.value));
    i18n.changeLanguage(e.target.value);
  }

  return (
    <Button.Group
      className="lang-switcher"
      basic
      compact
      inverted={inverted}
      size="small"
      color="olive"
    >
      <Button
        className={lang === "en" ? "active" : ""}
        content={"EN"}
        value="en"
        onClick={handleSwitchLanguage}
      />
      <Button
        className={lang === "ua" ? "active" : ""}
        content={"UA"}
        value="ua"
        onClick={handleSwitchLanguage}
      />
    </Button.Group>
  );
};

export default LanguageSwitcher;
