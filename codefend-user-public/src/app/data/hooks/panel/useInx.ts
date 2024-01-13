import { InxServices } from 'app/data/services/inx.service';
import { useFetcher } from '..';
import { useParams } from 'react-router';
import { useState } from 'react';

export const useInxFilterWithURL = () => {
	const highlightLinesWithUrlContext = (
		inputText: string,
		urlToFilter: string,
		contextLines: number = 3,
	) => {
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
	};

	return {};
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
