import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthState, InxServices } from '../../';
import { toast } from 'react-toastify';

export const useHighlightLinesWithUrl = () => {
	const highlightWithUrl = useCallback(
		(inputText: string, urlToFilter: string, contextLines: number = 3) => {
			return inputText
				.split('\n')
				.map((line, index, lines) =>
					line.includes(urlToFilter)
						? [
								...lines
									.slice(Math.max(0, index - contextLines), index)
									.map((l) => `${l}<br>`),
								`<b>${line}</b><br>`,
								...lines
									.slice(index + 1, index + 1 + contextLines)
									.map((l) => `${l}<br>`),
								`<hr class="w-24 h-1 bg-gray-100 border-0 rounded md:my-2 dark:bg-white">`,
							].join('')
						: line,
				)
				.join('\n');
		},
		[],
	);

	return { highlightWithUrl };
};
export const useInxPreviousSearch = () => {
	const [{ data, error, isLoading }, dispatch] = useState({
		data: null,
		error: null,
		isLoading: true,
	});
	const { getUserdata } = useAuthState();

	const fetchInitialSearch = async (companyID: string) => {
		dispatch((state) => ({ ...state, isLoading: true }));

		return InxServices.getPreviousSearches(companyID)
			.then((data) =>
				dispatch({ data: data, error: null, isLoading: false }),
			)
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
	const getData = () => (data ? {} : data);

	return { previousSearches: getData(), isLoading, refetch };
};

export const useInxSearch = (companyID: string) => {
	const { search } = useParams();
	const [offset, setOffset] = useState(0);

	const [{ data, error, isLoading }, dispatch] = useState({
		data: null,
		error: null,
		isLoading: true,
	});
	const fetchInitialSearch = async () => {
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		dispatch((state) => ({ ...state, isLoading: true }));
		return InxServices.initializeSearch(search as string, companyID)
			.then((data) =>
				dispatch({ data: data, error: null, isLoading: false }),
			)
			.catch((error) => dispatch({ data: null, error, isLoading: false }));
	};

	const searchProc = (e: React.FormEvent) => {
		if (e) e.preventDefault();
		setOffset(0);
		return fetchInitialSearch();
	};

	const getData = () => (data ? {} : data);

	return { searchProc, offset, getData };
};
