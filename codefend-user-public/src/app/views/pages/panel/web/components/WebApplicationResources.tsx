import React, { useState } from "react";
import { ModalWrapper } from "../../../../components";
interface WebResourcesProps {}

export const WebApplicationResources: React.FC<WebResourcesProps> = () => {
  const [selectedId, setSelectedId] = useState(0);
  const { showModal, showModalStr } = { showModal: false, showModalStr: "" };

  return (
    <>
      {showModal && showModalStr === "add_domain" ? (
        <>
          <ModalWrapper>
            <div className="add-domain-modal  internal-tables disable-border">
              <div className="modal-header">
                <div className="icon text-fend-red">
                  ** HiOutlineBars3BottomLeft **
                </div>
                <span>Add web resource</span>
              </div>
            </div>
          </ModalWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
