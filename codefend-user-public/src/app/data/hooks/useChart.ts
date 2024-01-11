import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	Colors,
	ChartData,
	ChartOptions,
	ArcElement,
} from 'chart.js/auto';
import { IssuesShare } from '..';
import { SourceCodeService } from '../services/sourcecode.service';
interface DoughnutCharProps {
	vulnerabilityByRisk: any;
	isComputed: boolean;
}
export const useDoughnutChart = ({
	vulnerabilityByRisk,
	isComputed,
}: DoughnutCharProps) => {
	const { total, ...otherMetrics } = !isComputed
		? vulnerabilityByRisk
		: SourceCodeService.computeSourceCodeMetrics(vulnerabilityByRisk);

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
