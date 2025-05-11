import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
    return (
        <div>
            <div className='notfound'>
                <h1>404</h1>
                <h2>الصفحة غير موجودة</h2>
                <p >عذراً، الصفحة التي تبحث عنها غير موجودة</p>
                <p>-الرجوع الي الصفحة الرئيسية-</p>
                <Link to={"/"}>
                <button>الرئيسية</button>
                </Link>
            </div>
        </div>
    )
}
