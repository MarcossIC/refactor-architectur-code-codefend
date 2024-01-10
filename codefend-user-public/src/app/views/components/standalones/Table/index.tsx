import React, { useMemo, useState } from 'react';
import './table.module.scss';
import { generateIDArray } from '../../../../data';

enum Sort {
	asc = 'asc',
	desc = 'desc',
}

interface TableProps {
	data: any[];
	columns: string[];
}

export const Table: React.FC<TableProps> = ({ data, columns }) => {
	const [sortDirection, setSortDirection] = useState<Sort>(Sort.asc);
	const [dataSort, setDataSort] = useState<string>(columns[0]);
	const [selectedField, setSelectedField] = useState<string>(columns[0]);

	const rows = useMemo(() => {
		return [...data].sort((a: any, b: any) => {
			const aValue = a[dataSort];
			const bValue = b[dataSort];

			if (sortDirection === Sort.asc) {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});
	}, [data, dataSort, sortDirection]);

	const columnsID = useMemo(() => generateIDArray(columns.length), [columns]);
	const rowsID = useMemo(() => generateIDArray(rows.length), [rows]);

	const handleSort = (columnName: string) => {
		if (columnName === dataSort) {
			setSortDirection((prevDirection) =>
				prevDirection === Sort.asc ? Sort.desc : Sort.asc,
			);
		} else {
			setDataSort(columnName);
			setSortDirection(Sort.asc);
		}
	};

	const handleFieldChange = (selected: string) => {
		setSelectedField(selected);
	};

	const filteredRows = useMemo(() => {
		return rows.filter((row: any) =>
			String(row[selectedField]).toLowerCase().includes('filtro'),
		); // Reemplaza 'filtro' con el valor del filtro deseado
	}, [rows, selectedField]);

	return (
		<>
			<div className="table__title__header"></div>
			<div>
				<table>
					<thead>
						<tr>
							{columns.map((keyTable: string, index: number) => (
								<th
									scope="col"
									key={columnsID[index]}
									id={'a' + columnsID[index]}
									onClick={() => handleSort(keyTable)}>
									{keyTable}{' '}
									{dataSort === keyTable &&
										sortDirection === Sort.asc &&
										'↑'}{' '}
									{dataSort === keyTable &&
										sortDirection === Sort.desc &&
										'↓'}
								</th>
							))}
						</tr>
					</thead>
					<tbody style={{ overflowX: 'auto' }}>
						{rows.map((row: any, rowIndex: number) => (
							<tr key={rowsID[rowIndex]}>
								{columns.map((column: string, colIndex: number) => (
									<td key={colIndex}>{row[column.toLowerCase()]}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
