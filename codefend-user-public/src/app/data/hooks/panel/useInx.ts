import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthState, useFetcher, InxServices } from '../../';
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
	const fetchData = (args: any) =>
		InxServices.getPreviousSearches(args?.companyID as string);
	const mapper = (source: any) => source;
	const { isLoading, fetcher, getData } = useFetcher<any>({
		fetchData,
		mapper,
	});
	const { getUserdata } = useAuthState();

	const refetch = () => {
		const companyID = getUserdata()?.companyID as string;
		if (!companyID) {
			toast.error('User information was not found');
			return;
		}
		fetcher({ companyID });
	};

	return { previousSearches: getData(), isLoading, refetch };
};

interface IntelSearch {
	id: string;
	count: number;
}
export const useInxSearch = (companyID: string) => {
	const fetchData = (args: any) =>
		InxServices.initializeSearch(
			args?.search as string,
			args?.companyID as string,
		);
	const mapper = (source: any) => source.response as IntelSearch;
	const { isLoading, fetcher, getData } = useFetcher<IntelSearch>({
		fetchData,
		mapper,
	});
	const { search } = useParams();
	const [offset, setOffset] = useState(0);

	const searchProc = (e: React.FormEvent) => {
		if (e) e.preventDefault();
		setOffset(0);
		return fetcher({ search, companyID });
	};
};
