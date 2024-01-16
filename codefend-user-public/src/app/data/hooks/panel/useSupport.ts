import {
	CustomerSupportService,
	FetchPattern,
	SupportProps,
	TicketUnique,
	mapSupportProps,
	mapTicketUnique,
} from '../../';
import { useAuthState } from '..';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const useAllTicket = () => {
	const { getUserdata } = useAuthState();
	const [{ data, error, isLoading }, dispatch] = useState({
		data: null,
		error: null,
		isLoading: true,
	});

	const fetchAll = async (companyID: string) => {
		dispatch((state) => ({ ...state, isLoading: true }));
		return CustomerSupportService.getAll(companyID)
			.then((data) =>
				dispatch({
					data: data.disponibles
						.map((dis: any) => mapSupportProps(dis))
						.reverse(),
					error: null,
					isLoading: false,
				}),
			)
			.catch((error) => dispatch({ data: null, error, isLoading: false }));
	};

	const refetch = () => {
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			console.error("Error: 'companyID' no está definido en userData.");
			toast.error('User information was not found');
			return;
		}
		fetchAll(companyID);
		if (error) console.log({ error });
	};
	const getTikets = (): SupportProps[] => {
		const ticket = isLoading ? ([] as SupportProps[]) : data;
		return ticket ?? [];
	};

	return {
		getTikets,
		isLoading,
		refetch,
	};
};

export const useOneTicket = () => {
	const { getUserdata } = useAuthState();
	const [{ data, error, isLoading }, dispatch] = useState<
		FetchPattern<TicketUnique>
	>({
		data: null,
		error: null,
		isLoading: true,
	});

	const fetchOne = async (companyID: string, ticketID: string) => {
		dispatch((state) => ({ ...state, isLoading: true }));
		return CustomerSupportService.getOne(ticketID, companyID)
			.then((response) =>
				dispatch({
					data: mapTicketUnique(response),
					error: null,
					isLoading: false,
				}),
			)
			.catch((error) => dispatch({ data: null, error, isLoading: false }));
	};

	const refetch = (ticketID: string) => {
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			console.error("Error: 'companyID' no está definido en userData.");
			toast.error('User information was not found');
			return;
		}
		fetchOne(companyID, ticketID);
		if (error) console.log({ error });
	};
	const getOneTicket = (): TicketUnique => {
		return isLoading ? ({} as TicketUnique) : data ?? ({} as TicketUnique);
	};

	return {
		getOneTicket,
		refetch,
		isLoading,
	};
};

export const useDeleteTicket = () => {
	return;
};
