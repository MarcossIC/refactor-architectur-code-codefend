import React, { useEffect, useState } from 'react';
import { useIssues } from '../../../../../../data';
import {
	VulnerabilitiesStatus,
	VulnerabilityRisk,
} from '../../../../../components';
import { IssueReport } from '../components/IssueReport';
import { IssueResources } from '../components/IssueResources';
import { useLocation } from 'react-router';
import { useUpdateEffect } from 'usehooks-ts';

const IssuesPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [control, refresh] = useState(false);
	const { getIssues, isLoading, refetchAll } = useIssues();

	useEffect(() => {
		refetchAll();
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 75);

		return () => clearTimeout(timeoutId);
	}, [control]);

	/* 	
	//Run the effect to refresh when changing the route 
	// (It would be used to navigate VulnerabilityStatus)
	const location = useLocation();
	useUpdateEffect(() => {
		console.log({ path: location.pathname });
		refresh(!control);
	}, [location]);
	*/

	return (
		<>
			<main className={`issues-list ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<IssueResources
						isLoading={isLoading}
						issues={getIssues()?.issues ?? []}
						refresh={() => refresh(!control)}
					/>
				</section>
				<section className="right">
					<VulnerabilityRisk
						isLoading={isLoading}
						vulnerabilityByRisk={getIssues()?.issueShare ?? {}}
					/>
					<VulnerabilitiesStatus
						vulnerabilityByShare={getIssues()?.issueCondition ?? {}}
					/>

					<button
						onClick={(e) => {
							alert('Generating report');
						}}
						className="btn btn-primary w-full mt-4 mb-4">
						GENERATE REPORT
					</button>

					<IssueReport
						handleFilter={(e, issueClass) => e.preventDefault()}
						isLoading={isLoading}
						issuesClasses={getIssues()?.issueClass ?? {}}
					/>
				</section>
			</main>
		</>
	);
};

export default IssuesPanel;
