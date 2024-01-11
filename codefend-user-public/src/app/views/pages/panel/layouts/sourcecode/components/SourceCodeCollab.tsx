import { SearchIcon } from '../../../../../components';
import React from 'react';

export const SourceCodeCollab = () => {
	return (
		<>
			<div className="card only-info">
				<div className="header">
					<div className="title">
						<div className="icon">
							<SearchIcon />
						</div>
						<span>Add out to your repository</span>
					</div>
				</div>

				<div className="content">
					<div className="info">
						<p>
							In order to review the source code in your company private
							repositories we will need contributor access. Plase add the
							following user:
							<a className="cursor-pointer codefend-text-red underline">
								sourcecode@codefend.com
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
