import { useCallback, useEffect, useMemo, useState } from 'react';
import { AllIssues, mapAllIssues, useAuthState, useFetcher } from '../..';
import { IssueService } from '../../services/issues.service';
import { getTinyEditorContent } from '../../../../editor-lib';
import { toast } from 'react-toastify';

const useIssuesV2 = () => {
	const fetchData = (args: any) => IssueService.getAll(args.companyID);

	const { getData, isLoading, fetcher, error } = useFetcher<AllIssues>({
		mapper: mapAllIssues,
		fetchData,
	});
	const { getUserdata } = useAuthState();
	const refetchAll = () => {
		const companyID = getUserdata()?.companyID;
		fetcher(companyID);
		if (error !== null) console.log({ error });
	};
	useEffect(() => {
		refetchAll();
	}, []);

	return { getIssues: getData, isLoading, refetchAll };
};

export const useIssues = () => {
	const [issues, setIssues] = useState({} as AllIssues);
	const [isLoading, setLoading] = useState(true);
	const { getUserdata } = useAuthState();

	const fetchAll = useCallback((companyID: string) => {
		setLoading(true);
		IssueService.getAll(companyID)
			.then((response: any) => {
				if (response !== 'success') {
				}

				setIssues(mapAllIssues(response));
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const refetchAll = () => {
		const companyID = getUserdata()?.companyID;
		fetchAll(companyID);
	};

	useEffect(() => {
		refetchAll();
	}, []);

	const getIssues = () => {
		const issuesData = isLoading ? ({} as AllIssues) : issues;
		return issuesData ?? {};
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
	const [issues, setIssues] = useState({} as any);
	const [isLoading, setLoading] = useState(true);
	const { getUserdata } = useAuthState();

	const fetchOne = useCallback((companyID: string, selectedID: string) => {
		setLoading(true);
		IssueService.getOne(selectedID, companyID)
			.then((response: any) => {
				if (response !== 'success') {
				}
				console.log({ response });
				setIssues(mapAllIssues(response));
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const refetchOne = (selectedID: string) => {
		const companyID = getUserdata()?.companyID;
		fetchOne(companyID, selectedID);
	};

	const getIssues = () => {
		const issuesData = isLoading ? ({} as any) : issues;
		return issuesData ?? {};
	};

	return { getIssues, isLoading, refetchOne };
};
