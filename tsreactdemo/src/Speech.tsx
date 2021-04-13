import { FC, useState } from 'react'
interface RelatedInfor {
    // dataList: {
    //     type: string
    //     name: string
    // }[]
    dataList:Array<Object>
    handleChange: Function
    // handleChange: (event: MouseEvent<HTMLButtonElement, number>) => void
}

const Speech: FC<RelatedInfor> = (props) => {
    // function Speech(props: { handleChange?: any; dataList?: any }) {
    const { dataList } = props
    const todoItmes = dataList.map((item: any, index: number) => {
        return <div key={index}>{item.name}</div>
    })

    const [val, setval] = useState(0)
    const getF = () => {
        setval(val + 1)
        console.log(val)
        props.handleChange(val)
    }
    return (
        <div>
            {todoItmes}
            <div>
                {val}
                <button onClick={getF}>传值</button>
            </div>
        </div>
    )
}
export default Speech
