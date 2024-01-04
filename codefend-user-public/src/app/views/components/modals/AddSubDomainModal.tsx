import React from "react";
import { GlobeWebIcon } from "../";
import { toast } from "react-toastify";
import "../../shared/modal.scss";

interface Props {}

type String = string | undefined;

export const AddSubDomainModal: React.FC<Props> = (props) => {
  return (
    <div className="modal subdomain-modal">
      <form>
        <div className="form-input-text">
          <span className="form-icon">
            <div className="codefend-text-red">
              <GlobeWebIcon />
            </div>
          </span>

          <input type="text" placeholder="main resource" />
        </div>
      </form>
    </div>
  );
};
