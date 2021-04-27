import React, { FC } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Link } from 'umi'
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
    hideInSearch: true,
    render: (_) => <a>{_}</a>
  },
  {
    title: '容量名称',
    dataIndex: 'containers',
    hideInSearch: true,
    sorter: (a, b) => a.containers - b.containers
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    hideInSearch: true
  },
  {
    title: '操作',
    width: '110px',
    hideInSearch: true,
    render: (_, record) => (
      <Link to={`/admin/sub-page2/info?code=${record.name}`}>查看详情</Link>
    )
  }
]
const ListConfig: FC = () => {
  return (
    <>
      <PageHeaderWrapper title={false}>
        <ProTable<TableListItem>
          search={false}
          toolBarRender={false}
          columns={columns}
          request={(params) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            // console.log(params, sorter, filter)
            return Promise.resolve({
              data: TableSource,
              success: true
            })
          }}
        ></ProTable>
      </PageHeaderWrapper>
    </>
  )
}
export default ListConfig
