'use client'
import { useEffect, useState } from "react"
// import NavBar from '../components/navBar';
export default function Money() {
    // stats 
    const [moneyInput,setMoneyInput]=useState(null)
    const [goldInput,setGoldInput]=useState(null)
    const [output,setOutput]=useState(null)
    const [calcType,setCalcType]=useState(85)
    const nysap = goldInput*calcType
    useEffect(()=>{
        if (moneyInput!=null&&goldInput!=null){
            if (moneyInput>nysap||moneyInput==nysap)
                {
                    setOutput(`مقدار الزكاة : ${moneyInput/40}`)
                    
                }
                else{
                    setOutput('لا يجوز التزكي بالمبلغ')
                }
        }
    },[moneyInput,goldInput,calcType])
    return (
        <div>
            <h1 className="title">حساب زكاة المال</h1>
        <div className="money_container special">
            <p>يجوز على المال الزكاة اذا مر عليه الحول (اي عام هجري كامل)  ويجب ان يكون وصل النصاب اما 85 جرام ذهب عيار 24 او 595 جرام فضة عيار</p>

<div className="type_container "> 
    <label>طريقة الحساب</label>
    <div>
        <label for ='goldCalc'>ذهب</label>
        <input type='radio'name="typeOfCalc" value='gold'id="goldCalc" 
        checked={calcType==85}
        onChange={(e)=>{setCalcType(85)}}/>

        <label for='silverCalc'>فضة</label>
        <input type='radio'name="typeOfCalc" value='silver'id="silverCalc"
        onChange={(e)=>{setCalcType(595)}}/>
    </div>
</div>
        <div className="input_lable">

        <label>مقدار المبلغ :</label>
        <input
        className="special"
        type="text"
        value={moneyInput}
        onChange={(e)=>{
            setMoneyInput(e.target.value)
        }}/>
        </div>
        <div className="input_lable">
        <label>
        {calcType==85?'سعر جرام الذهب عيار 24':'سعر جرام الفضة عيار 99.9'}:
        </label>
        <input
        className="special"
        type="text"
        value={goldInput}
        onChange={(e)=>{
            setGoldInput(e.target.value)
        }}/>
        </div>
    
        <div className="output special">
        <h1>{output}
        </h1>
        </div>
        </div>
        {/* <NavBar /> */}
        </div>
    )
}
