import React, { useMemo } from 'react';
import { PageLoader, PreviousMessage, Show } from '../../../../../components';
import { PreviusSearch, generateIDArray } from '../../../../../../data';

interface InxPreviousSearchesProps {
	isLoading: boolean;
	previousSearches: PreviusSearch[];
}

export const InxPreviousSearches: React.FC<InxPreviousSearchesProps> = (
	props,
) => {
	const safelyPreviousSearches = () =>
		Array.isArray(props.previousSearches)
			? props.previousSearches.reverse()
			: [];

	const previusKeys = useMemo(
		() =>
			Boolean(safelyPreviousSearches.length)
				? generateIDArray(safelyPreviousSearches().length)
				: [],
		[props.previousSearches],
	);

	return (
		<>
			<div className="h-full flex flex-col ">
				<div className="h-[76%] overflow-hidden">
					<div className="w-full internal-tables h-full ">
						<div className="py-3 px-5 internal-tables-active flex flex-row items-center gap-x-3.5 ">
							<PreviousMessage />
							<p className="text-small text-left font-bold title-format">
								PREVIOUS SEARCHES
							</p>
						</div>
						<Show when={!props.isLoading} fallback={<PageLoader />}>
							<>
								<div className="flex px-8 py-2 internal-tables-scroll full-height overflow-auto ">
									<div className="w-full">
										<div className="flex p-3 text-format">
											<section className="flex w-full">
												<p className="text-base w-2/4">username:</p>
												<p className="text-base w-2/4">search</p>
											</section>
										</div>
										{safelyPreviousSearches().map(
											(searchData: PreviusSearch, i: number) => (
												<div
													className="flex px-3 py-1 text-format"
													key={previusKeys[i]}>
													<section className="flex w-full items-center">
														<p className="w-2/4">
															{searchData.username}
														</p>
														<p className="text-base w-2/4">
															{searchData.info.split(
																'queries:',
															)[1] ?? '--'}
														</p>
													</section>
												</div>
											),
										)}
									</div>
								</div>
							</>
						</Show>
					</div>
				</div>
				<button
					onClick={(e) => {
						alert('Processing your order');
					}}
					className="btn btn-primary full-w mt-4">
					REQUEST PROFESSIONAL ASSISTANCE
				</button>
			</div>
		</>
	);
};
