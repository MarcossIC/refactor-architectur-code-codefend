import { useCallback, useEffect, useState } from 'react';
import { WebApplicationService } from '../services/webapplication.service';
import { WebapplicationProps, mapToWebresourceProps, useAuthState } from '..';

export const useWebapplication = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [hasFetch, setHasFetch] = useState<boolean>(true);
	const [webResources, setWebResources] = useState<WebapplicationProps>(
		{} as WebapplicationProps,
	);

	useEffect(() => {
		if (hasFetch) {
			const companyID = getUserdata()?.companyID as string;
			setLoading(true);

			WebApplicationService.get(companyID)
				.then((response: any) =>
					setWebResources(mapToWebresourceProps(response)),
				)
				.finally(() => {
					setLoading(false);
					setHasFetch(false);
				});
		}
	}, [hasFetch]);

	const refetch = useCallback(() => setHasFetch(true), []);

	return { webResources, isLoading, refetch };
};
