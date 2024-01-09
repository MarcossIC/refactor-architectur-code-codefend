import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
	EmptyCard,
	PageLoader,
	BugIcon,
	Table,
	
} from '../../../../../components';
import {
	IssuesShare,
	generateIDArray,
	DashboardService,
	isEmptyData,
	useDoughnutChart
} from '../../../../../../data';

interface DashboardChartProps {
	vulnerabilityByRisk: IssuesShare;
	isLoading: boolean;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
	vulnerabilityByRisk,
	isLoading,
}) => {
	const { chartData, otherMetrics, total, chartOptions } =
		useDoughnutChart(vulnerabilityByRisk);

	const { renderPercentage } = DashboardService;

	const dataEmptyState = useMemo(() => {
		const { total, ...otherMetrics } = vulnerabilityByRisk;
		return isEmptyData(otherMetrics);
	}, [vulnerabilityByRisk]);

	const metricsKey = useMemo(
		() => generateIDArray(Object.keys(otherMetrics).length),
		[Object.keys(otherMetrics).length],
	);
	const tableColumns = useMemo(
		() => new Set<string>(['risk', 'count', 'percent']),
		[],
	);
	const tableRows = useMemo(() => {
		return Object.keys(otherMetrics).map((metric: string | number) => {
			return {
				risk: metric,
				count: otherMetrics[metric as keyof typeof otherMetrics],
				percent: renderPercentage(
					String(otherMetrics[metric as keyof typeof otherMetrics]),
					String(total),
				),
			};
		});
	}, []);
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
						{dataEmptyState ? (
							<>
								<EmptyCard />
							</>
						) : (
							<>
								<div className="chart">
									<Doughnut
										data={chartData}
										options={chartOptions}
									/>
								</div>

								<Table
									columns={tableColumns}
									DATA={tableRows}
								/>
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

/* 

<div className="table small">
									<div className="columns-name">
										<div className="risk">risk</div>
										<div className="count">count</div>
										<div className="percent">percent</div>
									</div>
									<div className="rows">
										{Object.keys(otherMetrics).map(
											(
												metric: string | number,
												index: number,
											) => (
												<div
													key={metricsKey[index]}
													className="items">
													<div className="risk">
														{metric}
													</div>
													<div className="count">
														{
															otherMetrics[
																metric as keyof typeof otherMetrics
															]
														}
													</div>
													<div className="percent">
														{renderPercentage(
															otherMetrics[
																metric as keyof typeof otherMetrics
															] as string,
															total as string,
														)}
													</div>
												</div>
											),
										)}
									</div>
								</div>

*/
