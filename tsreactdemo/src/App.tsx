import React, { FC, useState } from 'react'
import Chils from './chils'

const App: FC = () => {
    const [cnt, setCnt] = useState(0)
    return (
        <div>
            <Chils name={'wmd'} age={13}></Chils>
            <div onClick={() => setCnt(cnt + 1)}></div>
            <p>{cnt}</p>
        </div>
    )
}
export default App
