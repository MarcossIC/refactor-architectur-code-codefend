import React, { Fragment, useMemo } from 'react';
import {
	MetricsService,
	ChartValueType,
	SourceCode,
	generateIDArray,
	isEmptyData,
	languageTypes,
	useDoughnutChart,
} from '../../../../../../data';
import { ChartIcon, EmptyCard, PageLoader } from '../../../../../components';
import { Doughnut } from 'react-chartjs-2';

interface Props {
	isLoading: boolean;
	sourceCode: SourceCode[];
}

export const SourceCodeChart: React.FC<Props> = (props) => {
	const { chartData, otherMetrics, total, chartOptions } = useDoughnutChart({
		data: props.sourceCode,
		type: ChartValueType.SOURCE_CODE,
	});

	const dataEmptyState = useMemo(() => {
		return isEmptyData(otherMetrics);
	}, [otherMetrics]);

	const sourceKeys = useMemo(() => {
		return props.isLoading ? [] : generateIDArray(props.sourceCode.length);
	}, [props.sourceCode]);

	const { renderPercentage } = MetricsService;

	return (
		<>
			<div className="card risk-chart">
				{!props.isLoading ? (
					<>
						<div className="header">
							<div className="title">
								<div className="icon">
									<ChartIcon />
								</div>
								<span>source code by programming language</span>
							</div>
						</div>
						{dataEmptyState ? (
							<div className="content">
								<EmptyCard />
							</div>
						) : (
							<div className="content">
								<div className="chart">
									<Doughnut data={chartData} options={chartOptions} />
								</div>
								<div className="table small">
									<div className="columns-name">
										<div className="os">code</div>
										<div className="count">count</div>
										<div className="percent">percent</div>
									</div>

									<div className="row">
										{Object.keys(otherMetrics).map(
											(network: any, index: number) => (
												<Fragment key={sourceKeys[index]}>
													<div className="item">
														<div className="os">
															{languageTypes.has(
																network.toLowerCase(),
															)
																? network
																: 'Unknown'}
														</div>
														<div className="count">
															{
																otherMetrics[
																	network as keyof typeof otherMetrics
																]
															}
														</div>
														<div className="percent">
															{renderPercentage(
																String(
																	otherMetrics[
																		network as keyof typeof otherMetrics
																	],
																),
																String(total),
															)}
														</div>
													</div>
												</Fragment>
											),
										)}
									</div>
								</div>
							</div>
						)}
					</>
				) : (
					<>
						<PageLoader />
					</>
				)}
			</div>
		</>
	);
};
