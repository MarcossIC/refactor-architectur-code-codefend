import React, { useEffect, useState } from "react";


import "./dashboard.scss";
import "../../../shared/card.scss";

const Dashboard: React.FC = () => {
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
       <>
        dash
       </>
      </section>

      <section className="right">
       <>
       vulnerability</>
      </section>
    </main>
  );
};

export default Dashboard;
