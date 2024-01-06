import { Chart, ChartOptions, Colors, Legend, Title, Tooltip } from "chart.js";
import React, { useCallback, useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { isEmptyData, renderPercentage } from "src/app/data";
import { BugIcon, EmptyCard, PageLoader } from "src/app/views/components";

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
  }, []);

  return { chartData, otherMetrics };
};

interface DashboardChartProps {
  isLoading: boolean;
  vulnerabilityByRisk: any;
}

export const DashboardChart: React.FC<DashboardChartProps> = (props) => {
  const renderChart = useChart(props.vulnerabilityByRisk);

  const chartOptions: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const dataEmptyState = useMemo(() => {
    const { total, ...otherMetrics } = props.vulnerabilityByRisk;
    return isEmptyData(otherMetrics);
  }, [props.vulnerabilityByRisk]);

  useEffect(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  }, []);

  return (
    <>
      <div className="card risk-chart">
        {!props.isLoading ? (
          <>
            <div className="header">
              <div className="title">
                <div className="icon">
                  <BugIcon />
                </div>
                <span>Vulnerabilities by risk</span>
              </div>
            </div>
            {dataEmptyState ? (
              <>
                <div className="content">
                  <EmptyCard />
                </div>
              </>
            ) : (
              <div className="content">
                <div className="chart">
                  <Doughnut
                    data={renderChart.chartData}
                    options={chartOptions}
                  />
                </div>
                <div className="table small">
                  <div className="columns name">
                    <div className="risk">risk</div>
                    <div className="count">count</div>
                    <div className="percent">percent</div>
                  </div>
                  <div className="rows">
                    {Object.keys(renderChart.otherMetrics).map((metric) => (
                      <>
                        <div key={metric} className="item">
                          <div className="risk">{metric}</div>
                          <div className="count">
                            {renderChart.otherMetrics[metric]}
                          </div>
                          <div className="percent">
                            {renderPercentage(
                              renderChart.otherMetrics[metric]?.toString(),
                              props.vulnerabilityByRisk.total
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {" "}
            <PageLoader />
          </>
        )}
      </div>
    </>
  );
};
