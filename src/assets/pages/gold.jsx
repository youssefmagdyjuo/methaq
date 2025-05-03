'use client'

import { useEffect, useState } from "react"
// import NavBar from '../components/navBar';
export default function Gold() {
        // stats 
        const [goldWight,setgoldWight]=useState(null)
        const [goldInput,setgoldInput]=useState(null)
        const [moneyInput,setMoneyInput]=useState(null)
        const [output,setOutput]=useState(null)
        const [nysap,setnysap]=useState(85)
        useEffect(()=>{
            if (goldWight!=null&&goldInput!=null){
                setMoneyInput(goldInput*goldWight)
                if (goldWight>nysap||goldWight==nysap)
                    {
                        setOutput(`مقدار الزكاة : ${moneyInput/40}`)
                    }
                    else{
                        setOutput('لم يبلغ نصاب الزكاة')
                    }
            }
        },[goldWight,goldInput,moneyInput,nysap])
    return (
<div>
            <h1 className="title">  حساب زكاة الذهب </h1>
        <div className="money_container special">
<p>اذا حال
عليها الحول - عام هجري- وجبت فيها الزكاة، ونصاب
الذهب:
1- الذهب عيار 24 نصابه: 85 جرامًا.
2- الذهب عيار 21 نصابه: 97 جرامًا.
3- الذهب عيار 18 نصابه: 113 جرامًا.
يقول أهل العلم أن الذهب المرتدي لا يجب فيه
الزكاة ويقول البعض الآخر انه يجب فية الزكاة</p>
        <div className="type_container ">
            <label>عيار الذهب</label>
            <div>
                <label for='24'>24</label>
                <input id="24" type="radio" name="goldType" value="24"
                onChange={(e)=>{setnysap(85)}}
                checked={nysap === 85}/>

                <label for='21'>21</label>
                <input id="21" type="radio" name="goldType" value="21"
                onChange={(e)=>{setnysap(97)}}/>
                
                <label for='18'>18</label>
                <input id="18" type="radio" name="goldType" value="18"
                onChange={(e)=>{setnysap(113)}}/>
            </div>
        </div>

        <div className="input_lable">
        <label> الوزن بالجرام :</label>
        <input
        className="special"
        type="text"
        value={goldWight}
        onChange={(e)=>{
            setgoldWight(e.target.value)
        }}/>
        </div>

        <div className="input_lable">
        <label>سعر جرام الذهب  :</label>
        <input
        className="special"
        type="text"
        value={goldInput}
        onChange={(e)=>{
            setgoldInput(e.target.value)
        }}/>
        </div>

        <div className="input_lable">
            <label>مقدار المبلغ :</label>
            <div
            className="special"
            onChange={(e)=>{
                setMoneyInput(e.target.value)
            }}>
                {moneyInput}
            </div>
        </div>
        
        <div className="output special">
        <h1>{output}
            {/* {nysap} */}
        </h1>
        </div>
        </div>
                {/* <NavBar /> */}
        </div>
    )
}
