'use client'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import  azkarData from '../components/azkar.json'
export default function AzkarDetils() {
    const { zekrId } = useParams()
    const zekr = azkarData.find((z)=>{
        return z.id == parseInt(zekrId)
    })
    // array includes objects ...every object has a count and id(card)
    const all_Count_And_Id = zekr.content.map((z) => ({
        count: z.count,
        id: z.id
    }))
    const [all_count, setAll_count] = useState(all_Count_And_Id)
    
    function changeCount(id) {
        const updatedCounts = all_count.map((z) => {
            if (z.id === id) {
                if(z.count == 1) {
                    document.getElementsByClassName('count')[id].style.color = '#999'
                    return { ...z, count: z.count - 1 }
                }
                else if(z.count > 1) {
                    return { ...z, count: z.count - 1 }
                }
                
            }

            return z
        })
        setAll_count(updatedCounts)
    }
    return (
        <div className='zekr_detils_container'>
            {/* {count} */}
            <h1 className='title'>{zekr.title}</h1>
            <div className='cards_countainer'>
                {
                    zekr.content.map((zekr,index) => {
                        return (
                            <div key={index} className="card">
                                <div className="count"
                                onClick={()=>{
                                    changeCount(zekr.id)
                                }}
                                >
                                    {all_count[zekr.id].count<10?`0${all_count[zekr.id].count}`:all_count[zekr.id].count}
                                </div>
                                <div className="content">
                                    <h5>
                                        {zekr.start}
                                    </h5>
                                    <p>
                                        {zekr.text}
                                    </p>
                                    <small className="description">
                                        {zekr.description}
                                    </small>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
