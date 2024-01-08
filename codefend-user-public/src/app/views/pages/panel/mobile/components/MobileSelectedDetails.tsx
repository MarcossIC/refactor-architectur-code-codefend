import React, { useCallback } from "react";
import { PageLoader } from "../../../../components";
import {
  MobileAppInfoCard,
  ProvidedTestingCredentials,
  DashboardChart,
  DashboardVulnerabilitiesStatus,
  IssuesPanelMobileAndCloud,
} from "../../components";

interface Props {
  isLoading: boolean;
  selectedMobileApp: any;
}

export const MobileSelectedDetails: React.FC<Props> = ({
  isLoading,
  selectedMobileApp,
}) => {
  const getSelectedMobileAppId = useCallback(() => selectedMobileApp?.id, []);

  return (
    <>
      {!isLoading ? (
        <>
          <div>
            <MobileAppInfoCard type="mobile" selectedApp={selectedMobileApp} />
          </div>
          <div className="provided-testing-container">
            <div className="wrapper">
              <ProvidedTestingCredentials credentials={[]} isLoading={false} />
            </div>
            <div className="dashboard-charts">
              <DashboardChart isLoading={false} vulnerabilityByRisk={{}} />
              <DashboardVulnerabilitiesStatus vulnerabilityByShare={{}} />
            </div>
          </div>

          <section className="card table">
            <IssuesPanelMobileAndCloud isLoading={false} issues={{}} />
          </section>
        </>
      ) : (
        <>
          {" "}
          <PageLoader />{" "}
        </>
      )}
    </>
  );
};
