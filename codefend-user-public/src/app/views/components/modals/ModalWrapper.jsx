import React from "react";

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
      <div
        className={`max-h-full  ${
          !isErrorBox ? "max-w-xl" : ""
        } overflow-y-auto `}
      >
        <div className="w-full ">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
