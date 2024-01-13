import { useCallback, useEffect, useState } from 'react';
import { handleFetchError } from '..';

export interface Fetcher<T> {
	mapper: (s: any) => T;
	fetchData: (args: any) => Promise<any>;
}
export interface FetcherResult<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
	fetcher: (args: any) => Promise<void>;
	changeFetcher: (newFetcher: (args: any) => Promise<any>) => void;
}

/**
 * Hook personalizado para realizar solicitudes de datos de manera genérica.
 *
 * @template T - Tipo de datos esperados en la respuesta.
 * @param {Function} mapper - Función para mapear la respuesta del servicio a otra estructura.
 * @param {Function} fetchData - Función que realiza la solicitud de datos.
 * @returns {FetcherResult}
 *  - data:           Estado de la respuesta del fetch.
 *  - isLoading:      Indica si el fetch esta cargando o terminado.
 *  - error:          Se guarda un estado en caso de ocurrir un error.
 *  - fetcher:        Funcion para ejecutar el fetch.
 *  - changeFetcher   Cambia el fetcher por otro
 */
export const useFetcher = <T>({ mapper, fetchData }: Fetcher<T>) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [currentFetcher, changeFetcher] =
		useState<(args: any) => Promise<any>>(fetchData);
	const [currentMapper, changeMapper] = useState<(s: any) => T>(mapper);

	const fetcher = useCallback(
		async (args: any) => {
			setLoading(true);
			return await currentFetcher(args)
				.then((source: any) => {
					setData(currentMapper(source));
					setError(null);
				})
				.catch((error: Error) => {
					setError(error);
					return handleFetchError(error);
				})
				.finally(() => setLoading(false));
		},
		[currentFetcher, currentMapper],
	);

	/**
	 * Getter para recuperar el estado de forma segura en caso de que sea nulo
	 */
	const getData = (): T => {
		const empty = Array.isArray(data) ? ([] as T) : ({} as T);
		if (isLoading) return empty;
		return data ?? empty;
	};

	return { getData, isLoading, error, fetcher, changeFetcher, changeMapper };
};
