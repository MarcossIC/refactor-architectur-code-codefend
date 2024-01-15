import React, { useEffect, useMemo, useState } from 'react';
import { useOneIssue } from '../../../../../../data';
import { IssueChatDisplay } from '../components/IssueChatDisplay';
import { useParams } from 'react-router';
import IssueUpdatePanel from '../components/IssueUpdatePanel';

const IssueUpdate: React.FC<{}> = () => {
	const { getIssues, isLoading, refetchOne } = useOneIssue();
	const [showScreen, setShowScreen] = useState(false);
	const [control, refresh] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		refetchOne(id as string);
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [control]);

	return (
		<>
			<main className={`issue-detail w-full ${showScreen ? 'actived' : ''}`}>
				<section className="issue">
					<IssueUpdatePanel
						completeIssue={getIssues()}
						isLoading={isLoading}
					/>
				</section>
				<section className="h-full flex-grow">
					<IssueChatDisplay
						isLoading={isLoading}
						selectedIssue={getIssues().issue}
						refetch={() => refresh(!control)}
					/>
				</section>
			</main>
		</>
	);
};

export default IssueUpdate;
