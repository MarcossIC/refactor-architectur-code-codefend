import { useEffect, useState } from 'react';
import { DashboardProps, MobileService, useAuthState } from '..';

export const useMobile = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState(false);
	const [mobileInfo, setCompanyMobileData] = useState<any>({});

	useEffect(() => {
		const companyID = getUserdata()?.companyID as string;
		setLoading(true);
		setCompanyMobileData({} as DashboardProps);

		MobileService.getAll(companyID)
			.then((response) => {
				setCompanyMobileData(response);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return { isLoading, mobileInfo };
};
