import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	MobileApp,
	MobileProps,
	MobileService,
	MobileUnique,
	User,
	mapMobileProps,
	mobileUniqueProps,
	useAuthState,
} from '../..';

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

	const changeMobile = (mobile: MobileApp, id: string) => {
		if (selectedMobileApp && selectedMobileApp.id === id) {
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
		MobileService.getMobileByID(id, mobileInfo?.companyID)
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
