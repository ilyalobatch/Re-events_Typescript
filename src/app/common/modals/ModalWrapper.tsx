// Semantic UI components
import { Modal } from "semantic-ui-react";

// library
import React from "react";

// helpers
import { closeModal } from "./modalReducer";
import { useAppDispatch } from "../../store/configureStore";

interface IModalWrapperProps {
  children: string | JSX.Element | JSX.Element[];
  size?: "mini" | "tiny" | "small" | "large" | "fullscreen";
  header: string;
}

const ModalWrapper: React.VFC<IModalWrapperProps> = ({
  children,
  size,
  header,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default ModalWrapper;
