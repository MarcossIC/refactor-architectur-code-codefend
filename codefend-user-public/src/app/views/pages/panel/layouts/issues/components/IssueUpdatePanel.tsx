import React, { useCallback, useEffect, useState } from 'react';
import {
	LeftArrow,
	PageLoader,
	PageLoaderOverlay,
	PencilIcon,
	SaveIcon,
	Show,
} from '../../../../../components';
import { useNavigate } from 'react-router';
import { AppEditor } from './AppEditor';
import {
	CompleteIssue,
	OneIssue,
	useUpdateIssue,
} from '../../../../../../data';

interface IssueUpdatePanelProps {
	completeIssue: OneIssue;
	isLoading: boolean;
}

const IssueUpdatePanel: React.FC<IssueUpdatePanelProps> = ({
	completeIssue,
	isLoading,
}) => {
	const navigate = useNavigate();
	const { updatedIssue, dispatch, update } = useUpdateIssue();
	const [isEditable, setEditable] = useState(false);

	const safelyIssue = (): CompleteIssue => {
		const result = completeIssue.issue ? completeIssue.issue : null;
		return result ?? ({} as CompleteIssue);
	};

	const isEmpty = () => {
		return safelyIssue() && 'riskScore' in safelyIssue();
	};

	const handleIssueUpdate = useCallback(() => {
		dispatch((current) => ({
			...current,
			issueName: issueNameUpdate,
			score: safelyIssue().riskScore,
			issueClass: safelyIssue()?.resourceClass,
		}));
		update().then((response: any) => {
			setEditable(false);
			//navigate(`/issues`);
		});
	}, [safelyIssue, update]);

	const handleKeyDown = (event: any) => {
		if (event.ctrlKey && (event.key === 's' || event.keyCode === 83)) {
			event.preventDefault();
			handleIssueUpdate();
		}
	};
	const [issueNameUpdate, setIssueNameUpdate] = useState('');
	useEffect(() => {
		setIssueNameUpdate(completeIssue.issue?.name!);
		console.log({ completeIssue });
		console.log({ issueNameUpdate });

		const iframe = document.getElementById('issue_ifr') as HTMLIFrameElement;
		if (!iframe) return;
		const contentWindow = iframe.contentWindow;
		contentWindow!.addEventListener('keydown', handleKeyDown);
		setEditable(!isEditable);
		return () => {
			contentWindow!.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<Show when={!isLoading} fallback={<PageLoader />}>
			<>
				<div className="header">
					<div className="back" onClick={() => navigate('/issues')}>
						<LeftArrow />
					</div>
					<Show
						when={isEditable}
						fallback={
							<div className="name flex-1">{issueNameUpdate}</div>
						}>
						<input
							type="string"
							className="flex-1"
							value={issueNameUpdate}
							onChange={(e) => setIssueNameUpdate(e.target.value)}
						/>
					</Show>
					<div className="flex !p-0">
						<div
							className={`edit edit_btn  ${isEditable ? 'on' : 'off'}`}
							onClick={() => setEditable(!isEditable)}>
							<PencilIcon />
						</div>
						<div
							className={`save edit_btn ${isEditable ? 'on' : 'off'}`}
							onClick={() => handleIssueUpdate()}>
							<SaveIcon />
						</div>
					</div>
				</div>
				<div className="info">
					<div>
						Id: <span>{safelyIssue().id}</span>
					</div>
					<div>
						Class: <span>{safelyIssue().resourceClass}</span>
					</div>
					<div>
						Resource id: <span>{safelyIssue().researcherID}</span>
					</div>
					<div>
						Published: <span>{safelyIssue().createdAt}</span>
					</div>
					<div>
						Author: <span>{safelyIssue().researcherUsername}</span>
					</div>
					<div>
						Risk score: <span>{safelyIssue().riskScore}</span>
					</div>
					<div>
						status: <span>{safelyIssue().condition}</span>
					</div>
				</div>
				<div className="">
					<AppEditor
						isEditable={isEditable}
						initialValue={safelyIssue() ?? ''}
						isIssueCreation={updatedIssue.isAddingIssue}
					/>
				</div>
				<Show when={updatedIssue.isAddingIssue}>
					<PageLoaderOverlay />
				</Show>
			</>
		</Show>
	);
};

export default IssueUpdatePanel;
