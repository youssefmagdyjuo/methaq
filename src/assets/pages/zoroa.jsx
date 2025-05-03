'use client'
import { useEffect, useState } from "react"
// import NavBar from '../components/navBar';
export default function Zoroa() {
        // stats 
        const [moneyInput,setMoneyInput]=useState(null)
        const [output,setOutput]=useState(null)
        const [calcType,setCalcType]=useState(5)
        useEffect(()=>{
            if (moneyInput!=null){
                setOutput(`مقدار الزكاة : ${moneyInput*calcType/100}`)
            }
            else{
                setOutput('')
            }
        },[calcType,moneyInput])
    return (
        <div>
            <h1 className="title">  حساب زكاة الزروع و الثمار </h1>
            <div className="money_container special">
                <p>
                تخرج الزكاة يوم حصادها اذا بلغت النصاب المقدر ب5 اوسق او ما يعادل 300 صاع
                </p>
                <div className="type_container ">
                    <label>نوع الري : </label>
                    <div>
                        <label for='r'>مطر</label>
                        <input id="r" type="radio" name="goldType" value="r"
                        onChange={(e)=>{setCalcType(10)}}/>

                        <label for='m'>صناعي</label>
                        <input id="m" type="radio" name="goldType" value="m"
                        onChange={(e)=>{setCalcType(5)}}
                        checked={calcType === 5}
                        />
                        
                        <label for='mix'>مختلط</label>
                        <input id="mix" type="radio" name="goldType" value="mix"
                        onChange={(e)=>{setCalcType(7.5)}}/>
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

                <div className="output special">
                <h1>{output}
                </h1>
                </div>
            </div>
                    {/* <NavBar /> */}
        
        </div>
    )
}
