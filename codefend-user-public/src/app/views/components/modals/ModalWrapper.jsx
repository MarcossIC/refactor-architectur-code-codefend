import React from "react";
import "../../shared/modal.scss";

const ModalWrapper = ({ isErrorBox, children }) => {
  const {
    setShowModal,
  } = (val) => {
    console.log(val);
  };

  return (
    <div
      onClick={(e) => {
        if (!isErrorBox && e.currentTarget === e.target) setShowModal(false);
      }}
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20 z-20 py-10"
    >
      <div className={`wrapper-content   ${!isErrorBox ? "max-w" : ""}`}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
