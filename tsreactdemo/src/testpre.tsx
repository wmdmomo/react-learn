import { Console } from 'node:console'
import { useState, useRef, useEffect } from 'react'
const Counter = () => {
    const [temp, setTemp] = useState(5)

    const log = () => {
        setTimeout(() => {
            console.log('3 秒前 temp = 5，现在 temp =', temp)
        }, 3000)
    }

    return (
        <div
            onClick={() => {
                log()
                setTemp(3)
                // 3 秒前 temp = 5，现在 temp = 5
            }}
        >
            xyz
        </div>
    )
}

export default Counter
