import React, { useEffect, useState } from 'react';
import { useIssues } from '../../../../../data';
import {
	VulnerabilitiesStatus,
	VulnerabilityRisk,
} from '../../../../components';
import { IssueReport } from './components/IssueReport';
import { IssueResources } from './components/IssueResources';
import '../../../../styles/table.scss';
import './issues.scss';

const IssuesPanel: React.FC = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [reShow, setReshow] = useState(false);
	const { getIssues, isLoading, refetchAll } = useIssues();

	useEffect(() => {
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [reShow]);

	return (
		<>
			<main className={`issues-list ${showScreen ? 'actived' : ''}`}>
				<section className="left">
					<IssueResources
						isLoading={isLoading}
						issues={getIssues().issues ?? []}
						delete={(id: string) => {
							refetchAll();
							setReshow(!reShow);
						}}
					/>
				</section>
				<section className="right">
					<VulnerabilityRisk
						isLoading={isLoading}
						vulnerabilityByRisk={getIssues().issueShare ?? {}}
					/>
					<VulnerabilitiesStatus
						vulnerabilityByShare={getIssues().issueCondition ?? {}}
					/>

					<button
						onClick={(e) => {
							alert('Generating report');
						}}
						className="btn btn-primary w-full mt-4 mb-4">
						GENERATE REPORT
					</button>

					<IssueReport
						handleFilter={(e, issueClass) => {
							e.preventDefault();
						}}
						isLoading={isLoading}
						issuesClasses={getIssues().issueClass ?? {}}
					/>
				</section>
			</main>
		</>
	);
};

export default IssuesPanel;
