import React, { useMemo } from 'react';
import { Webresources, generateIDArray } from '../../../../../../data';

export const ResourceTable: React.FC<{ data: Webresources[] }> = ({ data }) => {
	const resourceKeys = useMemo(() => generateIDArray(data.length), [data]);

	return (
		<>
			<table>
				<thead>
					<tr>
						<th id="id" scope="col">
							id
						</th>
						<th id="domain" scope="col">
							domain
						</th>
						<th id="mainServer" scope="col">
							main server
						</th>
						<th id="location" scope="col">
							location
						</th>
						<th id="provinceCity" scope="col">
							province, city
						</th>
						<th id="actions" scope="col">
							actions
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row: Webresources, index: number) => (
						<tr key={resourceKeys[index]}>
							<td>row</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
