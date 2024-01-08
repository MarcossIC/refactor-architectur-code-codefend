import { useEffect, useState } from 'react';
import { DashboardProps, MobileProps, MobileService, useAuthState } from '..';

export const useMobile = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState(false);
	const [mobileInfo, setCompanyMobileData] = useState<MobileProps>(
		{} as MobileProps,
	);

	useEffect(() => {
		const companyID = getUserdata()?.companyID as string;
		setLoading(true);

		MobileService.getAll(companyID)
			.then((response: any) => {
				setCompanyMobileData({ disponibles: response.disponibles });
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return { isLoading, mobileInfo };
};
