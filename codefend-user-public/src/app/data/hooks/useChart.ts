import { useEffect, useMemo } from 'react';
import { IssuesShare } from '..';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	Colors,
	ChartData,
	ChartOptions,
	ArcElement,
} from 'chart.js';

export const useDoughnutChart = (vulnerabilityByRisk: IssuesShare) => {
	const { total, ...otherMetrics } = vulnerabilityByRisk;

	useEffect(() => {
		ChartJS.register(Title, Tooltip, Legend, Colors, ArcElement);
	}, []);

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
		} as ChartData<'doughnut'>;
	}, [otherMetrics]);

	const chartOptions: ChartOptions<'doughnut'> = useMemo(
		() => ({
			plugins: {
				legend: {
					display: false,
				},
			},
		}),
		[],
	);

	return { chartOptions, chartData, otherMetrics, total };
};
