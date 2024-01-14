import { toast } from 'react-toastify';
import { FetchPattern, VdbService, useAuthState } from '../../';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router';

export const useInitialVdb = () => {
	const { getUserdata } = useAuthState();
	const [searchData, setSearchData] = useState('');
	const { search } = useParams();
	const [{ data, error, isLoading }, dispatch] = useState<FetchPattern<any>>({
		data: null,
		error: null,
		isLoading: true,
	});

	const fetchInitialVdb = async (companyID: string, search: string) => {
		dispatch((state) => ({ ...state, isLoading: true }));
		return VdbService.initializeVdbData(search, companyID)
			.then((data) =>
				dispatch({ data: data, error: null, isLoading: false }),
			)
			.catch((error) => dispatch({ data: null, error, isLoading: false }));
	};

	const refetch = () => {
		setSearchData(search ?? '');
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			console.error("Error: 'companyID' no está definido en userData.");
			toast.error('User information was not found');
			return;
		}
		fetchInitialVdb(searchData, companyID);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchData(e.target.value);
	};
	const getData = () => (data ? {} : data);

	return { getVdb: getData, refetch, isLoading, searchData, handleChange };
};
