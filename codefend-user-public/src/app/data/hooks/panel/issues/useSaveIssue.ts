import { useCallback, useState } from 'react';
import { useAuthState } from '../../../';
import { IssueService } from '../../../services/issues.service';
import { getTinyEditorContent } from '../../../../../editor-lib';
import { toast } from 'react-toastify';

export interface SaveIssue {
	issueName: string;
	score: string;
	issueClass: string;
	isAddingIssue: boolean;
}

export const useSaveIssue = () => {
	const { getUserdata } = useAuthState();
	const [newIssue, dispatch] = useState<SaveIssue>({
		issueName: '',
		score: '',
		issueClass: '',

		isAddingIssue: false,
	});

	const fetchSave = useCallback(
		(companyID: string) => {
			console.log({ newIssue });
			dispatch((state: SaveIssue) => ({
				...state,
				isAddingIssue: true,
			}));
			console.log({ newIssue });
			const _editorContent = getTinyEditorContent('issue');
			if (!_editorContent) {
				toast.error('Invalid content, please add content using the editor');
				dispatch((state: SaveIssue) => ({
					...state,
					isAddingIssue: false,
				}));
				return;
			}

			if (newIssue.score === null || newIssue.score === '') {
				toast.error('Invalid score');
				dispatch((state: SaveIssue) => ({
					...state,
					isAddingIssue: false,
				}));
				return;
			}

			if (
				!newIssue.issueName ||
				newIssue.issueName.length == 0 ||
				newIssue.issueName.length > 100
			) {
				toast.error('Invalid name');
				dispatch((state: SaveIssue) => ({
					...state,
					isAddingIssue: false,
				}));
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
				].includes(newIssue.issueClass)
			) {
				dispatch((state: SaveIssue) => ({
					...state,
					isAddingIssue: false,
				}));
				toast.error('Invalid issue type');
				return;
			}
			const params = {
				risk_score: newIssue.score,
				name: newIssue.issueName,
				resource_class: newIssue.issueClass,
				researcher_username: getUserdata()?.username,
				main_desc: _editorContent,
			};
			return IssueService.add(params, companyID)
				.then((response: any) => {
					if (response.response === 'error') {
						throw new Error(response.message);
					}
					dispatch({
						issueName: '',
						score: '',
						issueClass: '',
						isAddingIssue: false,
					});
					toast.success('Successfully Added Issue...');

					return { newIssue };
				})
				.catch((error: Error) => {
					toast.error(error.message);
				})
				.finally(() =>
					dispatch((state: SaveIssue) => ({
						...state,
						isAddingIssue: false,
					})),
				);
		},
		[newIssue],
	);

	const save = async () => {
		const companyID = getUserdata()?.companyID;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		return fetchSave(companyID);
	};

	return { newIssue, dispatch, save };
};
