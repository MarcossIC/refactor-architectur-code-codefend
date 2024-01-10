import React, { useCallback, useState } from 'react';

import { PageLoader, PeopleGroup } from '../../../../../components';
import { Table } from '../../../../../components';

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

	const keys = ['id', 'fullname', 'email', 'phone number', 'role'];

	return (
		<div className="card colaborators">
			<div className="colaborators-container">
				<div>
					{!isLoading ? (
						<>
							<div className="header">
								<div className="title">
									<div className="icon">
										<PeopleGroup />
									</div>
									<span>COLLABORATORS AND TEAM MEMBERS</span>
								</div>
							</div>
							<div className="table-wrapper">
								<Table data={members} columns={keys} />
							</div>
						</>
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
