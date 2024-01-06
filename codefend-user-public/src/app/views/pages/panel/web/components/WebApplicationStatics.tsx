import React from "react";
import { ChartIcon } from "../../../../components";
interface WebResourceStaticProps {
  webResources: any;
  isLoading: boolean;
}

export const WebApplicationStatics: React.FC<WebResourceStaticProps> = ({
  webResources,
  isLoading,
}) => {
  /* 
    const getResources = () => {
    const resources = props.webResources.loading
      ? []
      : props.webResources().resources;
    return resources;
  };
  */
  return (
    <div className="card stats">
      <div className="header">
        <div className="title">
          <div className="icon">
            <ChartIcon />
          </div>
          <span>Domain & server statics</span>
        </div>
        <div className="actions"></div>
      </div>
      <div className="content">
        <div className="stat">
          <div className="value">{/* Get Company metrics domain*/}</div>
        </div>
        <p className="text-fend-red">Domains</p>
      </div>
      <div className="stat">
        <div className="value">
          <span>{/* Get company metric subDomain */}</span>
        </div>
        <p>Subdomains</p>
      </div>
      <div className="stat">
        <div className="value">
          <span>{/* Get company metrics unique ips*/}</span>
          <p>Unique IPS</p>
        </div>
      </div>
    </div>
  );
};
