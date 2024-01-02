import React from "react";

const DashboardAssets = ({ resources }) => {
  return (
    <div className="card stats">
      <div className="header">
        <div className="title">
          <div className="icon">* Circle Dot Icon *</div>
          <span>Supervised assets</span>
        </div>
        <div className="actions"></div>
      </div>
      <div className="content">
        <div>
          {Object.keys(props.resources).map((resource) => {
            <Link to={`/${resource}`} className="stat">
              <div className="value">{resources[resource]}</div>
              <p>{resource}</p>
            </Link>;
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardAssets;
