import { useCallback, useEffect, useMemo, useState } from 'react';
import { AllIssues, mapAllIssues, useAuthState } from '../..';
import { IssueService } from '../../services/issues.service';

export const useIssues = () => {
	const [issues, setIssues] = useState({} as AllIssues);
	const [isLoading, setLoading] = useState(true);
	const { getUserdata } = useAuthState();

	const fetchAll = useCallback(
		(companyID: string) => {
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
		},
		[getUserdata],
	);
	const refetchAll = useCallback(() => {
		const companyID = getUserdata()?.companyID;
		fetchAll(companyID);
	}, [getUserdata]);

	useEffect(() => {
		refetchAll();
	}, []);

	const getIssues = useMemo(() => {
		const issuesData = isLoading ? ({} as AllIssues) : issues;
		return issuesData ?? {};
	}, [isLoading, issues]);

	return { getIssues, isLoading, refetchAll };
};
