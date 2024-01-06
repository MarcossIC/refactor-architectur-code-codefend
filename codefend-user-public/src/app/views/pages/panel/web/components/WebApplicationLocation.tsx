import React from "react";
import { CircleIcon } from "../../../../components";

export const WebApplicationLocation: React.FC<{ webResources: any }> = ({
  webResources,
}) => {
  return (
    <div className="card table">
      <div className="header">
        <div className="title">
          <div className="icon">
            <CircleIcon />
          </div>
          <span>Supervised assets</span>
        </div>
        <div className="actions"></div>
      </div>
      <div className="columns-name">
        <div className="location">location</div>
        <div className="count">count</div>
        <div className="percent">percent</div>
      </div>
      <div className="rows">
        {webResources.map((resource: any) => (
          <section key={resource.country} className="item">
            <div className="location">
              <span
                className={`flag flag-${resource.countryCode.toLowerCase()}`}
              ></span>
              {resource.country}
            </div>
            <div className="count">{resource.count}</div>
            <div className="percent">{resource.percentage}</div>
          </section>
        ))}
      </div>
    </div>
  );
};
