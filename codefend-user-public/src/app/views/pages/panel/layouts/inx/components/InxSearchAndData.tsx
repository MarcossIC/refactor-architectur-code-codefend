import React, { useEffect } from 'react';
import {
	generateIDArray,
	useAuthState,
	useHighlightLinesWithUrl,
	useIntelPreview,
	useIntelSearch,
	useInitialSearch,
	useInxReadFile,
} from '../../../../../../data';
import {
	InxSearchIcon,
	PageLoader,
	PageLoaderOverlay,
	Show,
} from '../../../../../components';
import { InxPreviewIntelData } from './InxPreviewIntelData';

interface InxSearchAndDataProps {
	refetch: () => void;
}

export const InxSearchAndData: React.FC<InxSearchAndDataProps> = (props) => {
	const { highlightWithUrl } = useHighlightLinesWithUrl();
	const { getUserdata } = useAuthState();
	const { getData, setSearchData, refetchInitial } = useInitialSearch();
	const { intelData, refetchIntelData, setIntelData } = useIntelSearch();
	const { intelPreview, refetchPreview } = useIntelPreview();
	const { fullDataLoading, selectedResult, setSelectedResult, readFile } =
		useInxReadFile();

	useEffect(() => {
		procSearch();
	}, []);

	const delay = (ms: number) => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	};

	const procSearch = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		refetchInitial(getUserdata()?.companyID!)?.then(() => {
			return procIntelSearch();
		});
	};

	const procIntelSearch = () => {
		return refetchIntelData(
			getData().intelID,
			getData().offSet,
			getUserdata()?.companyID!,
		).then((res: any) => {
			console.log({ resInIntelSearch: res });
			props.refetch();
			setSearchData((state) => ({ ...state, offSet: getData().offSet }));
			//processAllIntelData(intelResult);
		});
	};

	const processAllIntelData = async (inputData: any) => {
		for (const intel of inputData) {
			const params = {
				sid: intel.storage_id,
				bid: intel.bucket_id,
				mid: intel.media_id,
			};
			processPreview(intel);
		}
		await delay(4000);
	};

	const processPreview = (params: any) => {
		return refetchPreview(params, getUserdata()?.companyID!)?.then(() => {
			const initial = intelData;
			setIntelData([]);
			setIntelData(initial);
		});
	};

	const procMoreResults = () => {
		if (!getData().isLoading) return procIntelSearch();
		return [];
	};

	const procReadFile = (intel: any) => {
		readFile(intel, getUserdata()?.companyID!);
	};

	const intelKeys = () =>
		intelData.length !== 0 ? generateIDArray(intelData.length) : [];

	return (
		<div className="border h-5/6 pt-3">
			<Show when={selectedResult !== null}>
				<>
					<div className="fixed left-0 top-0 h-full w-full bg-gray-500 bg-opacity-25 overflow-y-hidden overflow-x-hidden outline-none">
						<div className="pointer-events-none relative w-auto translate-y-[50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]">
							<div className="pointer-events-auto relative flex w-full flex-col border-none bg-white bg-clip-padding text-black dark:text-current shadow-lg outline-none dark:bg-neutral-600 ">
								<div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
									<h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
										{selectedResult?.fileName},{' '}
										{selectedResult?.fileType}
									</h5>
									<button
										onClick={() => setSelectedResult(null)}
										type="button"
										className="btn btn no-border-height w-14 items-center justify-center">
										<InxSearchIcon />
									</button>
								</div>

								<div className="relative p-4 max-h-[48rem] h-full overflow-y-scroll">
									<h3 className="text-xl font-bold leading-normal text-neutral-800 dark:text-neutral-200">
										Main results
									</h3>

									<div
										className="max-w-md text-xs break-words"
										dangerouslySetInnerHTML={{
											__html: highlightWithUrl(
												selectedResult?.intelSelected,
												getData().search,
											),
										}}></div>

									<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

									<h3 className="text-xl font-bold leading-normal text-neutral-800 dark:text-neutral-200">
										Full list
									</h3>
									<div
										className="max-w-md text-xs break-words"
										dangerouslySetInnerHTML={{
											__html: selectedResult?.intelSelected.replace(
												/(\r\n|\n|\r)/g,
												'<br>',
											),
										}}></div>
								</div>
							</div>
						</div>
					</div>
				</>
			</Show>

			<form className="flex flex-row h-9 mb-4 px-3">
				<input
					type="text"
					value={getData().search}
					onChange={(e) =>
						setSearchData((state) => ({
							...state,
							search: e.target.value,
						}))
					}
					placeholder="Search"
					className="px-6 w-full h-full"
					required
				/>
				<button
					type="submit"
					onClick={procSearch}
					className="btn btn-primary no-border-height w-14 items-center justify-center">
					<img
						className="w-3.5 h-3.5"
						src="/codefend/icon-spy.png"
						alt="icon-spy"
					/>
				</button>
			</form>
			<Show when={!getData().isLoading} fallback={<PageLoader />}>
				<div className="flex internal-tables flex-col overflow-auto max-h-full overflow-x-hidden">
					{intelData.map((intel: any, i: number) => (
						<InxPreviewIntelData
							intelKey={intelKeys()[i]}
							intel={intel}
							readFile={procReadFile}
							intelPreview={intelPreview}
						/>
					))}
				</div>
			</Show>
			<Show when={fullDataLoading}>
				<PageLoaderOverlay />
			</Show>
		</div>
	);
};
