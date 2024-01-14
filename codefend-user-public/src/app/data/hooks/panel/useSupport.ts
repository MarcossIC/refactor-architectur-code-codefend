import { CustomerSupportService } from '../../';
import { useAuthState, useFetcher } from '..';
import { toast } from 'react-toastify';

export const useAllTicket = () => {
	const { getUserdata } = useAuthState();
	const fetchData = (args: any) =>
		CustomerSupportService.getAll(args?.companyID as string);
	const mapper = (source: any) => source?.disponibles;
	const { getData, fetcher, error, isLoading } = useFetcher<any[]>({
		mapper,
		fetchData,
	});

	const refetch = () => {
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			console.error("Error: 'companyID' no está definido en userData.");
			toast.error('User information was not found');
			return;
		}
		fetcher({ companyID });
		if (error) {
			console.log({ error });
		}
	};

	return {
		getTikets: getData,
		isLoading,
		refetch,
	};
};

export const useOneTicket = () => {
	const { getUserdata } = useAuthState();
	const fetchData = (args: any) =>
		CustomerSupportService.getOne(
			args.ticketID as string,
			args.companyID as string,
		);
	const mapper = (source: any) => source;
	const { getData, fetcher, error, isLoading } = useFetcher<any>({
		mapper,
		fetchData,
	});

	const refetch = (ticketID: string) => {
		const companyID = getUserdata()?.companyID as string;
		fetcher({ ticketID, companyID });
		if (error) {
			console.log({ error });
		}
	};

	return {
		getOneTicket: getData,
		refetch,
		isLoading,
	};
};

export const useDeleteTicket = () => {
	return;
};
