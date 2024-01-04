import React from "react";
import { Link } from "react-router-dom";

import { CircleIcon } from "../../../../components";

const DashboardAssets: React.FC<{ resources: any }> = ({ resources }) => {
  return (
    <div className="card stats">
      <div className="header">
        <div className="title">
          <div className="icon">
            <CircleIcon />
          </div>
          <span>Supervised assets</span>
        </div>
        <div className="actions"></div>
      </div>
      <div className="content">
        <div>
          {Object.keys(resources).map((resource) => (
            <>
              <Link key={resource} to={`/${resource}`} className="stat">
                <div className="value">{resources[resource]}</div>
                <p>{resource}</p>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAssets;
