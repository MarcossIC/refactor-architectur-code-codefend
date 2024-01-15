import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	AllIssues,
	FetchPattern,
	OneIssue,
	mapAllIssues,
	mapOneIssue,
	useAuthState,
} from '../..';
import { IssueService } from '../../services/issues.service';
import { getTinyEditorContent } from '../../../../editor-lib';
import { toast } from 'react-toastify';

export const useIssues = () => {
	const { getUserdata } = useAuthState();
	const [{ data, error, isLoading }, dispatch] = useState<
		FetchPattern<AllIssues>
	>({
		data: null,
		error: null,
		isLoading: false,
	});

	const fetchAll = useCallback((companyID: string) => {
		dispatch((state: any) => ({
			...state,
			isLoading: true,
		}));
		IssueService.getAll(companyID)
			.then((response: any) =>
				dispatch({
					data: mapAllIssues(response),
					error: null,
					isLoading: false,
				}),
			)
			.catch((error) => dispatch({ data: null, error, isLoading: false }));
	}, []);

	const refetchAll = () => {
		const companyID = getUserdata()?.companyID;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		fetchAll(companyID);
	};

	const getIssues = (): AllIssues => {
		const issuesData = isLoading ? ({} as AllIssues) : data;
		return issuesData ?? ({} as AllIssues);
	};

	return { getIssues, isLoading, refetchAll };
};

export const useSaveIssue = () => {
	const [newIssue, setNewIssue] = useState({
		issueName: '',
		score: '',
		issueClass: '',

		isAddingIssue: false,
	});
	const { getUserdata } = useAuthState();

	const save = useCallback(async () => {
		const _editorContent = getTinyEditorContent('issue');
		if (!_editorContent) {
			toast.error('Invalid content, please add content using the editor');
			return;
		}

		if (!newIssue.score) {
			toast.error('Invalid score');
			return;
		}

		if (
			!newIssue.issueName ||
			newIssue.issueName.length == 0 ||
			newIssue.issueName.length > 100
		) {
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
			].includes(newIssue.issueClass)
		) {
			toast.error('Invalid issue type');
			return;
		}

		setNewIssue((current) => ({ ...current, isAddingIssue: false }));

		const requestParams = {
			risk_score: newIssue.score,
			name: newIssue.issueName,
			resource_class: newIssue.issueClass,
			researcher_username: getUserdata()?.username,
			main_desc: _editorContent,
		};

		return IssueService.add(requestParams, '')
			.then((response: any) => {
				const newIssueId = response?.new_issue?.id ?? '';
				toast.success('Successfully Added Issue...');
				return { newIssue };
			})
			.finally(() =>
				setNewIssue((current) => ({ ...current, isAddingIssue: false })),
			);
	}, [newIssue]);

	return { newIssue, setNewIssue, save };
};

export const useOneIssue = () => {
	const { getUserdata } = useAuthState();
	const [{ data, error, isLoading }, dispatch] = useState<
		FetchPattern<OneIssue>
	>({
		data: null,
		error: null,
		isLoading: false,
	});

	const fetchOne = useCallback((companyID: string, selectedID: string) => {
		dispatch((state: any) => ({
			...state,
			isLoading: true,
		}));
		IssueService.getOne(selectedID, companyID)
			.then((response: any) =>
				dispatch({
					data: mapOneIssue(response),
					error: null,
					isLoading: false,
				}),
			)
			.catch((error) => dispatch({ data: null, error, isLoading: false }));
	}, []);

	const refetchOne = (selectedID: string) => {
		const companyID = getUserdata()?.companyID;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		fetchOne(companyID, selectedID);
	};

	const getIssues = (): OneIssue => {
		const empty = { issue: null, company: null } as OneIssue;
		const issuesData = isLoading ? empty : data;
		return issuesData ?? empty;
	};

	return { getIssues, isLoading, refetchOne };
};

export const useDeleteIssue = () => {
	const { getUserdata } = useAuthState();
	const fetchDelete = (issueId: string, companyID: string) => {
		return IssueService.delete(issueId, companyID);
	};

	const handleDelete = (deletedIssueId: string) => {
		const companyID = getUserdata()?.companyID;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		return fetchDelete(deletedIssueId, companyID).then(() =>
			toast.success('Successfully deleted Issue...'),
		);
	};

	return { handleDelete };
};
