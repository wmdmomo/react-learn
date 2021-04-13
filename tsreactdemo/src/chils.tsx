import React, { FC, useState } from 'react'
import Speech from './Speech'
interface NameProp {
    name: String
    age: Number
}
const Chils: FC<NameProp> = (props) => {
    const { name, age } = props
    const [cnt, setCnt] = useState(0)
    const dataList = [
        {
            type: 'orange',
            name: '橘子'
        },
        {
            type: 'apple',
            name: '苹果'
        },
        {
            type: 'banana',
            name: '香蕉'
        },
        {
            type: 'grape',
            name: '葡萄'
        }
    ]
    const handleChange = (mess: any) => {
        setCnt(mess)
        console.log(mess)
    }
    return (
        <div>
            <p>我的名字叫：{name}</p>
            <p>Jinian:{age}</p>
            <p>计数：{cnt}</p>
            <Speech dataList={dataList} handleChange={handleChange}></Speech>
        </div>
    )
}
export default Chils
