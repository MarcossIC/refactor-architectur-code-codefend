import { useCallback, useEffect, useMemo, useState } from 'react';
import { CloudApp, mapCloudApp, useAuthState } from '../..';
import { CloudService } from '../../services/cloud.service';

export const useCloud = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [cloudApp, setCloudApp] = useState([{}] as CloudApp[]);
	const [selectedCloud, setSelectedCloudApp] = useState<CloudApp | null>(null);

	/* Fetch Cloud Apps */
	const fetchWeb = useCallback((companyID: string) => {
		setLoading(true);

		CloudService.getAll(companyID)
			.then((response: any) => {
				if (response.error !== '0') {
					console.log('Error en useCloud');
					throw new Error('Ha ocurrido un error');
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
	const getCloudData = () => {
		return isLoading ? ([] as CloudApp[]) : cloudApp;
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
