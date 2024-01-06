import React from "react";
import { useNavigate } from "react-router";
import { ChartIcon } from "src/app/views/components";

interface DashboardVulnerabilitiesStatusProps {
  vulnerabilityByShare: any;
}

export const DashboardVulnerabilitiesStatus: React.FC<
  DashboardVulnerabilitiesStatusProps
> = (props) => {
  const navigate = useNavigate();
  const renderMetrics = () => {
    return {
      total: props.vulnerabilityByShare.total ?? 0,
      fixed: props.vulnerabilityByShare.fixed ?? 0,
      open: props.vulnerabilityByShare.open ?? 0,
    };
  };

  return (
    <>
      <div className="card stats">
        <div className="header">
          <div className="title">
            <div className="icon">
              <ChartIcon />
            </div>
            <span>Vulnerabilities by status</span>
          </div>
          <div className="actions"></div>
        </div>
        <div className="content" onClick={() => navigate("/issues")}>
          <div className="stat">
            <div className="value">
              <span className="text-fend-red">{renderMetrics().open}</span>/
              {renderMetrics().total}
            </div>
            <p className="text-fend-red">Open issues</p>
          </div>
          <div className="stat">
            <div className="value">
              <span>{renderMetrics().fixed}</span>/{renderMetrics().total}
            </div>
            <p>Fixed issues</p>
          </div>
          <div className="stat">
            <div className="value">{renderMetrics().total}</div>
            <p>Total issues</p>
          </div>
        </div>
      </div>
    </>
  );
};
