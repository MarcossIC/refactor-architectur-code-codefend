import React, { useEffect, useState } from 'react';
import {
	LeftArrow,
	PageLoaderOverlay,
	SaveIcon,
} from '../../../../../components';
import { useNavigate } from 'react-router';
import { AppEditor } from './AppEditor';
import { Issues } from '../../../../../../data';

interface Props {
	issues: Issues[];
}

export const IssueCreationPanel: React.FC<Props> = (props) => {
	const [issueName, setIssueName] = useState('');
	const [score, setScore] = useState('');
	const [issueClass, setIssueClass] = useState('');
	const [isAddingIssue, setIsAddingIssue] = useState(false);
	const navigate = useNavigate();

	const handleKeyDown = (event: any) => {
		if (event.ctrlKey && (event.key === 's' || event.keyCode === 83)) {
			event.preventDefault();
			//handleIssueUpdate();
		}
	};

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
						required>
						<option value="" disabled selected>
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
						required>
						<option value="" disabled selected>
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
