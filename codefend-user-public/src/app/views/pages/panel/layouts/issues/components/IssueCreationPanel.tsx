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
} from '../../../../../../data';
import { getTinyEditorContent } from '../../../../../../../editor-lib/';
import { toast } from 'react-toastify';

interface Props {
	issues: Issues[];
	onDone: () => void;
}

const IssueCreationPanel: React.FC<Props> = (props) => {
	const [issueName, setIssueName] = useState('');
	const [score, setScore] = useState('');
	const [issueClass, setIssueClass] = useState('');
	const [isAddingIssue, setIsAddingIssue] = useState(false);
	const { showModal, setShowModal } = useModal();
	const { getUserdata } = useAuthState();
	const navigate = useNavigate();

	const handleIssueUpdate = useCallback(async () => {
		// e.preventDefault();
		const _editorContent = getTinyEditorContent('issue');
		if (!_editorContent) {
			toast.error('Invalid content, please add content using the editor');
			return;
		}

		if (!score) {
			toast.error('Invalid score');
			return;
		}

		if (!issueName || issueName.length == 0 || issueName.length > 100) {
			toast.error('Invalid name');
			return;
		}

		if (
			![
				'web',
				'mobile',
				'cloud',
				'lan',
				'source',
				'social',
				'research',
			].includes(issueClass)
		) {
			toast.error('Invalid issue type');
			return;
		}

		setIsAddingIssue(true);

		const requestParams = {
			risk_score: score,
			name: issueName,
			resource_class: issueClass,
			researcher_username: getUserdata()?.username,
			main_desc: _editorContent,
		};

		IssueService.add(requestParams, '')
			.then((response: any) => {
				const newIssueId = response?.new_issue?.id ?? '';
				props.onDone();
				setShowModal(!showModal);
				toast.success('Successfully Added Issue...');
				if (newIssueId) {
					navigate(`issues/${newIssueId}`);
				}
			})
			.finally(() => setIsAddingIssue(false));
	}, [issueName, score, issueClass]);

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
					value={issueName}
					onChange={(e) => setIssueName(e.target.value)}
				/>

				<div onClick={() => {}} className={`save on`}>
					<SaveIcon />
				</div>
			</div>

			<div className="info">
				<div className="flex items-center">
					<p>Class:</p>
					<select
						onChange={(e) => {
							setIssueClass(e.target.value);
						}}
						className="  py-3 bg-white focus:outline-none"
						value={issueClass}
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
							setScore(e.target.value);
						}}
						className=" py-3 bg-whitefocus:outline-none "
						value={score}
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

			{isAddingIssue && <PageLoaderOverlay />}
		</>
	);
};

export default IssueCreationPanel;
