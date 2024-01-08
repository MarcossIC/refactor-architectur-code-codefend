import React, { useCallback, useState } from 'react';
import { BugIcon, EmptyCard, PageLoader, Table } from '../../../../components';

const DashboardVulnerabilities: React.FC<{
	topVulnerabilities: any;
	isLoading: boolean;
}> = ({ topVulnerabilities, isLoading }) => {
	const [sortBy, setSortBy] = useState('');
	const [selectedNow, setSelectedNow] = useState(false);

	console.log('Vul', { topVulnerabilities });

	const updateSelectedRow = useCallback(
		(updatedState: boolean) => setSelectedNow(updatedState),
		[],
	);

	const keys = new Set<string>([
		'published',
		'author',
		'className',
		'risk',
		'score',
		'issue title',
		'status',
	]);

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
							<Table DATA={topVulnerabilities} columns={keys} />
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
