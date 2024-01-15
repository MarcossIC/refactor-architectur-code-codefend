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
	Issues,
	OneIssue,
	useSaveIssue,
} from '../../../../../../data';

interface IssueUpdatePanelProps {
	completeIssue: OneIssue;
	isLoading: boolean;
}

const IssueUpdatePanel: React.FC<IssueUpdatePanelProps> = ({
	completeIssue,
	isLoading,
}) => {
	const { newIssue, setNewIssue, save } = useSaveIssue();
	const [isEditable, setEditable] = useState(false);
	const [issueNameUpdate, setIssueNameUpdate] = useState('');
	const navigate = useNavigate();
	const safelyIssue = (): CompleteIssue => {
		const issue = completeIssue ? completeIssue : null;
		const result = issue ? issue?.issue : null;
		return result ?? ({} as CompleteIssue);
	};
	const isEmpty = () => {
		return safelyIssue() && 'riskScore' in safelyIssue();
	};

	const handleIssueUpdate = useCallback(() => {
		setNewIssue((current) => ({
			...current,
			isAddingIssue: true,
			issueName: issueNameUpdate,
			score: safelyIssue().riskScore,
			issueClass: safelyIssue()?.resourceClass,
		}));
		save().then((response) => {
			navigate(`/issues`);
		});
	}, [safelyIssue, save]);

	const handleKeyDown = (event: any) => {
		if (event.ctrlKey && (event.key === 's' || event.keyCode === 83)) {
			event.preventDefault();
			handleIssueUpdate();
		}
	};

	const nameText = () => {
		if (!issueNameUpdate) return safelyIssue().name;

		const isNameUpdated = issueNameUpdate !== safelyIssue().name;
		if (isNameUpdated) return issueNameUpdate;
		return safelyIssue().name;
	};

	useEffect(() => {
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
						fallback={<div className="name flex-1">{nameText()}</div>}>
						<input
							type="string"
							className="flex-1"
							value={
								issueNameUpdate ? issueNameUpdate : safelyIssue().name
							}
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
						initialValue={safelyIssue().name ?? ''}
						isIssueCreation={newIssue.isAddingIssue}
					/>
				</div>
				<Show when={newIssue.isAddingIssue}>
					<PageLoaderOverlay />
				</Show>
			</>
		</Show>
	);
};

export default IssueUpdatePanel;
