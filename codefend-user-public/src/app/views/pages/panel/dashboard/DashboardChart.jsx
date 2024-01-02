import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, Colors } from "chart.js";

import { isEmptyData, renderPercentage } from "../../../../data/utils/helper";
import { EmptyCard, PageLoader } from "../../../components";

const useChart = ({ vulnerabilityByRisk }) => {
  const { total, ...otherMetrics } = vulnerabilityByRisk;

  const chartData = {
    datasets: [
      {
        data: Object.values(otherMetrics),
        /*Note: this colors are commented according to the pie chart
        that is generated for the vulnerabilities and findings,
        it may or could be different
        */
        backgroundColor: [
          "#e85050", //critical
          "#e25365", //elevated
          "#e97e8b", //medium
          "#f1a7b1", //low
          "#f8d7db", //intel
        ],

        borderWidth: 0,
      },
    ],
    labels: Object.keys(otherMetrics),
  };
  return { chartData, otherMetrics };
};

const DashboardChart = ({ vulnerabilityByRisk, isLoading }) => {
  useEffect(() => ChartJS.register(Title, Tooltip, Legend, Colors), []);

  const { chartData, otherMetrics } = useChart({ vulnerabilityByRisk });

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataEmptyState = () => {
    const { total, ...otherMetrics } = vulnerabilityByRisk;
    return isEmptyData(otherMetrics);
  };

  return (
    <div className="card risk-chart">
      {!isLoading ? (
        <>
          <div class="header">
            <div class="title">
              <div class="icon">* Bug Icon *</div>
              <span>Vulnerabilities by risk</span>
            </div>
          </div>
          <div className="content">
            {dataEmptyState() ? (
              <>
                <EmptyCard />
              </>
            ) : (
              <>
                <div className="chart">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
                <div class="table small">
                  <div class="columns-name">
                    <div class="risk">risk</div>
                    <div class="count">count</div>
                    <div class="percent">percent</div>
                  </div>
                  <div className="rows">
                    {Object.keys(otherMetrics).map((metric) => (
                      <div className="items">
                        <div class="risk">{metric}</div>
                        <div class="count">{otherMetrics[metric]}</div>
                        <div class="percent">
                          {renderPercentage(
                            otherMetrics[metric],
                            vulnerabilityByRisk.total
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <PageLoader />
        </>
      )}
    </div>
  );
};

export default DashboardChart;
