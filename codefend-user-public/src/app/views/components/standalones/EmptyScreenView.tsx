import React from "react";

import "../../shared/card.scss";

interface EmptyScreenProps {
  title?: string;
  info?: string;
  buttonText?: string;
  event?: () => void;
}

const EmptyScreenView: React.FC<EmptyScreenProps> = ({
  title,
  info,
  buttonText,
  event,
}) => {
  return (
    <div className="empty-screen">
      <div className="empty-card">
        <div className="empty-card-wrapper">
          <div className="header">
            <span className="first-text">{title}</span>
            <span className="second-text">{info}</span>
          </div>
          <div className="button">
            <button
              type="button"
              onClick={(e) => {
                event?.();
              }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyScreenView;
