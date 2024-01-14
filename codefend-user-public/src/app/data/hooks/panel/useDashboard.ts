import { useEffect, useState } from 'react';
import { useAuthState } from '../useAuthState';
import { DashboardService } from '../../services/dashboard.service';
import { mapGetCompanyToCompanyData } from '../../utils/mapper';
import { DashboardProps, User, useFetcher } from '../..';
import { toast } from 'react-toastify';

export const useDashboardV2 = () => {
	const fetchData = (args: any) =>
		DashboardService.getCompanyInfo(args.companyID);

	const { getData, isLoading, fetcher, error } = useFetcher<DashboardProps>({
		mapper: mapGetCompanyToCompanyData,
		fetchData,
	});
	const { getUserdata } = useAuthState();

	useEffect(() => {
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			console.error("Error: 'companyID' no está definido en userData.");
			toast.error('User information was not found');
			return;
		}
		fetcher({ companyID });
		if (error !== null) console.log({ error });
	}, []);

	return { isLoading, companyData: getData() };
};

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
