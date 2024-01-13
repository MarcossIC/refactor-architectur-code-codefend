import { useCallback, useEffect, useState } from 'react';
import { SourceCode, mapSourceCode, useAuthState, useFetcher } from '../..';
import { SourceCodeService } from '../../services/sourcecode.service';
import { toast } from 'react-toastify';

const useSourceCodeV2 = () => {
	const { getUserdata } = useAuthState();
	const fetchData = (args: any) =>
		SourceCodeService.getAll(args.companyID as string);
	const mapper = (source: any): SourceCode[] =>
		source.disponibles.map((repo: any) => mapSourceCode(repo));

	const { getData, isLoading, error, fetcher, changeFetcher, setNotSave } =
		useFetcher<SourceCode[]>({ mapper, fetchData });

	const refetch = (reset: boolean) => {
		if (reset) {
			setNotSave(false);
			changeFetcher(fetchData);
		}
		const companyID = getUserdata().companyID;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		fetcher({ companyID });
	};

	useEffect(() => refetch(false), []);

	const deletedResource = (id: string) => {
		const companyID = getUserdata().companyID;
		changeFetcher((args: any) =>
			SourceCodeService.delete(args.id, args.companyID),
		);
		setNotSave(true);
		fetcher({ id, companyID })
			.then(() => toast.success('Successfully Deleted Web Resource...'))
			.catch(() => toast.error('An error has occurred on the server'));

		if (!error) refetch(true);
	};

	const addSourceCode = (params: string) => {
		const companyID = getUserdata().companyID;
		setNotSave(true);
		changeFetcher((args: any) =>
			SourceCodeService.add(args.params, args.companyID),
		);

		fetcher({ params, companyID })
			.then(() => toast.success('Successfully repository is added'))
			.catch(() => toast.error('An error has occurred on the server'));

		if (!error) refetch(true);
	};

	return { getSource: getData, isLoading, deletedResource, addSourceCode };
};

export const useSourceCode = () => {
	const [sourceCode, setSource] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const { getUserdata } = useAuthState();

	const fetcher = useCallback((companyID: string) => {
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
		fetcher(companyID);
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
