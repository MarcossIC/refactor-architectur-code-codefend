import { useCallback, useEffect, useState } from 'react';
import { mapSourceCode, useAuthState } from '..';
import { SourceCodeService } from '../services/sourcecode.service';
import { toast } from 'react-toastify';

export const useSourceCode = () => {
	const [sourceCode, setSource] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const { getUserdata } = useAuthState();

	const fetch = useCallback((companyID: string) => {
		setLoading(true);
		SourceCodeService.getAll(companyID)
			.then((response: any) => {
				if (response.error !== '0') {
				}
				setSource(
					response.disponibles.map((repo: any) => mapSourceCode(repo)),
				);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const refetch = useCallback(() => {
		const companyID = getUserdata().companyID;
		fetch(companyID);
	}, [getUserdata]);

	useEffect(() => {
		refetch();
	}, []);

	const getSource = useCallback((): any => {
		return isLoading ? ({} as any) : sourceCode;
	}, [sourceCode]);

	const deletedResource = useCallback(
		(id: string) => {
			setLoading(true);
			const companyID = getUserdata().companyID;
			SourceCodeService.delete(id, companyID)
				.then((response: any) => {
					if (!response) {
					}
					toast.success('Successfully Deleted Web Resource...');
					refetch();
				})
				.catch(() => {
					toast.error('An error has occurred on the server');
				})
				.finally(() => setLoading(false));
		},
		[getUserdata],
	);

	const addSourceCode = useCallback(
		(params: string) => {
			setLoading(true);
			const companyID = getUserdata().companyID;
			console.log({ params });
			return SourceCodeService.add(params, companyID)
				.then((response: any) => {
					if (!response) {
					}
					refetch();
					toast.success('Successfully repository is added');
				})
				.catch(() => {
					toast.error('An error has occurred on the server');
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[getUserdata],
	);

	return { getSource, isLoading, deletedResource, addSourceCode };
};
