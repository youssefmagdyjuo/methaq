'use client'
import { useEffect, useState } from "react"
// import NavBar from '../components/navBar';
export default function Silver() {
    // stats 
    const [silverWight,setsilverWight]=useState(null)
    const [silverInput,setsilverInput]=useState(null)
    const [moneyInput,setMoneyInput]=useState(null)
    const [output,setOutput]=useState(null)
    const nysap = 595
    useEffect(()=>{
        if (silverWight!=null&&silverInput!=null){
            setMoneyInput(silverInput*silverWight)
            if (silverWight>nysap||silverWight==nysap)
                {
                    setOutput(`مقدار الزكاة : ${moneyInput/40}`)
                }
                else{
                    setOutput('لم يبلغ نصاب الزكاة')
                }
        }
    },[silverWight,silverInput,moneyInput])
    return (
        <div>
            <h1 className="title">حساب زكاة الفضة</h1>
        <div className="money_container special">
            <p>تشمل اواني فضية بيتية | مصنوعات يدوية | مجوهرات | ادوات ... عادة الفضة تكون 90% صافية لذا تأخذ 90% من الوزن الكلي  ملحوظة : اقل نصاب لحساب زكاة الفضة هو 595 جرام</p>
        <div className="input_lable">
        <label> الوزن بالجرام :</label>
        <input
        className="special"
        type="text"
        value={silverWight}
        onChange={(e)=>{
            setsilverWight(e.target.value)
        }}/>
        </div>

        <div className="input_lable">
        <label>سعر جرام الفضة  :</label>
        <input
        className="special"
        type="text"
        value={silverInput}
        onChange={(e)=>{
            setsilverInput(e.target.value)
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
        <h1>{output}</h1>
        </div>
        </div>
                {/* <NavBar /> */}
    
        </div>
    )
}
