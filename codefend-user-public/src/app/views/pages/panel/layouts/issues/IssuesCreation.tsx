import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../../../components';
import IssueCreationPanel from './components/IssueCreationPanel';
import { IssueChatDisplay } from './components/IssueChatDisplay';
import './issues.scss';

const IssuesCreation: React.FC<{}> = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [reShow, setReshow] = useState(false);
	const [isScriptLoad, setScriptLoaded] = useState(false);

	useEffect(() => {
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [reShow]);

	let script = useMemo(() => document.createElement('script'), []);
	useEffect(() => {
		script = document.createElement('script');
		script.src = '/src/editor-lib/visual/mce/tinymce.min.js';
		script.async = true;
		script.onload = () => {
			setScriptLoaded(true);
		};
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<>
			{isScriptLoad ? (
				<main
					className={`issue-detail w-full ${showScreen ? 'actived' : ''}`}>
					<section className="issue">
						<IssueCreationPanel issues={[]} onDone={() => {}} />
					</section>
					<section className="h-full flex-grow">
						<IssueChatDisplay
							selectedIssue={{}}
							isLoading={false}
							refetch={() => {}}
						/>
					</section>
				</main>
			) : (
				<>
					<Loader />
				</>
			)}
		</>
	);
};

export default IssuesCreation;
