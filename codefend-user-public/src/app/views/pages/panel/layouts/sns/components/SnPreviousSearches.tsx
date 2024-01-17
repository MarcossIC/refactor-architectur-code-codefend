import {
	PageLoader,
	PreviousMessage,
	Show,
	SimpleSection,
} from '../../../../../../views/components';
import React from 'react';

const SnPreviousSearches: React.FC<{ isLoading?: boolean }> = (props) => {
	return (
		<>
			<div className="previous-search">
				<div className="card table sns">
					<SimpleSection
						header="Previous Searches"
						icon={<PreviousMessage />}>
						<>
							<div className="columns-name">
								<div className="column">username</div>
								<div className="column">search</div>
							</div>

							<div className="rows internal-tables ">
								<Show when={!props.isLoading} fallback={<PageLoader />}>
									<>
										<div className="flex px-3 py-1 text-format">
											<section className="flex w-full items-center">
												<p className="w-2/4">nacho</p>
												<p className="text-base w-2/4">
													codefend.com
												</p>
											</section>
										</div>
									</>
								</Show>
							</div>
						</>
					</SimpleSection>
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

export default SnPreviousSearches;
