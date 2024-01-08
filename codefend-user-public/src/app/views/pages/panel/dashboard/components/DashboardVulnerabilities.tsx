import React, { useCallback, useState } from 'react';
import { EmptyCard, PageLoader, Table } from '../../../../components';

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
		'class',
		'risk',
		'score',
		'issue title',
		'status',
	]);
	//const getTopVulnerabilities = useCallback(() => topVulnerabilities, []);

	return (
		<div className="card">
			<div>
				{!isLoading ? (
					<>
						<Table DATA={topVulnerabilities} columns={keys} />
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
