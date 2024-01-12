import { IssueClass, generateIDArray } from '../../../../../../data';
import { ChartIcon } from '../../../../../components';
import React, { Fragment, useMemo } from 'react';

interface Props {
	isLoading: boolean;
	issuesClasses: IssueClass;
	handleFilter: (e: React.FormEvent, issueClass: any) => void;
}

export const IssueReport: React.FC<Props> = (props) => {
	const filterIssues = useMemo(() => {
		return Object.keys(props.issuesClasses).filter(
			(item) => item !== 'total',
		);
	}, [props.issuesClasses]);

	const filterKeys = useMemo(() => {
		return generateIDArray(filterIssues.length);
	}, [filterIssues]);

	return (
		<>
			<div className="card filtered">
				<div className="header">
					<div className="title">
						<div className="icon">
							<ChartIcon />
						</div>
						<span>FILTER AND GENERATE REPORT</span>
					</div>
				</div>

				<div className="content filters">
					{filterIssues.map((issue: any, index: number) => (
						<Fragment key={filterKeys[index]}>
							<div className="filter">
								<div className="check">
									<input
										id={issue}
										type="checkbox"
										disabled={filterIssues[issue] == '0'}
										onChange={(e) => props.handleFilter(e, issue)}
									/>
									<label htmlFor={issue}>{issue}</label>
								</div>
								<div className="value">
									{filterIssues[issue] == '0' ? (
										<img
											src="/codefend/issues-bug-grey.svg"
											alt="bug-icon"
										/>
									) : (
										<img
											src="/codefend/issues-bug-icon.svg"
											alt="bug-icon"
										/>
									)}
									<span>{filterIssues[issue]}</span>
								</div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};
