import React ,{ useState } from 'react'
import "../styles/clock.scss"

const Clock = () => {
    let time  = new Date().toLocaleTimeString()
      
    const [ctime,setTime] = useState(time)
    const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime)

    return (
        <div className='clock'>{ctime}</div>
    )
}

export default Clock
