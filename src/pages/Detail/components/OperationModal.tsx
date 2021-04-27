// import { ActionType } from '@ant-design/pro-table'
import { Modal, Form, Input } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { DetailItem } from '../data'
interface OperationProps {
  visible: boolean
  current: DetailItem | undefined
  onCancel: () => void
  onOK: (type: string, param: DetailItem, id?: number) => void
}
const OperationModal: FC<OperationProps> = (props): any => {
  const { visible, current, onCancel, onOK } = props
  const [form] = Form.useForm()
  const [state, setstate] = useState('')
  // const actionRef = useRef<ActionType>()
  useEffect(() => {
    if (form && !visible) {
      form.resetFields()
    }
    if (current) {
      form.setFieldsValue({
        user: current.name
      })
    }
  }, [props.visible])
  const onSubmit = () => {
    const obj: DetailItem = {
      key: (current && current.key) || 0,
      name: form.getFieldValue('user'),
      time: form.getFieldValue('time'),
      email: form.getFieldValue('email')
    }
    // console.log(obj)
    onOK(current ? 'edit' : 'add', obj, current && current.key)
  }
  return (
    <Modal
      width="400px"
      getContainer={false}
      visible={visible}
      title={`${current ? '编辑' : '新建'}`}
      onCancel={() => onCancel()}
      onOk={() => onSubmit()}
    >
      <Form form={form}>
        <Form.Item
          name="user"
          label="姓名"
          rules={[{ required: true, message: 'UM账号不能为空' }]}
        >
          <Input
            placeholder="请输入名字"
            // placeholder={`${current? current.name:'请输入名字'}`}
            disabled={current !== undefined}
          ></Input>
        </Form.Item>
        <Form.Item name="time" label="时间">
          <Input type="text" />
        </Form.Item>
        {/* 这里加一个自定义邮箱验证条件？？？ */}
        <Form.Item name="email" label="邮箱">
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default OperationModal
// 这里是把 新建和修改两个组件 用一个组件来表示
// 来理一下思路 如果是新建的话 current是空的
// 所以可以根据current的值来判断是 新建还是修改
