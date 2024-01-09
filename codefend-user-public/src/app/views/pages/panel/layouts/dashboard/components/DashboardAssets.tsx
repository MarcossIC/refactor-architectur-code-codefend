import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CircleIcon } from '../../../../../components';
import { CompanyResource, generateIDArray } from '../../../../../../data';

const DashboardAssets: React.FC<{ resources: CompanyResource }> = ({
	resources,
}) => {
	const resourceKeys = useMemo(
		() => generateIDArray(Object.keys(resources).length),
		[Object.keys(resources).length],
	);

	return (
		<div className="card stats">
			<div className="header">
				<div className="title">
					<div className="icon">
						<CircleIcon />
					</div>
					<span>Supervised assets</span>
				</div>
				<div className="actions"></div>
			</div>
			<div className="content">
				{Object.keys(resources).map(
					(resource: string | number, index: number) => {
						return (
							<Fragment key={resourceKeys[index]}>
								<Link to={`/${resource}`} className="stat">
									<span className="value">
										{
											resources[
												resource as keyof typeof resources
											]
										}
									</span>
									<p>{resource}</p>
								</Link>
							</Fragment>
						);
					},
				)}
			</div>
		</div>
	);
};

export default DashboardAssets;
