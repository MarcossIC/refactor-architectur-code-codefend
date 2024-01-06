import React from "react";

import { ModalWrapper, ChartIcon, EmptyCard } from "src/app/views/components";
import { CloudQuickAction } from "./CloudQuickAction";

import "../../../shared/card.scss";
import { TestingCredentialCard } from "./TestingCredentialCard";

interface ProvidedTestingCredentialsProps {
  refetch?: () => void;
  isLoading: boolean;
  credentials: any;
}

export const ProvidedTestingCredentials: React.FC<
  ProvidedTestingCredentialsProps
> = (props) => {
  return (
    <>
      {props.isLoading ?? (
        <>
          <ModalWrapper>
            <div className="quick-action internal-tables disable-border">
              <div className="modal-header">
                |<span>{" Add cloud actions "}</span>|
              </div>

              <CloudQuickAction onDone={() => props.refetch?.()} />

              <div className="helper-box"></div>
            </div>
          </ModalWrapper>
        </>
      )}

      <div className="card user-list">
        <div className="header">
          <div className="title">
            <div className="icon">
              <ChartIcon />
            </div>
            <span>provided testing credentials</span>
          </div>
        </div>

        <div className="list">
          {props.credentials.map((cred: any, index: number) => (
            <>
              <TestingCredentialCard
                key={index}
                {...cred}
                hideBorderBottom={props.credentials.legth - 1 === index}
              />
            </>
          ))}
        </div>
      </div>
      {(!props.isLoading && props.credentials.legth === 0) ?? <EmptyCard />}
    </>
  );
};
