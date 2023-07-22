// Semantic UI components
import {
  Segment,
  Container,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

// Components
import LanguageSwitcher from "../nav/LanguageSwitcher";

// library
import React from "react";
import { useTranslation } from "react-i18next";

interface IHomePageProps {
  history: any;
}

const HomePage: React.VFC<IHomePageProps> = ({ history }) => {
  const { t } = useTranslation();

  return (
    <Segment inverted textAlign="center" vertical className="homepage">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            style={{ marginBottom: 12 }}
          />
          {t("common.appName", { defaultValue: "React Events" })}
        </Header>
        <Button inverted size="huge" onClick={() => history.push("/events")}>
          {t("common.getStarted", { defaultValue: "Get Started" })}
          <Icon name="arrow right" inverted />
        </Button>
        <div className="lang-switcher-wrapper">
          <LanguageSwitcher />
        </div>
      </Container>
    </Segment>
  );
};

export default HomePage;
