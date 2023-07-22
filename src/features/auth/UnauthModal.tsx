// Semantic UI components
import { Button, Divider, Modal } from "semantic-ui-react";

// library
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// helpers
import { openModal } from "../../app/common/modals/modalReducer";
import { RootState, useAppDispatch } from "../../app/store/configureStore";

interface IUnauthModalProps {
  history?: any;
  setModalOpen?: any;
}

const UnauthModal: React.VFC<IUnauthModalProps> = ({
  history,
  setModalOpen,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { prevLocation } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return;
    }
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push("/events");
    }

    setOpen(false);
  };

  const handleOpenLoginModal = (modalType: string) => {
    dispatch(openModal({ modalType }));
    setOpen(false);
    setModalOpen(false);
  };

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content={t("modal.message.unauthorized")} />
      <Modal.Content>
        <p>{t("modal.message.loginOrRegister")}</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content={t("modal.button.login")}
            onClick={() => handleOpenLoginModal("LoginForm")}
          />
          <Button.Or />
          <Button
            fluid
            color="green"
            content={t("modal.button.register")}
            onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <p>{t("modal.message.continueAsGuest")}</p>
          <Button onClick={handleClose} content={t("form.button.cancel")} />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default UnauthModal;
