// Semantic UI components
import { Button } from "semantic-ui-react";

// library
import React from "react";
import { useTranslation } from "react-i18next";

// helpers
import { closeModal } from "../../app/common/modals/modalReducer";
import { socialLogin } from "../../app/firestore/firebaseService";
import { useAppDispatch } from "../../app/store/configureStore";

function SocialLogin() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSocialLogin = (provider: string) => {
    dispatch(closeModal());
    socialLogin(provider);
  };

  return (
    <>
      <Button
        fluid
        icon="facebook"
        color="facebook"
        style={{ marginBottom: 10 }}
        content={t("modal.social.facebookLogin")}
        onClick={() => handleSocialLogin("facebook")}
      />
      <Button
        fluid
        icon="google"
        color="google plus"
        content={t("modal.social.googleLogin")}
        onClick={() => handleSocialLogin("google")}
      />
    </>
  );
}

export default SocialLogin;
