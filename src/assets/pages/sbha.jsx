import React from 'react'

export default function Sbha() {
    const [count, setCount] = React.useState(0);
    return (
        <div className='sbha_container'>
            <div className='sbha'>
            <button
            onClick={() => setCount(0)}>
            </button>
            <div
            className='clicker'
            onClick={() => setCount(count + 1)}>
                {count}
            </div>
            
        </div>
        </div>
        
    )
    }
