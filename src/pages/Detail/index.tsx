import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Modal, message, Divider, Button } from 'antd'
import React, { FC, useRef, useState } from 'react'
import style from './style.less'
import { PlusOutlined } from '@ant-design/icons'
import { DetailItem } from './data'
import OperationModal from './components/OperationModal'
const { confirm } = Modal
const Detail: FC = () => {
  const dataSource: DetailItem[] = [
    { key: 1, name: 'wmd', time: '2021-4-19', email: '1234@qq.com' },
    { key: 2, name: 'qaz', time: '2021-4-20', email: 'swz4@qq.com' },
    { key: 3, name: 'qwe', time: '2021-4-21', email: '1sws34@qq.com' },
    { key: 4, name: 'wer', time: '2021-4-22', email: '11qasza4@qq.com' }
  ]
  const [visible, setVisible] = useState<boolean>(false)
  const [current, setCurrent] = useState<DetailItem | undefined>(undefined)
  const [data, setData] = useState<DetailItem[]>(dataSource)
  const actionRef = useRef<ActionType>()
  const showModal = (item: DetailItem | undefined) => {
    setVisible(true)
    setCurrent(item)
  }
  const handleCancel = () => {
    setVisible(false)
    setCurrent(undefined)
  }
  // const hideModal = (item: DetailItem, flag: boolean) => {
  //   setVisible(false)
  //   const index = item.key
  //   if (flag) {
  //     console.log(item)
  //     dataSource.splice(index, 1)
  //     setData(dataSource)
  //     if (actionRef.current) {
  //       console.log(actionRef)
  //       actionRef.current.reload()
  //     }
  //   }
  // }
  const deleteConfirm = (item: DetailItem) => {
    console.log('delete: ', item)
  }
  const onDelete = (item: DetailItem) => {
    confirm({
      title: '提示',
      centered: true,
      content: <div>您确定删除该记录吗？</div>,
      onOk() {
        deleteConfirm(item)
      },
      maskClosable: true
    })
  }
  const columns: ProColumns<DetailItem>[] = [
    {
      hideInTable: true,
      renderFormItem: () => (
        <Button
          style={{ width: '100px' }}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal(undefined)}
        >
          新增记录
        </Button>
      )
    },
    {
      title: '姓名',
      dataIndex: 'name'
      // 实现一个下拉框
    },
    {
      title: '时间',
      dataIndex: 'time',
      hideInSearch: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: '操作',
      width: 100,
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className={style.detailItem}>
            <a onClick={(e) => onDelete(record)}>删除</a>
            <a onClick={() => showModal(record)}>编辑</a>
          </div>
        )
      }
    }
  ]
  return (
    <>
      <PageHeaderWrapper title={false}>
        <ProTable
          actionRef={actionRef}
          toolBarRender={false}
          columns={columns}
          request={() => Promise.resolve({ data: data, success: true })}
        ></ProTable>
      </PageHeaderWrapper>
      {/* <OperationModal
        visible={visible}
        current={current}
        onCancel={handleCancel}
      ></OperationModal> */}
      {/* {current && (
        <Modal
          title="Modal"
          visible={visible}
          onOk={() => hideModal(current, true)}
          okText="确认"
          cancelText="取消"
        >
          
        </Modal> */}
      {/* )} */}
    </>
  )
}
export default Detail
