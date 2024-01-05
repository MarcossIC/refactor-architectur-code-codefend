import React, { useState } from "react";

import { GlobeWebIcon, ButtonLoader } from "../";
import { toast } from "react-toastify";
import "../../shared/modal.scss";

interface Props {
  onDone: () => void;
}

const AddDomainModal: React.FC<Props> = (props) => {
  const [domainName, setDomainName] = useState("");
  const [subdomainDetection, setSubdomainDetection] = useState(false);
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  //const user = useAppSelector((state)=>state);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingDomain(true);
    if (!domainName) return;

    if (!domainName || domainName.length == 0 || domainName.length > 100) {
      toast.error("Invalid domain");
      return setIsAddingDomain(false);
    }

    const requestParams = {
      resource_address_domain: domainName,
    };
    console.log({ requestParams });

    //Cambiar por llamada a la API real
    return Promise.resolve()
      .then(() => {
        setDomainName("");
        props.onDone();
        toast.success("Successfully Added Domain..");
      })
      .finally(() => {
        setIsAddingDomain(false);
      });
  };

  return (
    <div className="modal admin-modal text-format">
      <form onSubmit={handleSubmit}>
        <div className="form-input-text">
          <span className="form-icon">
            <div className="codefend-text-red">
              <GlobeWebIcon />
            </div>
          </span>

          <input
            type="text"
            className="log-inputs"
            placeholder="domain name"
            required
          />
        </div>

        <div className="form-input-checkbox ">
          <input
            type="checkbox"
            name="link-checkbox"
            id="link-checkbox"
            className="codefend-text-red checkbox-color"
            required
          />

          <label htmlFor="link-checkbox" className="modal_info">
            Automatic subdomain detection
          </label>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="log-inputs codefend_secondary_ac btn-cancel"
          >
            cancel
          </button>

          <button
            type="button"
            className="log-inputs codefend_main_ac btn-add bg-codefend"
          >
            {false && <ButtonLoader />}
            add web resource
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDomainModal;
