import React, { FC } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { EllipsisOutlined } from '@ant-design/icons'
type TableListItem = {
  key: number
  name: string
  containers: number
  creator: string
}
const TableSource: TableListItem[] = []
const creators = ['wmd', 'qwe', 'wsx', 'qaz', 'yhn']
for (let i = 0; i < creators.length; i++) {
  TableSource.push({
    key: i + 1,
    name: `APP${creators[i]}`,
    containers: Math.floor(Math.random() * 20),
    creator: creators[i]
  })
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>
  },
  {
    title: '容量名称',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers
  },
  {
    title: '创建者',
    dataIndex: 'creator'
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    width: 120,
    render: () => [
      <a key="link">链路</a>,
      <a key="warn">报警</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>
    ]
  }
]
const ListConfig: FC = () => {
  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter)
          return Promise.resolve({
            data: TableSource,
            success: true
          })
        }}
      ></ProTable>
    </>
  )
}
export default ListConfig
