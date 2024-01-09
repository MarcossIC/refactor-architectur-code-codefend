import React, { useMemo, useState } from 'react';
import { generateIDArray } from '../../../../data';
import './table.module.scss';

enum Sort {
	asc = 'asc',
	desc = 'desc',
}

interface TableProps {
	DATA: any;

	columns: Set<string>;
	rows?: any[];
}

export const Table: React.FC<TableProps> = ({ DATA, columns }) => {
	const [sortDirection, setSortDirection] = useState<Sort>(Sort.asc);
	const [dataSort, setDataSort] = useState<any>('firstName');

	/*const FILTERED_DATA = Object.values(
		DATA.reduce<Record<any, any>>((map: any, row: any) => {
			map[row['firstName']] = row;
			return map;
		}, {}),
	);*/

	const FILTERED_DATA = new Set<any>([]);

	const rows = useMemo(() => {
		const numberRexeg = new RegExp(/[\$\(\)\,]/g, 'ig'); // esto es para limpiar el input

		return [...DATA].sort((a: any, b: any) => {
			/* aqui se castean los datos o normalizan */
			const aValue = Number(String(a[dataSort]).replace(numberRexeg, ''));
			const bValue = Number(String(b[dataSort]).replace(numberRexeg, ''));

			/* aca comparamos como number */
			if (!isNaN(aValue) && !isNaN(bValue)) {
				return bValue - aValue;
			}

			/* aca comparamos como string */
			return (b[dataSort] as string).localeCompare(a[dataSort] as string);
		});
	}, [dataSort]);

	const handleSort = (columnName: any) => {
		if (columnName === dataSort) {
			setSortDirection((prevDirection) =>
				prevDirection === Sort.asc ? Sort.desc : Sort.asc,
			);
		} else {
			setDataSort(columnName);
			setSortDirection(Sort.asc);
		}
	};

	//const keys = Object.keys(DATA[0]) as any;
	const columnsID = useMemo(
		() => generateIDArray(columns.size),
		[columns.size],
	);
	return (
		<>
			<div className="table__title__header"></div>
			<div>
				<table>
					<thead>
						<tr>
							{Array.from(columns).map(
								(keyTable: any, index: number) => (
									<th
										key={columnsID[index]}
										onClick={() => handleSort(keyTable)}>
										{keyTable}{' '}
										{dataSort === keyTable &&
											sortDirection === Sort.asc &&
											'↑'}{' '}
										{dataSort === keyTable &&
											sortDirection === Sort.desc &&
											'↓'}
									</th>
								),
							)}
						</tr>
					</thead>

					<tbody>
						{rows.map((row: any) => (
							<tr key={row['firstName']}>
								<td>{row['firstName']}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
