import { PageLoader, Show } from '../../../../../../views/components';
import React from 'react';

const SnPreviousSearches: React.FC<{ isLoading?: boolean }> = (props) => {
	return (
		<>
			<div className="h-full flex flex-col ">
				<div className="h-[36%] overflow-hidden">
					<div className="w-full internal-tables h-full ">
						<div className="py-3 px-5  flex flex-row gap-x-3.5 ">
							{/* <RiLogosWechatFill className="codefend-text-red w-6 h-6" /> */}
							<p className="text-small text-left font-bold title-format">
								PREVIOUS SEARCHES
							</p>
						</div>
						<Show when={!props.isLoading} fallback={<PageLoader />}>
							<div className="flex px-8 py-2 full-height overflow-auto">
								<div className="w-full">
									<div className="flex p-3 text-format">
										<section className="flex w-full">
											<p className="text-base w-2/4">username:</p>
											<p className="text-base w-2/4">search</p>
										</section>
									</div>
									<div className="flex px-3 py-1 text-format">
										<section className="flex w-full">
											<p className="w-2/4">nacho</p>
											<p className="text-base w-2/4">codefend.com</p>
										</section>
									</div>
								</div>
							</div>
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

export default SnPreviousSearches;
