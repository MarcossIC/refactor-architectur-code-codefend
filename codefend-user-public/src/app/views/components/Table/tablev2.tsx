import React, { Fragment, useMemo, useState } from 'react';
import { generateIDArray } from '../../../data';
import { EmptyCard, PageLoader, Show } from '..';
import './table.scss';

export enum Sort {
	asc = 'asc',
	desc = 'desc',
}

interface TableProps {
	rowsData: Record<string, TableItem>[];
	columns: ColumnTable[];
	showRows: boolean;
	tableAction?: TableAction;
	sizeY: number;
}

export interface ColumnTable {
	name: string;
	value: string;
	style: string;
}

export interface TableItem {
	value: string | JSX.Element;
	style: string;
}

export interface TableAction {
	icon: JSX.Element;
	style: string;
	action: (id: string) => void;
}

export const TableV2: React.FC<TableProps> = ({
	rowsData,
	columns,
	showRows,
	tableAction,
	sizeY = 100,
}) => {
	const [sortDirection, setSortDirection] = useState<Sort>(Sort.asc);
	const [dataSort, setDataSort] = useState<string>(columns[0].name);
	const [selectedField, setSelectedField] = useState<string>('');

	const rows = useMemo(() => {
		return [...rowsData].sort((a: any, b: any) => {
			const aValue = a[dataSort].value;
			const bValue = b[dataSort].value;

			if (sortDirection === Sort.asc) {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});
	}, [rowsData, dataSort, sortDirection]);

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

	const columnForRows = useMemo(() => {
		let result =
			tableAction !== undefined
				? columns.filter((column) => column.name !== 'action')
				: columns;
		return result ?? [];
	}, [columns]);
	console.log({ columnForRows });
	const handleSelected = (e: any, ID: string) => {
		e.preventDefault();
		if (ID === selectedField) setSelectedField('');
		else setSelectedField(ID);

		e.stopPropagation();
	};

	return (
		<>
			<div className="table">
				<div className="columns-name">
					{columns.map((column: ColumnTable, i: number) => (
						<div
							className={column.style}
							key={columnsID[i]}
							onClick={() => handleSort(column.name)}>
							{column.value}
							<Show
								when={
									dataSort === column.name &&
									sortDirection === Sort.asc
								}>
								<span className="sort">{'↑'}</span>
							</Show>
							<Show
								when={
									dataSort === column.name &&
									sortDirection === Sort.desc
								}>
								<span className="sort">{'↓'}</span>
							</Show>
						</div>
					))}
				</div>

				<Show
					when={showRows !== undefined && showRows}
					fallback={<PageLoader />}>
					<div
						className="rows"
						style={{ '--row-size': sizeY + 'dvh' } as any}>
						{rows.map(
							(row: Record<string, TableItem>, rowIndex: number) => (
								<Fragment key={rowsID[rowIndex]}>
									<div
										className={`item ${
											selectedField === rowsID[rowIndex]
												? 'left-marked'
												: ''
										}`}
										onClick={(e: any) =>
											handleSelected(e, rowsID[rowIndex])
										}>
										{columnForRows.map(
											(column: ColumnTable, i: number) => (
												<div
													key={i}
													className={
														row[column.name as keyof typeof row]
															.style
													}>
													{
														row[column.name as keyof typeof row]
															.value
													}
												</div>
											),
										)}
										<Show when={tableAction !== undefined}>
											<div
												className={tableAction?.style}
												onClick={() =>
													tableAction?.action(
														row['ID'].value as string,
													)
												}>
												{tableAction?.icon}
											</div>
										</Show>
									</div>
								</Fragment>
							),
						)}
					</div>
				</Show>
				<Show when={!showRows}>
					<EmptyCard />
				</Show>
			</div>
		</>
	);
};
