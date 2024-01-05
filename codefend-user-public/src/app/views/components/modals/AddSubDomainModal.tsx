import React, { useState } from "react";
import { GlobeWebIcon } from "../";
import { toast } from "react-toastify";
import "../../shared/modal.scss";
import { useAppSelector } from "src/app/data";

interface SubdomainModalP {
  onDone: () => void;
  webResources: any;
}

export const AddSubDomainModal: React.FC<SubdomainModalP> = (props) => {
  const [mainDomainId, setMainDomainId] = useState("");
  const [domainName, setDomainName] = useState("");
  const [ipAddress, setIpAddress] = useState(false);
  const [isAddingSubDomain, setIsAddingSubDomain] = useState(false);
  const userData  = useAppSelector((state) => state);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainDomainId || mainDomainId.length == 0) {
      return toast.error("Invalid main resource");
    }

    if (!domainName || domainName.length == 0 || domainName.length > 100) {
      return toast.error("Invalid domain");
    }

    setIsAddingSubDomain(true);

    const requestParams = {
      resource_domain_dad: mainDomainId,
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
        setIsAddingSubDomain(false);
      });
  };

  return (
    <div className="modal subdomain-modal">
      <form onClick={handleSubmit}>
        <div className="form-input-text">
          <span className="form-icon">
            <div className="codefend-text-red">
              <GlobeWebIcon />
            </div>
          </span>

          <select
            onChange={(e) => setMainDomainId(e.target.value)}
            value={mainDomainId}
            className="log-inputs modal_info"
            name=""
            id="select-subdomain-resources"
            required
          >
            <option value="" disabled>
              main resource
            </option>
            {props.webResources.map((resource: any) => (
              <option key={resource.id} value={resource.id}>
                {resource.resource_domain}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
