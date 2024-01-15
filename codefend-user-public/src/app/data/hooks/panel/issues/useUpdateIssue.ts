import { useCallback, useState } from 'react';
import { IssueService, useAuthState } from '../../../';
import { toast } from 'react-toastify';
import { getTinyEditorContent } from '../../../../../editor-lib';

export interface UpdateIssue {
	id: string;
	issueName: string;
	score: string;

	isAddingIssue: false;
}

const validateNewIssue = (validate: boolean, message: string) => {
	if (validate) {
		toast.error(message);
		return false;
	}
	return true;
};

export const useUpdateIssue = () => {
	const { getUserdata } = useAuthState();
	const [updatedIssue, dispatch] = useState<UpdateIssue>({
		id: '',
		issueName: '',
		score: '',

		isAddingIssue: false,
	});

	const fetchSave = useCallback(
		(companyID: string) => {
			console.log({ updatedIssue });
			const _editorContent = getTinyEditorContent('issue');
			if (
				!validateNewIssue(
					!_editorContent,
					'Invalid content, please add content using the editor',
				)
			)
				return;

			dispatch((state: any) => ({
				...state,
				isAddingIssue: true,
			}));

			const params = {
				id: updatedIssue.id,
				main_desc: _editorContent,
				name: updatedIssue.issueName,
				risk_score: updatedIssue.score,
			};
			return IssueService.modify(params, companyID)
				.then((response: any) => {
					if (response.response === 'error')
						throw new Error(response.message);

					toast.success('Successfully Added Issue...');
					return { updatedIssue };
				})
				.catch((error: Error) => {
					toast.error(error.message);
				})
				.finally(() =>
					dispatch((state: any) => ({
						...state,
						isAddingIssue: false,
					})),
				);
		},
		[updatedIssue],
	);

	const update = async () => {
		const companyID = getUserdata()?.companyID;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		return fetchSave(companyID);
	};

	return { updatedIssue, dispatch, update };
};
