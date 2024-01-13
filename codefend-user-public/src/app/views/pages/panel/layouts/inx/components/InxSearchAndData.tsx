import React, { useEffect, useState } from 'react';
import { handleFetchError, useAuthState } from '../../../../../../data';
import {
	InxSearchIcon,
	PageLoader,
	PageLoaderOverlay,
} from '../../../../../components';
import { useParams } from 'react-router';
import { InxServices } from '../../../../../../data/services/inx.service';

interface InxSearchAndDataProps {
	refetch: () => void;
}

export const InxSearchAndData: React.FC<InxSearchAndDataProps> = (props) => {
	const [searchData, setSearchData] = useState<string>('');
	const [selectedResult, setSelectedResult] = useState<any | null>(null);
	const [intelId, setIntelId] = useState<string>('');
	const [intelData, setIntelData] = useState<any[]>([]);
	const [intelPreview, setIntelPreview] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [offset, setOffset] = useState<number>(0);
	const [count, setCount] = useState<number>(0);
	const [fullDataLoading, setFullDataLoading] = useState<boolean>(false);
	const { search } = useParams();
	const { getUserdata } = useAuthState();
	const companyID = getUserdata().companyID;

	useEffect(() => {
		if (!getUserdata()) return;

		if (search) {
			setSearchData(search);
			procSearch();
		}
	}, []);

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

	const procSearch = (e?: React.FormEvent) => {
		if (e) {
			e.preventDefault();
		}
		setLoading(true);
		setIntelData([]);
		setOffset(0);

		InxServices.initializeSearch(searchData, companyID)
			.then((res: any) => {
				setIntelId(res.response.id);
				setCount(res.response.count);

				return procIntelSearch();
			})
			.catch((err: Error) => {
				handleFetchError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const procIntelSearch = () => {
		const params = { id: intelId, offset: offset };
		return InxServices.search(params, companyID)
			.then((res: any) => {
				const intelResult = res.response.map((intel: any) => {
					intel.preview = '';
					return intel;
				});
				const intelProc = intelData.concat(intelResult);
				setIntelData(intelProc);
				props.refetch();
				setOffset(offset + intelResult.length);
				processAllIntelData(intelResult);
			})
			.catch((err) => {});
	};

	const procMoreResults = () => {
		if (!loading) return procIntelSearch();
		return [];
	};
	const time = (ms: any) => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	};

	const processPreview = (intel: any) => {
		const params = {
			sid: intel.storage_id,
			bid: intel.bucket_id,
			mid: intel.media_id,
		};
		return InxServices.preview(params, companyID).then((res) => {
			console.log(res);
			if (!res.preview) return;
			const intelPreviewData = intelPreview;
			intelPreviewData.push({
				id: intel.storage_id,
				preview: res.preview,
			});
			setIntelPreview(intelPreviewData);
			let intelDataP = intelData;
			setIntelData([]);
			return setIntelData(intelDataP);
		});
	};

	const processAllIntelData = async (inputData: any) => {
		for (const intel of inputData) {
			processPreview(intel);
		}
		await time(4000);
		if (offset < count) {
			setLoading(false);
		}
	};

	const procReadFile = (intel: any) => {
		setFullDataLoading(true);
		const params = {
			sid: intel.storage_id,
			bid: intel.bucket_id,
		};
		InxServices.read(params, companyID)
			.then((res: any) => {
				if (res.intel) {
					setSelectedResult({
						intelSelected: res.intel as any,
						file_name: intel.name,
						file_type: intel.bucket_data,
					});
				}
			})
			.finally(() => {
				setFullDataLoading(false);
			});
	};

	return (
		<div className="border h-5/6 pt-3">
			{selectedResult && (
				<>
					<div className="fixed left-0 top-0 h-full w-full bg-gray-500 bg-opacity-25 overflow-y-hidden overflow-x-hidden outline-none">
						<div className="pointer-events-none relative w-auto translate-y-[50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]">
							<div className="pointer-events-auto relative flex w-full flex-col border-none bg-white bg-clip-padding text-black dark:text-current shadow-lg outline-none dark:bg-neutral-600 ">
								<div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
									<h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
										{selectedResult.file_name},{' '}
										{selectedResult.file_type}
									</h5>
									<button
										onClick={() => setSelectedResult(null)}
										type="button"
										className="box-intelSelected rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none">
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
											__html: highlightLinesWithUrlContext(
												selectedResult.intelSelected,
												searchData,
											),
										}}></div>

									<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

									<h3 className="text-xl font-bold leading-normal text-neutral-800 dark:text-neutral-200">
										Full list
									</h3>
									<div
										className="max-w-md text-xs break-words"
										dangerouslySetInnerHTML={{
											__html: selectedResult.intelSelected.replace(
												/(\r\n|\n|\r)/g,
												'<br>',
											),
										}}></div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			<form className="flex flex-row h-9 mb-4 px-3">
				<input
					type="text"
					value={searchData}
					onChange={(e) => setSearchData(e.target.value)}
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
			{!loading ? (
				<div className="flex internal-tables flex-col overflow-auto max-h-full overflow-x-hidden">
					{intelData.map((intel: any, index: number) => (
						<div className="" key={index}>
							<div className="w-full flex flex-row h-10 bg-[#f0f0f0] text-[#333]">
								<div className="w-full red-border flex flex-row items-center px-7 ">
									<input
										type="checkbox"
										checked
										className=" checkbox-color"
									/>
									<span className="flex-grow ml-3">
										{intel?.name?.slice(0, 50)}
									</span>
									<span className="flex-grow ml-3">
										{intel.bucket_data}
									</span>
									<span className="text-[#666] text-xs">
										{intel.date}
									</span>
								</div>
								<button
									onClick={() => {
										procReadFile(intel);
									}}
									className="btn btn-primary no-border-height h-full items-center justify-center text-sm w-[5.3rem] no-padding ">
									full data
								</button>
							</div>

							<div className="w-full internal-tables disable-border no-border border-bottom py-2">
								<div>
									<div className="flex py-0.5 pl-14 pr-10">
										<div
											className="max-w-md"
											dangerouslySetInnerHTML={{
												__html: intelPreview
													.find(
														(preview: any) =>
															preview.id === intel.storage_id,
													)
													?.preview?.replace(
														/(\r\n|\n|\r)/g,
														'<br>',
													),
											}}></div>
									</div>
								</div>
							</div>
						</div>
					))}
					{/* <div use:intersectionObserver></div> */}
				</div>
			) : (
				<PageLoader />
			)}
			{fullDataLoading && <PageLoaderOverlay />}
		</div>
	);
};
