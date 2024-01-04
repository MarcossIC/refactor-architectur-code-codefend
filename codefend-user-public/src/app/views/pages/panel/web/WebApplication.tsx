import React, { useEffect, useState } from "react";
import "./webapplication.scss";

export const WebApplicationView: React.FC = () => {
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowScreen(true);
    }, 50);
  });

  return (
    <main className={`webapp ${showScreen ? "actived" : ""}`}>
      <section className="left"></section>
      <section className="right"></section>
    </main>
  );
};
