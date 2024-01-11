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
import { ChartService, ChartValueType, isEmptyData } from '..';

interface DoughnutCharProps {
	data: any;
	type: ChartValueType;
}
type ChartMetrics = {
	[ChartValueType.SOURCE_CODE]: (value: any) => any;
	[ChartValueType.PLAIN]: (value: any) => any;
	[ChartValueType.NETWORK_OS]: (value: any) => any;
};
export const useDoughnutChart = (value: DoughnutCharProps) => {
	const metrics: ChartMetrics = {
		[ChartValueType.SOURCE_CODE]: (value) =>
			ChartService.computeSourceCodeMetrics(value),
		[ChartValueType.PLAIN]: (value) => value,
		[ChartValueType.NETWORK_OS]: (value) =>
			ChartService.computeInternalNetworkOSAndCount(value),
	};

	const { total, ...otherMetrics } = metrics[value.type](value.data);

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

	const dataEmptyState = useMemo(() => {
		return isEmptyData(otherMetrics);
	}, [otherMetrics]);

	return { chartOptions, chartData, otherMetrics, total, dataEmptyState };
};
