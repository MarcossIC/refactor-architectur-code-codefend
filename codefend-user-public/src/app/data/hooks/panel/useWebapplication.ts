import { useCallback, useEffect, useState } from 'react';
import { WebApplicationService } from '../../services/webapplication.service';
import {
	User,
	WebapplicationProps,
	mapToWebresourceProps,
	useAuthState,
	useFetcher,
} from '../..';

const useWebApplicationV2 = () => {
	const { getUserdata } = useAuthState();

	const { getData, isLoading, fetcher } = useFetcher<WebapplicationProps>({
		mapper: mapToWebresourceProps,
		fetchData: (args: any) => WebApplicationService.get(args.companyID),
	});
	const refetch = () => {
		const companyID = getUserdata()?.companyID as string;
		fetcher(companyID);
	};
	useEffect(() => refetch(), []);

	return { webResources: getData(), isLoading, refetch };
};

export const useWebapplication = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [webResources, setWebResources] = useState<WebapplicationProps>(
		{} as WebapplicationProps,
	);

	//GET Webresourcer from API
	const fetchWeb = useCallback((companyID: string) => {
		setLoading(true);

		WebApplicationService.get(companyID)
			.then((response: any) =>
				setWebResources(mapToWebresourceProps(response)),
			)
			.finally(() => {
				setLoading(false);
			});
	}, []);

	//Refetch Data
	const refetch = () => {
		const user = getUserdata() as User;
		const companyID = user?.companyID as string;
		fetchWeb(companyID);
	};

	//First fetch
	useEffect(() => {
		refetch();
	}, []);

	return { webResources, isLoading, refetch };
};
