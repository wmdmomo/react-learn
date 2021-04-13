import { FC, useState, useEffect } from 'react'
import { Form, Select } from 'antd'

const { Option } = Select
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
    useEffect(() => {
        console.log(form.getFieldValue('tsta'))
    })

    const [val, setval] = useState(0)
    console.log(dataList[0].name)
    const getF = () => {
        setval(val + 1)
        console.log(val)
        props.handleChange(val)
    }
    return (
        <div>
            <div>
                {val}
                <button onClick={getF}>传值</button>
            </div>
            <Form>
                <Form.Item label="水果" name="testa" initialValue={dataList[0].name}>
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
