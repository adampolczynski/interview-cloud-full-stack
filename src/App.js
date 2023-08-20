import { useState, useEffect } from 'react'
import { Header } from 'semantic-ui-react'
import { DataTable } from './components/table/DataTable'
import { Pagination } from './components/table/Pagination'
import { columns } from './components/table/Columns'
import { useLazyQuery, useQuery } from '@apollo/client'
import { graphQLQueries } from './api/graphql.queries'

const ALLOWED_PAGE_SIZES = [10, 25, 50]

function App() {
  const [error, setError] = useState()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  const [sortBy, setSortBy] = useState({ column: 'name', order: 'ASC' })

  const [queryDevicesCount] = useLazyQuery(graphQLQueries.devicesViewCount)

  const handleTableSort = (columnId) => {
    if (sortBy.column === columnId) {
      const order = sortBy.order === 'ASC' ? 'DESC' : 'ASC'
      setSortBy({ column: sortBy.column, order })
    } else {
      setSortBy({ column: columnId, order: 'ASC' })
    }
  }

  useEffect(() => {
    queryDevicesCount()
      .then(({ data, error }) => {
        if (error) {
          throw new Error(error)
        }
        setTotalPages(Math.ceil(data.devicesViewCount / pageSize))
      })
      .catch(({ message }) => setError(message))
  }, [queryDevicesCount, pageSize])

  const { data: devicesViewData, error: devicesViewQueryError } = useQuery(graphQLQueries.devicesView, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      sortBy: sortBy.column,
      sortOrder: sortBy.order,
    },
  })

  const tableData = devicesViewData?.devicesView || []

  if (error || devicesViewQueryError) {
    return <h2 style={{ color: 'red' }}>{error || devicesViewQueryError?.message}</h2>
  }

  return (
    <DataTable
      data={tableData}
      sortBy="user"
      columns={columns}
      sort={handleTableSort}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={page}
          total={totalPages}
          size={pageSize}
          sizes={ALLOWED_PAGE_SIZES}
          setCurrent={(current) => {
            setPage(current)
          }}
          setSize={(size) => setPageSize(size)}
        />
      }
    />
  )
}

export default App
