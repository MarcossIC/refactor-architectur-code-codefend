import React from 'react';
import { PageLoader } from '../../../../../components';

interface Props {
	isLoading: boolean;
	previousSearches: any;
}

export const InxPreviousSearches: React.FC<Props> = (props) => {
	const safelyPreviousSearches = () => props.previousSearches.reverse() ?? [];
	return (
		<>
			<div className="h-full flex flex-col ">
				<div className="h-[76%] overflow-hidden">
					<div className="w-full internal-tables h-full ">
						<div className="py-3 px-5 internal-tables-active flex flex-row items-center gap-x-3.5 ">
							{/* <RiLogosWechatFill className="codefend-text-red w-6 h-6" /> */}
							<p className="text-small text-left font-bold title-format">
								PREVIOUS SEARCHES
							</p>
						</div>
						{!props.isLoading ? (
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
											(info: any, index: number) => (
												<div
													className="flex px-3 py-1 text-format"
													key={index}>
													<section className="flex w-full items-center">
														<p className="w-2/4">
															{info.username}
														</p>
														<p className="text-base w-2/4">
															{info.informacion.split(
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
						) : (
							<>
								<PageLoader />
							</>
						)}
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
