import React, { useCallback, useMemo, useState } from 'react';
import {
	BugIcon,
	EmptyCard,
	PageLoader,
	Show,
	SimpleSection,
	Table,
} from '../../../../../components';
import { Issues, topVulnerabilitiesColumn } from '../../../../../../data';

interface TopVulnerability {
	published: string;
	author: string;
	type: string;
	risk: string;
	score: string;
	issueTitle: string;
	status: string;
}

const TopVulnerabilityTable = ({
	topVulnerabilities,
}: {
	topVulnerabilities: Issues[];
}) => {
	const dataTable = topVulnerabilities.map(
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
	return <Table data={dataTable} columns={topVulnerabilitiesColumn} />;
};

const DashboardVulnerabilities: React.FC<{
	topVulnerabilities: Issues[];
	isLoading: boolean;
}> = ({ topVulnerabilities, isLoading }) => {
	return (
		<div className="card">
			<div>
				<SimpleSection
					header="Top priority vulnerabilities"
					icon={<BugIcon />}>
					<Show when={!isLoading} fallback={<PageLoader />}>
						<div className="table-wrapper">
							<TopVulnerabilityTable
								topVulnerabilities={topVulnerabilities}
							/>
						</div>
					</Show>
				</SimpleSection>
				<Show when={!isLoading && topVulnerabilities.length === 0}>
					<EmptyCard />
				</Show>
			</div>
		</div>
	);
};

export default DashboardVulnerabilities;
