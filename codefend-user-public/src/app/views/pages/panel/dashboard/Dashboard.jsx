import React, { useEffect, useState } from "react";

import { DashboardSearchbar } from "./DashboardSearchbar";
import { DashboardVulnerabilities } from "./DashboardVulnerabilities";
import { DashboardCollaborators } from "./DashboardCollaborators";
import { DashboardAssets } from "./DashboardAssets";

const Dashboard = () => {
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => setTimeout(() => setShowScreen(true), 50));

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

      <section className="right"></section>
    </main>
  );
};

export default Dashboard;
