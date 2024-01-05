import React from 'react'
import styles from './table.module.scss'
import { defaultData as DATA, TableType } from './tableColumnDef'

export const Table = () => {

  const [dataSort, SetDataSort] = React.useState<keyof TableType>('firstName')

  const matches = React.useMemo(() => {
    return [...DATA].sort((a, b) => {
      if (a[dataSort] < b[dataSort]) return -1
      if (a[dataSort] > b[dataSort]) return 1
      return 0
    })
  }, [dataSort])

  return (
    <>
    <div className={styles['table__title__header']}></div>
    <div>
			<table>

				<thead>
					<tr>
						<th>firstName</th>
						<th>lastName</th>
						<th>age</th>
						<th>visits</th>
						<th>status</th>
						<th>progress</th>
					</tr>
				</thead>

				<tbody>
					{
						DATA.map((row) => (
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
