import React, { useCallback, useEffect, useState } from 'react';
import {
	LeftArrow,
	PageLoader,
	PageLoaderOverlay,
	SaveIcon,
} from '../../../../../components';
import { useNavigate } from 'react-router';
import { AppEditor } from './AppEditor';
import { Issues, useSaveIssue } from '../../../../../../data';

interface IssueUpdatePanelProps {
	issue: Issues;
	isLoading: boolean;
	onDone: () => void;
}

const IssueUpdatePanel: React.FC<IssueUpdatePanelProps> = (props) => {
	const { newIssue, setNewIssue, save } = useSaveIssue();
	const [isEditable, setEditable] = useState(false);
	const [issueNameUpdate, setIssueNameUpdate] = useState('');
	const navigate = useNavigate();

	const handleIssueUpdate = useCallback(() => {
		setNewIssue((current) => ({
			...current,
			isAddingIssue: true,
			issueName: issueNameUpdate,
			score: props.issue.riskScore,
			issueClass: props.issue.resourceClass,
		}));
		save().then((response) => {
			if (props.onDone) props.onDone();

			navigate(`issues/${response?.newIssue}`);
		});
	}, []);

	const handleKeyDown = useCallback(
		(event: any) => {
			if (event.ctrlKey && (event.key === 's' || event.keyCode === 83)) {
				event.preventDefault();
				handleIssueUpdate();
			}
		},
		[handleIssueUpdate],
	);

	useEffect(() => {
		const iframe = document.getElementById('issue_ifr') as HTMLIFrameElement;
		if (!iframe) return;
		const contentWindow = iframe.contentWindow;
		contentWindow!.addEventListener('keydown', handleKeyDown);

		return () => {
			contentWindow!.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const nameText = () => {
		if (!issueNameUpdate) return props.issue.name;

		const isNameUpdated = issueNameUpdate !== props.issue.name;
		if (isNameUpdated) return issueNameUpdate;
		return props.issue.name;
	};

	const handleIsEditable = () => {
		const iframe = document.getElementById('issue_ifr') as HTMLIFrameElement;
		if (!iframe) return;
		const contentWindow = iframe.contentWindow;
		contentWindow!.addEventListener('keydown', handleKeyDown);

		setEditable(!isEditable);
	};

	return (
		<>
			{props.isLoading ? (
				<>
					<div className="header">
						<div className="back" onClick={() => navigate('/issues')}>
							<LeftArrow />
						</div>
						{isEditable ? (
							<>
								<input
									type="string"
									value={
										issueNameUpdate
											? issueNameUpdate
											: props.issue.name
									}
									onChange={(e) => setIssueNameUpdate(e.target.value)}
								/>
							</>
						) : (
							<>
								<div className="name">{nameText()}</div>
							</>
						)}
						<div
							className={`edit + ${isEditable ? 'on' : 'off'}`}
							onClick={() => handleIsEditable()}>
							{/*<FaSolidPencil />*/}*Pecil*
						</div>
						<div
							className={`save + ${isEditable ? 'on' : 'off'}`}
							onClick={() => {}}>
							<SaveIcon />
						</div>
					</div>
					<div className="info">
						<div>
							Id: <span>{props.issue.id}</span>
						</div>
						<div>
							Class: <span>{props.issue.resourceClass}</span>
						</div>
						<div>
							Resource id: <span>{props.issue.researcherID}</span>
						</div>
						<div>
							Published: <span>{props.issue.createdAt}</span>
						</div>
						<div>
							Author: <span>{props.issue.researcherUsername}</span>
						</div>
						<div>
							Risk score: <span>{props.issue.riskScore}</span>
						</div>
						<div>
							status: <span>{props.issue.condition}</span>
						</div>
					</div>
					<div className="">
						<AppEditor
							isEditable={isEditable}
							initialValue={props.issue.name ?? ''}
							isIssueCreation={newIssue.isAddingIssue}
						/>
					</div>
					{newIssue.isAddingIssue && <PageLoaderOverlay />}
				</>
			) : (
				<>
					<PageLoader />
				</>
			)}
		</>
	);
};

export default IssueUpdatePanel;
