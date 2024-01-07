import React, { useState } from 'react';
import styles from './table.module.scss';



export const Table = (DATA: any[]) => {
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // magic string ya lo se no me retes!
	const [dataSort, setDataSort] =
		React.useState<keyof TableType>('firstName');

	/* Esto es para eliminar elementos repetidos
     Hay muchas formas de hacer esto!
  */
	const FILTERED_DATA = Object.values(
		DATA.reduce<Record<TableType['firstName'], TableType>>((map, row) => {
			map[row['firstName']] = row;
			return map;
		}, {}),
	);
  console.log(FILTERED_DATA)

	const HEADERS = Object.values(
		DATA.reduce(
			(map: any, row: any) => {
				map[row['firstName']] = row;
				return map;
			},
			{} as Record<string, TableType>,
		),
	);
  console.log(HEADERS)
	/* esto se ocupa del sorting de los elementos de la tabla */
	const matches = React.useMemo(() => {
		const numberRexeg = new RegExp(/[\$\(\)\,]/g, 'ig'); // esto es para limpiar el input

		return [...FILTERED_DATA].sort((a, b) => {
			/* aqui se castean los datos o normalizan */
			const aValue = Number(String(a[dataSort]).replace(numberRexeg, ''));
			const bValue = Number(String(b[dataSort]).replace(numberRexeg, ''));

			/* aca comparamos como number */
			if (!Number.isNaN(aValue) && !Number.isNaN(bValue)) {
				return bValue - aValue;
			}

			/* aca comparamos como string */
			return (b[dataSort] as string).localeCompare(a[dataSort] as string);
		});
	}, [dataSort]);

	const handleSort = (columnName: keyof TableType) => {
		if (columnName === dataSort) {
			setSortDirection((prevDirection) =>
				prevDirection === 'asc' ? 'desc' : 'asc',
			);
		} else {
			setDataSort(columnName);
			setSortDirection('asc');
		}
	};

	const keys = Object.keys(DATA[0]) as (keyof TableType)[];

	return (
		<>
			<div className={styles['table__title__header']}></div>
			<div>
				<table>
					<thead>
						<tr>
							{/* Renderizar todas las claves en el encabezado */}
							{keys.map((key) => (
								<th key={key} onClick={() => handleSort(key)}>
									{key}{' '}
									{dataSort === key &&
										sortDirection === 'asc' &&
										'↑'}{' '}
									{dataSort === key &&
										sortDirection === 'desc' &&
										'↓'}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{FILTERED_DATA.map((row) => (
							<tr key={row['firstName']}>
								<td>{row['firstName']}</td>
								{/* ... (renderizar otras celdas) */}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
