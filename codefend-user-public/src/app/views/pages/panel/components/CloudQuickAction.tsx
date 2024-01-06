import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "src/app/data";

import { ButtonLoader, GlobeWebIcon } from "src/app/views/components";
import "../../../shared/forms.scss";

interface CloudQuickActionProps {
  onDone: () => void;
}

export const CloudQuickAction: React.FC<CloudQuickActionProps> = (props) => {
  const userData = useAppSelector((state) => state.authReducer.userData);
  const [domainName, setDomainName] = useState("");
  const [isAddingDomain, setIsAddingDomain] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      setIsAddingDomain(true);
      if (domainName) return;

      if (!domainName || domainName.length === 0 || domainName.length > 100) {
        toast.error("Invalaid domain");
        return setIsAddingDomain(false);
      }

      const requestParams = {
        company_id: userData?.companyID,
        resource_address_domain: domainName,
      };

      Promise.resolve()
        .then(() => {
          setDomainName("");
          props.onDone();
          toast.success("Successfully Added Domain...");
        })
        .finally(() => {
          setIsAddingDomain(false);
        });
    },
    [domainName, userData]
  );

  return (
    <>
      <div className="cloud-quick-actions text-format">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span>
              <div className="icon codefend-text-red">
                <GlobeWebIcon />
              </div>
            </span>

            <input
              className="log-inputs"
              type="text"
              onChange={(e) => setDomainName(e.target.value)}
              id="quick-domain-name"
              placeholder="action"
              required
            />
          </div>

          <div className="button-group">
            <button
              disabled={isAddingDomain}
              type="button"
              onClick={() => {
                /* showModal */
              }}
              className="log-inputs cancel-btn codefend_secondary_ac"
            >
              cancel
            </button>

            <button
              disabled={isAddingDomain}
              type="button"
              className="log-inputs add-btn bg-codefend codefend_main_ac"
            >
              {isAddingDomain && <ButtonLoader />}
              add action
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
