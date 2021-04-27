import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Modal, message, Divider, Button } from 'antd'
import React, { FC, useRef, useState } from 'react'
import style from './style.less'
import { CloudFilled, PlusOutlined } from '@ant-design/icons'
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
  const hanleSub = (type: string, newRow: DetailItem, id?: number) => {
    setVisible(false)
    setCurrent(undefined)
    if (type === 'add') {
      newRow.key = Math.max(...data.map((item) => item.key)) + 1
      setData([...data, newRow])
    }
    if (type === 'edit' && id) {
      data[id - 1] = newRow
      setData([...data])
    }
    // 让这个table 在重新拿到一遍数据
    if (actionRef.current) {
      actionRef.current.reload()
    }
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
  const deleteConfirm = (item: DetailItem, index: number) => {
    const tmp = data.slice()
    // 这个删除不对 因为前面的key删掉了
    tmp.splice(index, 1)
    console.log(tmp)
    setData([...tmp])
    if (actionRef.current) {
      console.log(actionRef)
      actionRef.current.reload()
    }
  }
  const onDelete = (item: DetailItem, index: number) => {
    confirm({
      title: '提示',
      centered: true,
      content: <div>您确定删除该记录吗？</div>,
      onOk() {
        deleteConfirm(item, index)
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
      render: (_, record, index) => {
        return (
          <div className={style.detailItem}>
            <a onClick={(e) => onDelete(record, index)}>删除</a>
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

      <OperationModal
        visible={visible}
        current={current}
        onCancel={handleCancel}
        onOK={hanleSub}
      ></OperationModal>

      {/* <OperationModal
          visible={visible}
          current={current}
          onCancel={handleCancel}
          onOK={hanleSub}
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
