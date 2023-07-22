// Components
import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";

// library
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

function ModalManager() {
  const modalLookup = {
    LoginForm,
    RegisterForm,
  };
  const currentModal = useSelector((state: RootState) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType /*modalProps*/ } = currentModal;
    const ModalComponent = modalLookup[modalType] as React.ElementType;
    renderedModal = <ModalComponent /*{...modalProps}*/ />;
  }

  return <span>{renderedModal}</span>;
}

export default ModalManager;
