import React, { useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  Colors,
  DoughnutController,
  ChartOptions,
} from "chart.js";

import {
  isEmptyData,
  renderPercentage,
} from "../../../../../data/utils/helper";

import { EmptyCard, PageLoader, BugIcon } from "../../../../components";

const useChart = ({
  vulnerabilityByRisk,
}: {
  vulnerabilityByRisk: Record<string, number>;
}) => {
  const { total, ...otherMetrics } = vulnerabilityByRisk;

  const chartData = useMemo(() => {
    return {
      labels: Object.keys(otherMetrics),
      datasets: [
        {
          data: Object.values(otherMetrics),
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
    };
  }, [otherMetrics]);

  return { chartData, otherMetrics };
};

interface DashboardChartProps {
  vulnerabilityByRisk: Record<string, number>;
  isLoading: boolean;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  vulnerabilityByRisk,
  isLoading,
}) => {
  useEffect(() => {
    ChartJS.register(Title, Tooltip, Legend, Colors, DoughnutController);
  }, []);

  const { chartData, otherMetrics } = useChart({ vulnerabilityByRisk });

  const chartOptions: ChartOptions<"doughnut"> = {
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
          <div className="header">
            <div className="title">
              <div className="icon">
                <BugIcon />
              </div>
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
                <div className="table small">
                  <div className="columns-name">
                    <div className="risk">risk</div>
                    <div className="count">count</div>
                    <div className="percent">percent</div>
                  </div>
                  <div className="rows">
                    {Object.keys(otherMetrics).map((metric: any) => (
                      <div key={metric} className="items">
                        <div className="risk">{metric}</div>
                        <div className="count">{otherMetrics[metric]}</div>
                        <div className="percent">
                          {renderPercentage(
                            otherMetrics[metric].toString(),
                            (vulnerabilityByRisk as any).total.toString()
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
