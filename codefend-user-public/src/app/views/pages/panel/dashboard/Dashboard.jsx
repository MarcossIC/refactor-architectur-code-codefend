import React, { useEffect, useState } from "react";

import DashboardSearchbar from "./DashboardSearchbar";
import DashboardVulnerabilities from "./DashboardVulnerabilities";
import DashboardCollaborators from "./DashboardCollaborators";
import DashboardAssets from "./DashboardAssets";
import DashboardChart from "./DashboardChart";
import DashboardVulnerabilitiesStatus from "./DashboardVulnerabilitiesStatus";

const Dashboard = () => {
  const [showScreen, setShowScreen] = useState(false);
  const companyInfo = { loading: true };

  useEffect(() => {
    setTimeout(() => {
      setShowScreen(true);
      companyInfo.loading = false;
    }, 2500);
  }, []);

  return (
    <main className={` dashboard ${showScreen ? "actived" : ""}`}>
      <section className="left">
        <DashboardSearchbar />
        <DashboardVulnerabilities
          isLoading={companyInfo.loading}
          topVulnerabilities={[]}
        />
        <DashboardAssets resources={{}} />
        <DashboardCollaborators isLoading={companyInfo.loading} members={[]} />
      </section>

      <section className="right">
        <DashboardChart
          vulnerabilityByRisk={{}}
          isLoading={companyInfo.loading}
        />
        <DashboardVulnerabilitiesStatus vulnerabilityByShare={{}} />
      </section>
    </main>
  );
};

export default Dashboard;
