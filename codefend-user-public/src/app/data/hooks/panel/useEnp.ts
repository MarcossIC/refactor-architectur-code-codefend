import { useCallback, useEffect, useState } from 'react';
import { EnpService, handleFetchError, useAuthState, useFetcher } from '../../';
import { invoke } from '@tauri-apps/api';
import { toast } from 'react-toastify';

const useFetchEndpoints = (companyID: string) => {
	const mapper = (source: any) => source;
	const fetchData = (args: any) =>
		EnpService.getEndpoints(args.macAddress, args.companyID);

	const { getData, isLoading, error, fetcher } = useFetcher<any>({
		mapper,
		fetchData,
	});

	const refetchEnd = useCallback(async () => {
		const response = await invoke('get_mac_addr');
		console.log({ response });

		fetcher({ macAddress: JSON.parse(response as any), companyID });

		if (error !== null) console.log({ error });
	}, []);

	return { getEndpoints: getData, isLoading, refetchEnd };
};

// Hook para manejar el escaneo local
export const useScanLocal = (token: string) => {
	const [scanLoading, setScanLoading] = useState(false);

	const handleScanResult = useCallback((result: any) => {
		console.log({ result });
		if (result.success) {
			toast.success(result.success);
			return true;
		}
		return false;
	}, []);

	const scanLocal = useCallback(async () => {
		setScanLoading(true);
		try {
			const resParsed = JSON.parse(
				await invoke('scan_local', { sessionId: token }),
			);
			return handleScanResult(resParsed);
		} catch (error) {
			console.error({ error });
			toast.error('An error occurred during scanning.');
		} finally {
			setScanLoading(false);
		}
		return false;
	}, [token, handleScanResult]);

	return { scanLoading, scanLocal };
};

// Hook para manejar la eliminación de un endpoint
const useDeleteEndpoint = (companyID: string) => {
	const handleDelete = useCallback(
		async (id: string) => {
			return EnpService.delete(id, companyID).then(() => {
				toast.success('Successfully Deleted Web Resource...');
			});
		},
		[companyID],
	);

	return { handleDelete };
};

// Hook principal que utiliza los hooks anteriores
export const useEnp = () => {
	const { getUserdata } = useAuthState();
	const companyID = getUserdata()?.companyID;

	const { getEndpoints, isLoading, refetchEnd } = useFetchEndpoints(companyID);
	const { handleDelete } = useDeleteEndpoint(companyID);

	return {
		getEndpoints,
		isLoading,
		handleDelete,
		refetchEnd,
	};
};
