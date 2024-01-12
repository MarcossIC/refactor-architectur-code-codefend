import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../../../components';
import { useOneIssue } from '../../../../../data';
import { IssueChatDisplay } from './components/IssueChatDisplay';
import { useParams } from 'react-router';
import IssueUpdatePanel from './components/IssueUpdatePanel';

const IssuesCreation: React.FC<{}> = () => {
	const { getIssues, isLoading, refetchOne } = useOneIssue();
	const [showScreen, setShowScreen] = useState(false);
	const [reShow, setReshow] = useState(false);
	const { ref } = useParams();

	useEffect(() => {
		refetchOne(ref as string);
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [reShow]);

	return (
		<>
			<main className={`issue-detail w-full ${showScreen ? 'actived' : ''}`}>
				<section className="issue">
					<IssueUpdatePanel issue={getIssues()} isLoading={isLoading} />
				</section>
				<section className="h-full flex-grow">
					<IssueChatDisplay
						isLoading={isLoading}
						selectedIssue={getIssues()}
						refetch={() => setReshow(!reShow)}
					/>
				</section>
			</main>
		</>
	);
};

export default IssuesCreation;
