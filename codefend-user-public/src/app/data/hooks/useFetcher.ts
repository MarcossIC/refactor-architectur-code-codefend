import { useEffect, useState } from 'react';
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
}

/**
 * Hook personalizado para realizar solicitudes de datos de manera genérica.
 *
 * @template T - Tipo de datos esperados en la respuesta.
 * @param {Function} mapper - Función para mapear la respuesta del servicio a otra estructura.
 * @param {Function} fetchData - Función que realiza la solicitud de datos.
 * @returns {FetcherResult}
 *  - data:      estado de la respuesta del fetch.
 *  - isLoading: indica si el fetch esta cargando o terminado.
 *  - error:     se guarda un estado en caso de ocurrir un error.
 *  - fetcher:   Funcion para ejecutar el fetch.
 */
export const useFetcher = <T>({ mapper, fetchData }: Fetcher<T>) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetcher = async (args: any) => {
		setLoading(true);
		return await fetchData(args)
			.then((source: any) => {
				setData(mapper(source));
				setError(null);
			})
			.catch((error: Error) => {
				setError(error);
				return handleFetchError(error);
			})
			.finally(() => setLoading(false));
	};

	/**
	 * Getter para recuperar el estado de forma segura en caso de que sea nulo
	 */
	const getData = () => {
		const empty = Array.isArray(data) ? [] : {};
		if (isLoading) return empty;
		return data ?? empty;
	};

	return { getData, isLoading, error, fetcher };
};
