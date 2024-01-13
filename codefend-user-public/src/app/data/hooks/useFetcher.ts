import { useCallback, useEffect, useState } from 'react';
import { handleFetchError } from '..';

export interface Fetcher<T> {
	mapper: (s: any) => T;
	fetchData: (args: any) => Promise<any>;
	notSave?: boolean | null | undefined;
}

/**
 * - data:         Status of the fetch response.
 * - isLoading:    Indicates whether the fetch is loading or finished.
 * - error:        A state is saved in case an error occurs.
 * - fetcher:      Function to execute the fetch.
 * - changeFetcher Change the fetcher to another
 */
export interface FetcherResult<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
	fetcher: (args: any) => Promise<void>;
	changeFetcher: (newFetcher: (args: any) => Promise<any>) => void;
}

/**
 * Custom hook to make data requests in a generic way.
 * Use JS destructuring to retrieve only what you will use
 *
 * @template T - Type of data expected in the response.
 * @param {Function} mapper - Function that maps the API-response to a front interface
 * @param {Function} fetchData - Function that performs the data request.
 * @returns {FetcherResult}
 */
export const useFetcher = <T>({ mapper, fetchData, notSave }: Fetcher<T>) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [currentNotSave, setNotSave] = useState<boolean | undefined | null>(
		notSave,
	);
	const [currentFetcher, changeFetcher] =
		useState<(args: any) => Promise<any>>(fetchData);
	const [currentMapper, changeMapper] = useState<(s: any) => T>(mapper);

	const fetcher = useCallback(
		async (args: any) => {
			setLoading(true);
			return await currentFetcher(args)
				.then((source: any) => {
					if (!currentNotSave || currentNotSave === undefined)
						setData(currentMapper(source));

					setError(null);
				})
				.catch((error: Error) => {
					setError(error);
					return error;
				})
				.finally(() => setLoading(false));
		},
		[currentFetcher, currentMapper, currentNotSave],
	);

	/**
	 * Getter to safely retrieve state in case it is null
	 */
	const getData = useCallback((): T => {
		const empty = Array.isArray(data) ? ([] as T) : ({} as T);
		if (isLoading) return empty;
		return data ?? empty;
	}, [data]);

	return {
		getData,
		isLoading,
		error,
		fetcher,
		changeFetcher,
		changeMapper,
		setNotSave,
	};
};
