import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from '..';
import { PreferenceServices } from '../../services'
import { User } from 'app/data';

export const usePreferences = () => {
    const { getUserdata } = useAuthState();

		const [loading, setLoading] = useState<boolean>(false);
		const [data, setData] = useState<any[]>([]);

		const fetchLan = useCallback(async () => {
			const user = getUserdata() as User;
			const companyID = user?.companyID;
			setLoading(true);

			const data = await PreferenceServices.getAll(companyID)
				.then((response:any) => {
					setData(response)
				})
				.finally(() => {
					setLoading(false)
				})
		}, [getUserdata])

		useEffect(() => {
			fetchLan();
		}, []);

		const refetch = useCallback(() => fetchLan(), []);

		return {loading, data, refetch}
}