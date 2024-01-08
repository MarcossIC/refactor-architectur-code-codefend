import React, { useEffect, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	Colors,
	DoughnutController,
	ChartOptions,
} from 'chart.js';

import { isEmptyData } from '../../../../../data/utils/helper';

import { EmptyCard, PageLoader, BugIcon } from '../../../../components';
import { IssuesShare, generateIDArray } from '../../../../../data';
import { DashboardService } from '../../../../../data';

const useChart = ({
	vulnerabilityByRisk,
}: {
	vulnerabilityByRisk: IssuesShare;
}) => {
	const { total, ...otherMetrics } = vulnerabilityByRisk;

	const chartData = useMemo(() => {
		return {
			labels: Object.keys(otherMetrics),
			datasets: [
				{
					data: Object.values(otherMetrics),
					backgroundColor: [
						'#e85050', //critical
						'#e25365', //elevated
						'#e97e8b', //medium
						'#f1a7b1', //low
						'#f8d7db', //intel
					],
					borderWidth: 0,
				},
			],
		};
	}, [otherMetrics]);

	return { chartData, otherMetrics, total };
};

interface DashboardChartProps {
	vulnerabilityByRisk: IssuesShare;
	isLoading: boolean;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
	vulnerabilityByRisk,
	isLoading,
}) => {
	useEffect(() => {
		ChartJS.register(Title, Tooltip, Legend, Colors, DoughnutController);
	}, []);

	const { chartData, otherMetrics, total } = useChart({
		vulnerabilityByRisk,
	});
	const { renderPercentage } = DashboardService;

	const chartOptions: ChartOptions<'doughnut'> = {
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

	const metricsKey = useMemo(
		() => generateIDArray(Object.keys(otherMetrics).length),
		[Object.keys(otherMetrics).length],
	);

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
									<Doughnut
										data={chartData}
										options={chartOptions}
									/>
								</div>
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
