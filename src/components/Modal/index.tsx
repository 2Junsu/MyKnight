import React from "react";
import ModalComponent from "react-modal";
ModalComponent.setAppElement("#root");

interface ModalProps {
  children: React.ReactNode;
  width: number;
  isOpen: boolean;
  closeModal: () => void;
  className?: ModalComponent.Classes;
}

const Modal = (props: ModalProps) => {
  const { children, width, isOpen, closeModal, className } = props;

  return (
    <ModalComponent
      id="modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={className}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
        },
        content: {
          padding: 0,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: width + "px",
          height: "fit-content",
          maxWidth: 500,
          maxHeight: "calc(100vh - 150px)",
          overflow: "auto",
          border: "none",
          borderRadius: 12,
          backgroundColor: "white",
        },
      }}
    >
      {children}
    </ModalComponent>
  );
};

export default Modal;
