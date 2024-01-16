import { useState } from 'react';
import {
	useAuthState,
	InxServices,
	mapPreviusSearch,
	FetchPattern,
	PreviusSearch,
} from '../../../';
import { toast } from 'react-toastify';

export const useInxPreviousSearch = () => {
	const [{ data, error, isLoading }, dispatch] = useState<
		FetchPattern<PreviusSearch[]>
	>({
		data: null,
		error: null,
		isLoading: true,
	});
	const { getUserdata } = useAuthState();

	const fetchInitialSearch = async (companyID: string) => {
		dispatch((state) => ({ ...state, isLoading: true }));

		return InxServices.getPreviousSearches(companyID)
			.then((response: any) => {
				if (response.response !== 'success')
					throw new Error(
						response.message ?? 'An unexpected error has occurred',
					);

				dispatch({
					data: response.previous_searches.map(
						(searches: any) =>
							mapPreviusSearch(searches) as PreviusSearch,
					),
					error: null,
					isLoading: false,
				});
			})
			.catch((error) => dispatch({ data: null, error, isLoading: false }));
	};

	const refetch = () => {
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		fetchInitialSearch(companyID);
	};

	const getData = (): PreviusSearch[] => {
		const _data = !isLoading ? data : [];
		return _data ?? ([] as PreviusSearch[]);
	};

	return { previousSearches: getData(), isLoading, refetch };
};
