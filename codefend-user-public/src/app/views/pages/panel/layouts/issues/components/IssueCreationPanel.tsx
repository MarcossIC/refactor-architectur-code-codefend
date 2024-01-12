import React, { useCallback, useEffect, useState } from 'react';
import {
	LeftArrow,
	PageLoaderOverlay,
	SaveIcon,
} from '../../../../../components';
import { useNavigate } from 'react-router';
import { AppEditor } from './AppEditor';
import {
	IssueService,
	Issues,
	useAuthState,
	useModal,
	useSaveIssue,
} from '../../../../../../data';
import { getTinyEditorContent } from '../../../../../../../editor-lib/';
import { toast } from 'react-toastify';

interface IssueCreationPanelProps {
	issues: Issues[];
	onDone: () => void;
}

const IssueCreationPanel: React.FC<IssueCreationPanelProps> = (props) => {
	const { newIssue, setNewIssue, save } = useSaveIssue();
	const navigate = useNavigate();

	const handleIssueUpdate = useCallback(() => {
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

	return (
		<>
			<div className="header">
				<div className="back" onClick={() => navigate('/issues')}>
					<LeftArrow />
				</div>
				<input
					className="w-[90%] h-full"
					placeholder="Add Issue title here..."
					value={newIssue.issueName}
					onChange={(e) =>
						setNewIssue((current) => ({
							...current,
							issueName: e.target.value,
						}))
					}
				/>

				<div onClick={() => {}} className={`save on`}>
					<SaveIcon />
				</div>
			</div>

			<div className="info">
				<div className="flex items-center">
					<p>Class:</p>
					<select
						onChange={(e) =>
							setNewIssue((current) => ({
								...current,
								issueClass: e.target.value,
							}))
						}
						className="  py-3 bg-white focus:outline-none"
						value={newIssue.issueClass}
						required>
						<option value="" disabled>
							Select Class
						</option>
						<option value="web">web</option>
						<option value="mobile">mobile</option>
						<option value="cloud">cloud</option>
						<option value="lan">internal network</option>
						<option value="source">source code</option>
						<option value="social">social & osint</option>
						<option value="research">research</option>
					</select>
				</div>

				<div className="flex items-center">
					<p>Risk score:</p>
					<select
						onChange={(e) => {
							setNewIssue((current) => ({
								...current,
								score: e.target.value,
							}));
						}}
						className=" py-3 bg-whitefocus:outline-none "
						value={newIssue.score}
						required>
						<option value="" disabled>
							Select Score
						</option>
						<option value="5">critical</option>
						<option value="4">elevated</option>
						<option value="3">medium</option>
						<option value="2">low</option>
						<option value="1">intel</option>
					</select>
				</div>
			</div>

			<div className="">
				<AppEditor
					initialValue={props.issues ?? ''}
					isEditable={() => true}
					isIssueCreation
				/>
			</div>

			{newIssue.isAddingIssue && <PageLoaderOverlay />}
		</>
	);
};

export default IssueCreationPanel;
