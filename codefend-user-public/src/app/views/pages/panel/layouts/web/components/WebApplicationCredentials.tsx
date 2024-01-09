import React from 'react';
import { ChartIcon } from '../../../../../components';

export const WebApplicationCredentials: React.FC = () => {
	return (
		<div className="card stats">
			<div className="header">
				<div className="title">
					<div className="icon">
						<ChartIcon />
					</div>
					<span>Credentials statics</span>
				</div>
				<div className="actions"></div>
			</div>
			<div className="content">
				<div className="stat">
					<div className="value">0</div>
					<p>Admin credentials</p>
				</div>
				<div className="stat">
					<div className="value">0</div>
					<p>User credentials</p>
				</div>
			</div>
		</div>
	);
};
