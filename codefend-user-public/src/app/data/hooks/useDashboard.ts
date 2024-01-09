import { useEffect, useState } from 'react';
import { useAuthState } from './useAuthState';
import { DashboardService } from '../services/dashboard.service';
import { mapGetCompanyToCompanyData } from '../utils/mapper';
import { DashboardProps, User } from '..';


export const useDashboard = () => {
	const { getUserdata } = useAuthState();
	const [isLoading, setLoading] = useState(false);
	const [companyData, setCompanyResources] = useState<DashboardProps>(
		{} as DashboardProps,
	);

	useEffect(() => {
		const user = getUserdata() as User;
		const companyID = user?.companyID as string;
		setLoading(true);
		setCompanyResources({} as DashboardProps);

		DashboardService.getCompanyInfo(companyID)
			.then((response) => {
				setCompanyResources(mapGetCompanyToCompanyData(response));
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return { isLoading, companyData };
};
