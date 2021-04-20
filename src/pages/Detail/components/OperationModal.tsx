import { Form, Input } from 'antd'
import React, { FC } from 'react'
import { DetailItem } from '../data'
interface OperationProps {
  visible: boolean
  current: DetailItem | undefined
  onCancel: () => void
}
const OperationModal: FC<OperationProps> = (props) => {
  const { visible, current, onCancel } = props
  const [form] = Form.useForm()
  const ModalContent = () => {
    return (
      <div>
        <Form form={form}>
          <Form.Item
            name="user"
            label="姓名"
            rules={[{ required: true, message: 'UM账号不能为空' }]}
          >
            <Input
              placeholder="请输入用户名字"
              disabled={current !== undefined}
            ></Input>
          </Form.Item>
          <Form.Item name="time" label="时间">
            <input type="text" />
          </Form.Item>
          {/* 这里加一个自定义邮箱验证条件？？？ */}
          <Form.Item name="email" label="邮箱">
            <input type="text" />
          </Form.Item>
        </Form>
      </div>
    )
  }
  return <></>
}
export default OperationModal
// 这里是把 新建和修改两个组件 用一个组件来表示
// 来理一下思路 如果是新建的话 current是空的
// 所以可以根据current的值来判断是 新建还是修改
