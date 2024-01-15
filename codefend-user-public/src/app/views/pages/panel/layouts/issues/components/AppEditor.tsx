import React, { useEffect, useMemo } from 'react';
import addTinyMce, {
	getTinyEditorContent,
	setMode,
} from '../../../../../../../editor-lib/';

interface AppEditorProps {
	onUpdateIssue?: any;
	initialValue: any;
	isEditable: boolean;
	isIssueCreation?: any;
}
export const AppEditor: React.FC<AppEditorProps> = ({
	initialValue,
	onUpdateIssue,
	isEditable,
}) => {
	const emptyUpdateIssueText = useMemo(
		() => '<p>Please add issues here...</p>',
		[],
	);

	const setEditorMode = () => {
		if (isEditable) {
			setMode('issue', 'design');
		} else {
			setMode('issue', 'readonly');
		}
	};

	useEffect(() => {
		const checkTinyMCE = () => {
			const defaultValue = Boolean(initialValue)
				? initialValue
				: emptyUpdateIssueText;
			addTinyMce(defaultValue);
		};

		checkTinyMCE();
	}, []);

	useEffect(() => {
		setEditorMode();
	}, [isEditable]);

	return (
		<>
			<textarea name="name" id="issue" rows={4} cols={40}></textarea>
		</>
	);
};
