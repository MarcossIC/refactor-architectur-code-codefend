import { useCallback, useEffect, useState } from 'react';
import { SourceCode, mapSourceCode, useAuthState, useFetcher } from '../..';
import { SourceCodeService } from '../../services/sourcecode.service';
import { toast } from 'react-toastify';

const useSourceCodeV2 = () => {
	const { getUserdata } = useAuthState();
	const fetchData = (args: any) => SourceCodeService.getAll(args.companyID);
	const mapper = (source: any) =>
		source.disponibles.map((repo: any) => mapSourceCode(repo));
	const { getData, isLoading, fetcher, changeFetcher, error, changeMapper } =
		useFetcher<SourceCode[]>({ mapper, fetchData });

	const refetch = (reset: boolean) => {
		if (reset) {
			changeMapper(mapper);
			changeFetcher(fetchData);
		}
		const companyID = getUserdata()?.companyID as string;
		fetcher({ companyID });
	};

	useEffect(() => refetch(false), []);

	const deletedResource = (id: string) => {
		const companyID = getUserdata().companyID;
		changeFetcher((args: any) =>
			SourceCodeService.delete(args.id, args.companyID),
		);
		changeMapper((source: any) => getData() as SourceCode[]);
		fetcher({ id, companyID })
			.then(() => toast.success('Successfully Deleted Web Resource...'))
			.catch(() => toast.error('An error has occurred on the server'));

		if (!error) refetch(true);
	};

	const addSourceCode = (params: string) => {
		const companyID = getUserdata().companyID;
		changeMapper((source: any) => getData() as SourceCode[]);
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
