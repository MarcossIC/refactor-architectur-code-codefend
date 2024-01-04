import React, { useEffect, useState } from "react";

import DashboardSearchbar from "./components/DashboardSearchbar";
import DashboardVulnerabilities from "./components/DashboardVulnerabilities";
import DashboardCollaborators from "./components/DashboardCollaborators";
import DashboardAssets from "./components/DashboardAssets";
import DashboardChart from "./components/DashboardChart";
import DashboardVulnerabilitiesStatus from "./components/DashboardVulnerabilitiesStatus";

import "./dashboard.scss";
import "../../../shared/card.scss";

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
