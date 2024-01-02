import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../../shared/flag.scss";

const DashboardVulnerabilitiesStatus = () => {
  const navigate = useNavigate();

  const renderMetrics = () => {
    return {
      total: props.vulnerabilityByShare.total ?? 0,
      fixed: props.vulnerabilityByShare.fixed ?? 0,
      open: props.vulnerabilityByShare.open ?? 0,
    };
  };

  return (
    <div className="card stats">
      <div className="header">
        <div className="title">
          <div className="icon">* Chart simple icon *</div>
          <div className="actions"></div>
        </div>
        <div onClick={() => navigate("/issues")} className="content">
          <div className="stat">
            <div className="value">
              <span className="text-fend-red">{renderMetrics().open}</span>
              {`/${renderMetrics().total}`}
            </div>
            <p className="text-fend-red">Open issues</p>
          </div>
          <div className="stat">
            <div className="value">
              <span>{renderMetrics().fixed}</span>
              {`/${renderMetrics().total}`}
            </div>
            <p>Fixed issues</p>
          </div>
          <div className="stat">
            <div className="value">{renderMetrics().total}</div>
            <p>Total issues</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVulnerabilitiesStatus;
