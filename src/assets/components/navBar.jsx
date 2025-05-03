// 'use client'
import React from 'react'
import {Link} from 'react-router-dom';

export default function navBar() {
        // const [selctor, setSelctor] = useState(false)
    return (
        <div className='navbar'>
            <Link to={'/azkar'}>
            <div className='nav_elment_container'>
                <div className='kbla'>
                        <img src='/imgs/kbla.png' alt='icon' />
                </div>
                <h4>
                أذكار
                </h4>
            </div>
            </Link>
            <Link to={'/zakah'}>
                <div className='nav_elment_container'>
                <div className='zakaah'>
                        <img src='/imgs/zakah.png' alt='icon' />
                </div>
                <h4>الزكاة</h4>
                </div>
            </Link>
            <Link to={'/methaq'}>
            <div className='nav_elment_container'>
                <div className='home'>
                        <img src='/imgs/home.png' alt='icon' />
                </div>
                <h4>
                الرئيسية
                </h4>
            </div>
            </Link>
            <Link to={'/sbha'}>
            <div className='nav_elment_container'>
                <div className='sbha'>
                        <img src='/imgs/sbha.png' alt='icon' />
                </div>
                <h4>
                السبحة
                </h4>
            </div>
            </Link>
            <div className='nav_elment_container'
            onClick={()=>{
                document.querySelector('.selecters').classList.toggle('selecter_active')
            }}
            >

                <div className='location'>
                <img src='/imgs/location.png' alt='icon' />
                </div>
                <h4>
                الموقع
                </h4>
            </div>
        </div>
    )
}
