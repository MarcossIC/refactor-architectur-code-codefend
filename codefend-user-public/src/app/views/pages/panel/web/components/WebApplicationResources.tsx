import React, { ReactNode, useState } from "react";
import { ModalWrapper, AddDomainModal } from "../../../../components";

interface WebResourceModalWrapper {
  children: ReactNode;
  headerTitle: string;
  isActive: boolean;
}

const WebResourceModalWrapper: React.FC<WebResourceModalWrapper> = ({
  children,
  headerTitle,
  isActive,
}) => {
  return (
    <>
      {isActive ?? (
        <>
          <ModalWrapper>
            <div className="web-modal-wrapper internal-tables disable-border">
              <div className="modal-header">
                <div className="icon text-fend-red">
                  ** HiOutlineBars3BottomLeft **
                </div>
                <span>{headerTitle}</span>
              </div>
              {children}
              <div className="modal-helper-box text-format"></div>
            </div>
          </ModalWrapper>
        </>
      )}
    </>
  );
};

interface WebResourcesProps {
  refetchResources: () => any;
  webResources: any;
}

export const WebApplicationResources: React.FC<WebResourcesProps> = (props) => {
  const [selectedId, setSelectedId] = useState(0);
  const { showModal, showModalStr } = { showModal: false, showModalStr: "" };

  const getResources = () => {
    const resources = props.webResources.loading
      ? []
      : props.webResources().resources;

    return resources ?? [];
  };

  return (
    <>
      <WebResourceModalWrapper
        isActive={showModal && showModalStr === "add_domain"}
        headerTitle="Add web resource"
      >
        <AddDomainModal onDone={() => props.refetchResources()} />
      </WebResourceModalWrapper>

      <WebResourceModalWrapper
        isActive={showModal && showModalStr === "delete_resource"}
        headerTitle="Delete web resource"
      >
        <AddDomainModal onDone={() => props.refetchResources()} />
      </WebResourceModalWrapper>

      <WebResourceModalWrapper
        isActive={showModal && showModalStr === "add_subdomain"}
        headerTitle="Add web sub-resource"
      >
        <AddDomainModal onDone={() => props.refetchResources()} />
      </WebResourceModalWrapper>
    </>
  );
};
