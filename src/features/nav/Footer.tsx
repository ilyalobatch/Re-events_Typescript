// Semantic UI components
import { Container, Menu } from "semantic-ui-react";

// library
import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <Menu className="footer" inverted>
      <Container>
        <p>
          {t("footer.copyright", {
            year: new Date().getFullYear(),
          })}
        </p>
      </Container>
    </Menu>
  );
}

export default Footer;
