
import React from 'react'
// import NavBar from '../components/navBar';
import { Link } from 'react-router-dom';
const allZakah = [
    {
        id: 'money',
        name: "المال",
        img:'/imgs/money.png',
    },
    {
        id: 'gold',
        name: "الذهب",
        img:'/imgs/gold.png'
    },
    {
        id: 'silver',
        name: "الفضة",
        img:'/imgs/silver.png',
        },
    {
        id: 'zoroa',
        name: "الزروع والثمار",
        img:'/imgs/zoroa.png',
    },

]

export default function Zakah() {
    return (
        <div >
            <h1 className='title'>الزكاة</h1>
            <div className='zakah_container'>
        {
            allZakah.map((z)=>{
                return(
                    <Link to={`/zakah/${z.id}`} key={z.id}>
                        <div key={z.id}className='type special' >
                            <h1>{z.name}</h1>
                            <div className='img'>
                            <img src={z.img} alt={z.name} />
                            </div>
                        </div>
                    </Link>
                )
            })
            
        }
            </div>
        {/* <NavBar /> */}
        </div>
    )
}
