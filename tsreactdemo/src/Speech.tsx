import { FC, useState, useEffect } from 'react'
import { Form, Select } from 'antd'

const { Option } = Select
interface ArrInfo {
    id: number
    value: number
}
interface RelatedInfor {
    dataList: {
        type: string
        name: string
    }[]
    // dataList: Array<Object>
    handleChange: Function
    // handleChange: (event: MouseEvent<HTMLButtonElement, number>) => void
}

const Speech: FC<RelatedInfor> = (props) => {
    // function Speech(props: { handleChange?: any; dataList?: any }) {
    const { dataList } = props
    const [form] = Form.useForm()
    const [arr, setarr] = useState<ArrInfo[]>([])
    var obj = { a: 8 }
    const [cnt, setCnt] = useState(obj)
    useEffect(() => {
        console.log('HHHHH')
    }, [cnt])

    const [val, setval] = useState(0)

    const getF = () => {
        setarr([
            ...arr,
            {
                id: 5,
                value: Math.random() * 100
            }
        ])
        obj = { a: Math.random() * 100 }
        setCnt(obj)
        console.log(obj)
        // console.log(arr)
        // setval(val + 1)
        // console.log(val)
        // props.handleChange(val)
    }
    return (
        <div>
            <div>
                {val}
                <button onClick={getF}>传值</button>
            </div>
            <Form form={form} initialValues={{ fruit: 'banana' }}>
                <Form.Item label="水果" name="fruit">
                    <Select placeholder="请选择水果" style={{ width: 300 }}>
                        {dataList.map((item: any, index: number) => (
                            <Option key={item.type} value={item.type}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Speech
