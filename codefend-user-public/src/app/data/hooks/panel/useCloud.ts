import { useCallback, useEffect, useMemo, useState } from 'react';
import { CloudApp, mapCloudApp, useAuthState, useFetcher } from '../..';
import { CloudService } from '../../services/cloud.service';
import { toast } from 'react-toastify';

const useCloudV2 = () => {
	const { getUserdata } = useAuthState();
	const mapper = (source: any) =>
		source.disponibles.map((app: any) => mapCloudApp(app));
	const { getData, isLoading, fetcher } = useFetcher<CloudApp[]>({
		mapper,
		fetchData: (args: any) => CloudService.getAll(args.companyID as string),
	});
	const [selectedCloud, setSelectedCloudApp] = useState<CloudApp | null>(null);
	const refetch = () => {
		const companyID = getUserdata().companyID;
		if (!companyID) {
			console.error("Error: 'companyID' no está definido en userData.");
			toast.error('User information was not found');
			return;
		}
		fetcher({ companyID });
	};
	useEffect(() => refetch(), []);

	const changeSelected = (cloud: CloudApp | null) => {
		if (cloud?.id === selectedCloud?.id) return;
		setSelectedCloudApp(cloud);
	};

	const isActive = (id: string) => {
		return selectedCloud?.id === id;
	};

	return {
		changeSelected,
		isActive,
		getCloudData: getData,
		selectedCloud,
		isLoading,
		refetch,
	};
};

export const useCloud = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [cloudApp, setCloudApp] = useState([] as CloudApp[]);
	const [selectedCloud, setSelectedCloudApp] = useState<CloudApp | null>(null);

	/* Fetch Cloud Apps */
	const fetchWeb = useCallback((companyID: string) => {
		setLoading(true);

		CloudService.getAll(companyID)
			.then((response: any) => {
				if (response.error !== '0') {
					return;
				}
				const clouds = response.disponibles.map((app: any) =>
					mapCloudApp(app),
				) as CloudApp[];
				setCloudApp(clouds);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	/* Refetch Function. */
	const refetch = () => {
		const companyID = getUserdata()?.companyID;
		fetchWeb(companyID);
	};

	/* First fetch */
	useEffect(() => {
		refetch();
	}, []);

	/* UTILITIES. */
	const getCloudData = (): CloudApp[] => {
		return isLoading ? [] : cloudApp;
	};

	const changeSelected = (cloud: CloudApp | null) => {
		if (cloud?.id === selectedCloud?.id) return;

		setSelectedCloudApp(cloud);
	};

	const isActive = (id: string) => {
		return selectedCloud?.id === id;
	};

	return {
		changeSelected,
		isActive,
		getCloudData,
		selectedCloud,
		isLoading,
		refetch,
	};
};
