import React, { useCallback, useState } from 'react';

import { PageLoader } from '../../../../components';
import { Table } from '../../../../components';

const DashboardCollaborators: React.FC<{
	members: any;
	isLoading: boolean;
}> = ({ members, isLoading }) => {
	const [sortBy, setSortBy] = useState('');
	const [selectedNow, setSelectedNow] = useState(false);
	const getMembers = () => members;

	const updateSelectedRow = useCallback(
		(updatedState: boolean) => setSelectedNow(updatedState),
		[],
	);

	return (
		<div className="card colaborators">
			<div className="colaborators-container">
				<div>
					{!isLoading ? (
						<></>
					) : (
						<>
							<PageLoader />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default DashboardCollaborators;
