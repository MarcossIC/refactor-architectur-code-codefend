import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from '..';
import { PreferenceServices } from '../../services';
import { Company, User, mapCompany } from '../../';

export const usePreferences = () => {
	const { getUserdata } = useAuthState();

	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<Company[]>([]);

	const fetchLan = useCallback(() => {
		const user = getUserdata() as User;
		const companyID = user?.companyID;
		setLoading(true);

		PreferenceServices.getAll(companyID)
			.then((response: any) => {
				setData([mapCompany(response.company)]);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [getUserdata]);

	useEffect(() => {
		fetchLan();
	}, []);

	const refetch = useCallback(() => fetchLan(), []);

	return { loading, data, refetch };
};
