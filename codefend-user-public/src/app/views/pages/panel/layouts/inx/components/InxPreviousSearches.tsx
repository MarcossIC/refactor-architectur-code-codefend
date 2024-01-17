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
			<div className="previous-search">
				<div className="card table ">
					<div className="header">
						<div className="title">
							<div className="icon">
								<PreviousMessage />
							</div>
							<span>PREVIOUS SEARCHES</span>
						</div>
					</div>

					<div className="columns-name">
						<div className="column">username</div>
						<div className="column">search</div>
					</div>

					<div className="rows internal-tables ">
						<Show when={!props.isLoading} fallback={<PageLoader />}>
							<>
								{safelyPreviousSearches().map(
									(searchData: PreviusSearch, i: number) => (
										<div
											className="flex px-3 py-1 text-format text-gray-400"
											key={previusKeys[i]}>
											<section className="flex w-full items-center">
												<p className="w-2/4">
													{searchData.username}
												</p>
												<p className="text-base w-2/4">
													{searchData.info.split('queries:')[1] ??
														'--'}
												</p>
											</section>
										</div>
									),
								)}
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
