import { FC } from 'react'
import { Table, Popconfirm, Button } from 'antd'

const ProductList: FC<{
  products: { name: string; id: string }[]
  onDelete: (id: string) => void
}> = ({ onDelete, products }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Actions',
      render: (text: any, record: { id: string }) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        )
      }
    }
  ]
  return <Table dataSource={products} columns={columns} />
}

export default ProductList
