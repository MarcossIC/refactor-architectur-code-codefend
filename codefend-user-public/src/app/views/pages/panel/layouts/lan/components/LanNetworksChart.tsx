import { isEmptyData, renderPercentage } from 'app/data';
import { computeInternalNetworkOSAndCount } from 'app/data/utils/compute';
import { EmptyCard, PageLoader } from 'app/views/components';
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Network } from './LanNetworkData';

export const osTypes = ['windows', 'linux', 'android', 'ios', 'unknown'];

interface LanNetworksChartProps {
  isLoading: boolean;
  internalNetwork: Network[]; 
}

export const LanNetworksChart: React.FC<LanNetworksChartProps> = (props) => {
	const renderChartData = () => {
		const { total, ...otherMetrics } = computeInternalNetworkOSAndCount(
			props.internalNetwork,
		);

		const chartData = {
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
			labels: Object.keys(otherMetrics).map((item) =>
				osTypes.includes(item.toLowerCase()) ? item : 'Unknown',
			),
		};
		return { chartData, otherMetrics, total };
	};

	useEffect(() => {
		Chart.register(Title, Tooltip, Legend, Colors);
	});

	const chartOptions = {
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	const dataEmptyState = () => {
		const { total, ...otherMetrics } = computeInternalNetworkOSAndCount(
			props.internalNetwork,
		);
		return isEmptyData(otherMetrics);
	};

	return (
		<>
			<div className="card risk-chart">
				{!props.isLoading ? (
					<div className="header">
						<div className="title">
							<div className="icon">{/* <FaSolidChartSimple /> */}</div>
							<span>Network devices by technology</span>
						</div>
					</div>
				) : (
					<PageLoader />
				)}

				{!dataEmptyState() ? (
					<div className="content">
						<EmptyCard />
					</div>
				) : (
					<div className="content">
						<div className="chart">
							<Doughnut
								data={renderChartData().chartData}
								options={chartOptions}
							/>
						</div>
						<div className="table small">
							<div className="columns-name">
								<div className="os">os</div>
								<div className="count">count</div>
								<div className="percent">percent</div>
							</div>

							<div className="row">
								{Object.keys(renderChartData().otherMetrics).map(
									(network) => (
										<div className="item" key={network}>
											<div className="os">
												{osTypes.includes(network.toLowerCase())
													? network
													: 'Unknown'}
											</div>
											<div className="count">
												{renderChartData().otherMetrics[network]}
											</div>
											<div className="percent">
												{renderPercentage(
													renderChartData().otherMetrics[network],
													renderChartData().total,
												)}
											</div>
										</div>
									),
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
