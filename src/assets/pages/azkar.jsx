import React from 'react'
import { Link } from 'react-router-dom'
import  azkarData from '../components/azkar.json'
export default function Azkar() {
    const azkar= azkarData
    return (
        <div>
            <h1 className='title'>الأذكار</h1>
        <div className="azkar_cards_container">
            
        {
            azkar.map((zekr) => (
                <Link to={`/azkarDetils/${zekr.id}`} key={zekr.id}>
                <div key={zekr.id} className="azkar_card">
                    <h3>{zekr.title}</h3>
                </div>
                    
                </Link>
            ))
        }
        </div>
        </div>
    )
}
