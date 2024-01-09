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
	rowsTable?: any[];
}

export const Table: React.FC<TableProps> = ({ DATA, columns, rowsTable }) => {
	const [sortDirection, setSortDirection] = useState<Sort>(Sort.asc);
	const [dataSort, setDataSort] = useState<any>('firstName');

	const rows = useMemo(() => {
		const cleanNumber = (value: any) =>
			Number(String(value).replace(/[\$\(\)\,]/g, ''));

		return [...DATA].sort((a: any, b: any) => {
			const aValue = cleanNumber(a[dataSort]);
			const bValue = cleanNumber(b[dataSort]);

			if (!isNaN(aValue) && !isNaN(bValue)) {
				return bValue - aValue;
			} else {
				// Si al menos uno de los valores no es un número, compara como cadenas
				return String(b[dataSort]).localeCompare(String(a[dataSort]));
			}
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

	const rowsID = useMemo(() => generateIDArray(rows.length), [rows.length]);

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
						{rows.map((row: any, index: number) => (
							<tr key={rowsID[index]}>
								<td>{row['firstName']}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
