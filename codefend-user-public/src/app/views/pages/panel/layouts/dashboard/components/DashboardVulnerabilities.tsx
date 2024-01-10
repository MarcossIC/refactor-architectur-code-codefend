import React, { useCallback, useMemo, useState } from 'react';
import {
	BugIcon,
	EmptyCard,
	PageLoader,
	Table,
} from '../../../../../components';
import { Issues } from '../../../../../../data';

interface TopVulnerability {
	published: string;
	author: string;
	type: string;
	risk: string;
	score: string;
	issueTitle: string;
	status: string;
}

const DashboardVulnerabilities: React.FC<{
	topVulnerabilities: Issues[];
	isLoading: boolean;
}> = ({ topVulnerabilities, isLoading }) => {
	const [sortBy, setSortBy] = useState('');
	const [selectedNow, setSelectedNow] = useState(false);

	const updateSelectedRow = useCallback(
		(updatedState: boolean) => setSelectedNow(updatedState),
		[setSelectedNow],
	);

	const keys = [
		'published',
		'author',
		'class', //  'class' is used in this array, not 'type' as in TopVulnerability
		'risk',
		'score',
		'issue title', // 'issue title' is used in this array, not 'issueTitle' as in TopVulnerability
		'status',
	];

	const dataTable = useMemo(() => {
		return topVulnerabilities.map(
			(issue: Issues) =>
				({
					published: issue.createdAt,
					author: '@' + issue.researcherUsername,
					issueTitle: issue.name,
					risk: issue.riskLevel,
					type: issue.resourceClass,
					score: issue.riskScore,
					status: issue.condition,
				}) as TopVulnerability,
		);
	}, [topVulnerabilities]);
	console.log('vul:', { dataTable });

	return (
		<div className="card">
			<div>
				{!isLoading ? (
					<>
						<div className="header">
							<div className="title">
								<div className="icon">
									<BugIcon />
								</div>
								<span>Top priority vulnerabilities</span>
							</div>
						</div>
						<div className="table-wrapper">
							<Table data={dataTable} columns={keys} />
						</div>
					</>
				) : (
					<>
						<PageLoader />
					</>
				)}

				{!isLoading && topVulnerabilities.length === 0 && <EmptyCard />}
			</div>
		</div>
	);
};

export default DashboardVulnerabilities;
