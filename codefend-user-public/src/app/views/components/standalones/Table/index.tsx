import React from 'react'
import styles from './table.module.scss'
import { defaultData as DATA, TableType } from './tableColumnDef'

/* Esto es para eliminar elementos repetidos
	 Hay muchas formas de hacer esto!
*/
const FILTERED_DATA = Object.values(
  DATA.reduce<Record<TableType['firstName'], TableType>>((map, row) => {
    map[row['firstName']] = row;
    return map;
  }, {})
);

export const Table = () => {

  const [dataSort, setDataSort] =
    React.useState<keyof TableType>("firstName");

	/* esto se ocupa del sorting de los elementos de la tabla */
  const matches = React.useMemo(
    () => {
      const numberRexeg = new RegExp(/[\$\(\)\,]/g, 'ig') // esto es para limpiar el input

      return [...FILTERED_DATA].sort((a, b) => {
        /* aqui se castean los datos o normalizan */
        const aValue = Number(String(a[dataSort]).replace(numberRexeg, ''))
        const bValue = Number(String(b[dataSort]).replace(numberRexeg, ''))

        /* aca comparamos como number */
        if(!Number.isNaN(aValue)  && !Number.isNaN(bValue)) {
          return bValue - aValue
        }
        
        /* aca comparamos como string */
        return (b[dataSort] as string).localeCompare((a[dataSort] as string)) 

      })
      
    },
    [dataSort]
  );

  return (
    <>
    <div className={styles['table__title__header']}></div>
    <div>
			<table>

				<thead>
					<tr>
						<th onClick={() => setDataSort("firstName")}>firstName</th>
						<th onClick={() => setDataSort("lastName")}>lastName</th>
						<th onClick={() => setDataSort("age")}>age</th>
						<th onClick={() => setDataSort("visits")}>visits</th>
						<th onClick={() => setDataSort("status")}>status</th>
						<th onClick={() => setDataSort("progress")}>progress</th>
					</tr>
				</thead>

				<tbody>
					{
						matches.map((row) => (
							<tr key={row["firstName"]}>
								<td>{row["firstName"]}</td>
								<td>{row["lastName"]}</td>
								<td>{row["age"]}</td>
								<td>{row["visits"]}</td>
								<td>{row["status"]}</td>
								<td>{row["progress"]}</td>
							</tr>
						))
					}
				</tbody>

			</table>
		</div>
    </>
  )
}
