import { useCallback, useEffect, useState } from 'react';
import { WebApplicationService } from '../services/webapplication.service';
import {
	User,
	WebapplicationProps,
	mapToWebresourceProps,
	useAuthState,
} from '..';

export const useWebapplication = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [hasFetch, setHasFetch] = useState<boolean>(true);
	const [webResources, setWebResources] = useState<WebapplicationProps>(
		{} as WebapplicationProps,
	);

	const fetchWeb = useCallback(() => {
		const user = getUserdata() as User;
		const companyID = user?.companyID as string;
		setLoading(true);

		WebApplicationService.get(companyID)
			.then((response: any) =>
				setWebResources(mapToWebresourceProps(response)),
			)
			.finally(() => {
				setLoading(false);
			});
	}, [getUserdata, setWebResources, setLoading]);

	useEffect(() => {
		if (hasFetch) {
			fetchWeb();
			setHasFetch(false);
		}
	}, [hasFetch, fetchWeb, setHasFetch]);

	const refetch = useCallback(() => setHasFetch(true), [setHasFetch]);

	return { webResources, isLoading, refetch };
};
