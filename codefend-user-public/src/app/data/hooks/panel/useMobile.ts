import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	MobileApp,
	MobileProps,
	MobileService,
	MobileUnique,
	User,
	mapMobileAppsArray,
	mapMobileProps,
	mobileUniqueProps,
	useAuthState,
	useFetcher,
} from '../..';
import { toast } from 'react-toastify';

const useMobileV2 = () => {
	const { getUserdata } = useAuthState();

	const { getData, isLoading, fetcher } = useFetcher<MobileApp[]>({
		mapper: mapMobileAppsArray,
		fetchData: (args: any) => MobileService.getAll(args.companyID as string),
	});

	const refetch = () => {
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			console.error("Error: 'companyID' no está definido en userData.");
			toast.error('User information was not found');
			return;
		}
		fetcher({ companyID });
	};

	const [selectedMobileApp, setSelectedMobileApp] = useState<MobileApp | null>(
		null,
	);

	useEffect(() => refetch(), []);

	const selectMobile = (mobile: MobileApp) => {
		if (mobile.id === selectedMobileApp?.id) return;
		setSelectedMobileApp(mobile);
	};

	const isCurrentMobileSelected = useCallback(
		(id: string) => {
			return id === selectedMobileApp?.id;
		},
		[selectedMobileApp],
	);

	const isSelected =
		selectedMobileApp !== null && selectedMobileApp !== undefined;
	const changeMobile = (mobile: MobileApp) => {
		if (isSelected && !isCurrentMobileSelected(mobile.id)) {
			selectMobile(mobile);
		}
	};

	return {
		isLoading,
		getMobileInfo: getData,
		selectedMobileApp,
		isCurrentMobileSelected,
		changeMobile,
		isSelected,
		refetch,
		selectMobile,
	};
};

export const useMobile = () => {
	const { getUserdata } = useAuthState();

	const [isLoading, setLoading] = useState(false);

	const [mobileInfo, setCompanyMobileData] = useState<MobileProps>({
		error: '',
		available: [],
	} as MobileProps);

	const [selectedMobileApp, setSelectedMobileApp] = useState<MobileApp | null>(
		null,
	);

	const fetchWeb = useCallback((companyID: string) => {
		setLoading(true);
		MobileService.getAll(companyID)
			.then((response: any) => {
				setCompanyMobileData(mapMobileProps(response));
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		refetch();
	}, []);

	const refetch = () => {
		const user = getUserdata() as User;
		const companyID = user?.companyID as string;
		fetchWeb(companyID);
	};

	const selectMobile = (mobile: MobileApp) => {
		if (mobile.id === selectedMobileApp?.id) return;

		setSelectedMobileApp(mobile);
	};

	const getMobileInfo = (): MobileApp[] => {
		return isLoading
			? ([] as MobileApp[])
			: (mobileInfo?.available as MobileApp[]);
	};

	const isCurrentMobileSelected = (id: string) => {
		return id === selectedMobileApp?.id;
	};

	const isSelected = useMemo(
		() => selectedMobileApp !== null && selectedMobileApp !== undefined,
		[selectedMobileApp],
	);

	const changeMobile = (mobile: MobileApp) => {
		if (selectedMobileApp && selectedMobileApp.id === mobile.id) {
			selectMobile(mobile);
		}
	};

	return {
		isLoading,
		getMobileInfo,
		selectedMobileApp,
		isCurrentMobileSelected,
		changeMobile,
		isSelected,
		refetch,
		selectMobile,
	};
};

export const useMobileOne = (id: string) => {
	const [mobile, setMobile] = useState<MobileUnique | null>(null);
	const [isLoding, setLoading] = useState<boolean>(false);

	const fetch = useCallback(() => {
		const { getUserdata } = useAuthState();
		const mobileInfo = getUserdata();
		setLoading(true);
		MobileService.getMobileByID(id, mobileInfo?.companyID as string)
			.then((response) => {
				setMobile(mobileUniqueProps(response));
			})
			.catch((error: any) => {
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const getMobile = useCallback((): MobileUnique => {
		return !isLoding && mobile ? mobile : ({} as MobileUnique);
	}, [mobile, isLoding]);

	const refetch = useCallback(() => fetch(), []);

	return { isLoding, getMobile, refetch };
};
