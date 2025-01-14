import React, { useEffect, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`


const LeaderBoard = () => {

    function Table({ columns, data }) {
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
        } = useTable(
          {
            columns,
            data,
          },
          useSortBy
        )
      
        // We don't want to render all 2000 rows for this example, so cap
        // it at 20 for this use case
        const firstPageRows = rows.slice(0, 20)
      
        return (
          <>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {firstPageRows.map(
                  (row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          )
                        })}
                      </tr>
                    )}
                )}
              </tbody>
            </table>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
          </>
        )
      }

    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name'
          },
          {
              Header: 'Squats',
              accessor: 'squats',
          },
          {
              Header: 'Hand Extensions',
              accessor: 'handExtensions'
          },
          {
            Header: 'Lunges',
            accessor: 'lunges'
        }
        ],
        []
      )

    const [users, setUsers] = useState([])
    const fetchAllUsers = async() => {
        const response = await fetch(`http://localhost:5001/api/auth/getAllUsers`, {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem("token"),
            }
        })
        const resp = await response.json();
        if(resp){
            console.log(resp)
            setUsers(users)
        }
    }
    useEffect(()=>{
        console.log(fetchAllUsers())
    }, [])
    const data = [
        {
            name: 'Kamaljeet',
            squats: 18,
            handExtensions: 12,
            lunges: 30
        },
        {
            name: 'Adyasha',
            squats: 10,
            handExtensions: 20
        },
        {
            name: 'Saily',
            squats: 6,
            handExtensions: 2,
            lunges: 24
        },
        {
            name: 'Pratyush',
            squats: 16,
            handExtensions: 8,
            lunges: 5
        },
    ]
  return (
    <div>
        <Styles>
      <Table columns={columns} data={data} />
    </Styles>
    </div>
  )
}

export default LeaderBoard