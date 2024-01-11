import React, { useEffect, useMemo } from 'react';
import addTinyMce, {
	getTinyEditorContent,
	setMode,
} from '../../../../../../../editor-lib/';

interface AppEditorProps {
	onUpdateIssue?: any;
	initialValue: any;
	isEditable: any;
	isIssueCreation: any;
}
export const AppEditor: React.FC<AppEditorProps> = ({
	initialValue,
	onUpdateIssue,
	isEditable,
	isIssueCreation,
}) => {
	const emptyUpdateIssueText = useMemo(
		() => '<p>Please add issues here...</p>',
		[],
	);

	const updateIssue = () => {
		const _editorContent = getTinyEditorContent('issue');
		onUpdateIssue(_editorContent);
	};

	const setEditorMode = () => {
		if (isEditable()) {
			setMode('issue', 'design');
		} else {
			setMode('issue', 'readonly');
		}
	};

	useEffect(() => {
		const defaultValue = Boolean(initialValue)
			? initialValue
			: emptyUpdateIssueText;
		addTinyMce(defaultValue);
	}, []);

	useEffect(() => {
		setEditorMode();
	}, [isEditable]);

	useEffect(() => {
		if (isIssueCreation) {
			setTimeout(() => {
				setMode('issue', 'design');
			}, 300);
		}
	}, []);

	return (
		<>
			<textarea name="name" id="issue" rows={4} cols={40}></textarea>
		</>
	);
};
