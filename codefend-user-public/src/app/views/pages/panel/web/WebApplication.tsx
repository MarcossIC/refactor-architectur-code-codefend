import React, { useEffect, useState } from "react";
import { WebApplicationResources } from "./components/WebApplicationResources";
import { WebApplicationLocation } from "./components/WebApplicationLocation";
import { WebApplicationStatics } from "./components/WebApplicationStatics";
import { WebApplicationCredentials } from "./components/WebApplicationCredentials";
import "../../../../shared/flag.scss";
import "../../../../shared/card.scss";
import "../../../../shared/table.scss";
import "./webapplication.scss";

const WebApplicationView: React.FC = () => {
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowScreen(true), 50);
  }, []);

  return (
    <main className={`webapp ${showScreen ? "actived" : ""}`}>
      <section className="left">
        <WebApplicationResources
          isLoading={false}
          refetchResources={() => console.log("como va")}
          webResources={{}}
        />
      </section>
      <section className="right">
        <WebApplicationLocation webResources={{}} />

        <WebApplicationStatics webResources={{}} isLoading={false} />

        <WebApplicationCredentials />
      </section>
    </main>
  );
};

export default WebApplicationView;
