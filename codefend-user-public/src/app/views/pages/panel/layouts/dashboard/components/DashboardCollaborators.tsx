import React, { Suspense, useCallback, useState } from 'react';

import {
	PageLoader,
	PeopleGroup,
	Show,
	SimpleSection,
	Table,
} from '../../../../../components';

const DashboardCollaborators: React.FC<{
	members: any;
	isLoading: boolean;
}> = ({ members, isLoading }) => {
	const keys = ['id', 'fullname', 'email', 'phone number', 'role'];

	return (
		<div className="card colaborators">
			<div className="colaborators-container">
				<div>
					<Show when={!isLoading} fallback={<PageLoader />}>
						<SimpleSection
							header="Collaborators and team members"
							icon={<PeopleGroup />}>
							<div className="table-wrapper">
								<Table data={members} columns={keys} />
							</div>
						</SimpleSection>
					</Show>
				</div>
			</div>
		</div>
	);
};

export default DashboardCollaborators;
