import { IssueClass, generateIDArray } from '../../../../../../data';
import { ChartIcon, Show, SimpleSection } from '../../../../../components';
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
				<SimpleSection
					header="FILTER AND GENERATE REPORT"
					icon={<ChartIcon />}>
					<div className="content filters">
						{filterIssues.map((issue: any, i: number) => (
							<Fragment key={filterKeys[i]}>
								<div className="filter">
									<div className="check">
										<input
											id={'a' + filterKeys[i]}
											type="checkbox"
											disabled={filterIssues[issue] === '0'}
											onChange={(e) => props.handleFilter(e, issue)}
										/>
										<label htmlFor={'a' + filterKeys[i]}>
											{issue}
										</label>
									</div>
									<div className="value">
										<Show
											when={filterIssues[issue] == '0'}
											fallback={
												<img
													src="/codefend/issues-bug-icon.svg"
													alt="bug-icon"
												/>
											}>
											<img
												src="/codefend/issues-bug-grey.svg"
												alt="bug-icon"
											/>
										</Show>

										<span>{filterIssues[issue]}</span>
									</div>
								</div>
							</Fragment>
						))}
					</div>
				</SimpleSection>
			</div>
		</>
	);
};
