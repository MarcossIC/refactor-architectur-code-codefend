import { useCallback, useEffect, useMemo, useState } from 'react';
import { AllIssues, mapAllIssues, useAuthState } from '..';
import { IssueService } from '../services/issues.service';

export const useIssues = () => {
	const [issues, setIssues] = useState({} as AllIssues);
	const [isLoading, setLoading] = useState(true);
	const { getUserdata } = useAuthState();

	const fetchAll = useCallback(() => {
		const companyID = getUserdata()?.companyID;
		setLoading(true);
		IssueService.getAll(companyID as string)
			.then((response: any) => {
				if (response !== 'success') {
				}

				setIssues(mapAllIssues(response));
			})
			.finally(() => {
				setLoading(false);
			});
	}, [getUserdata]);

	useEffect(() => {
		fetchAll();
	}, []);

	const refetchAll = useCallback(() => fetchAll(), [fetchAll]);

	const getIssues = useMemo(() => {
		const issuesData = isLoading ? ({} as AllIssues) : issues;
		return issuesData as AllIssues;
	}, [isLoading, issues]);

	return { getIssues, isLoading, refetchAll };
};
