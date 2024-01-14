import React, { useEffect, useState } from 'react';
import { Loader } from '../../../../components';
import IssueCreationPanel from './components/IssueCreationPanel';
import { IssueChatDisplay } from './components/IssueChatDisplay';
import './issues.scss';
import { useScript, useTimeout } from 'usehooks-ts';

const IssuesCreation: React.FC<{}> = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [reShow, setReshow] = useState(false);
	const status = useScript('/src/editor-lib/visual/mce/tinymce.min.js', {
		removeOnUnmount: true,
	});

	useEffect(() => {
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [reShow]);

	/*useEffect(() => {
		const script = document.createElement('script');
		script.src = '/src/editor-lib/visual/mce/tinymce.min.js';
		script.async = true;
		script.onload = () => {
			setScriptLoaded(true);
		};
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);*/

	return (
		<>
			{status === 'ready' ? (
				<main
					className={`issue-detail w-full ${showScreen ? 'actived' : ''}`}>
					<section className="issue">
						<IssueCreationPanel
							isLoading={false}
							issues={[]}
							onDone={() => {}}
						/>
					</section>
					<section className="h-full flex-grow">
						<IssueChatDisplay
							isLoading={false}
							selectedIssue={{}}
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
