import React, { useState, useEffect } from 'react'
import style from "./style.module.css"
import { useTheme } from '@mui/material/styles'
import azkarData from "./azkar.json"

export default function Sebha() {
    const [count, setCount] = useState(0)
    const [azkarIndex, setAzkarIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const theme = useTheme()
    
    const handleSebhaClick = () => {
        setCount(prev => prev + 1)
        setIsAnimating(true)
        
        // Optional vibration for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50)
        }
        
        // Remove animation class after it finishes
        setTimeout(() => {
            setIsAnimating(false)
        }, 200) 
    }

    const changeZikr = () => {
        setAzkarIndex((prev) => (prev + 1) % azkarData.length)
        setCount(0)
    }

    const resetCount = () => {
        setCount(0)
    }

  return (
    <>
     <div className={style.container}>
        <h2 className={style.zikrText} style={{color: theme.palette.text.titleColor}}>
            {azkarData[azkarIndex].text}
        </h2>
        <div
            style={{backgroundColor: theme.palette.text.titleColor}}
            className={`${style.SebhaContent} ${isAnimating ? style.shake : ''}`}
            onClick={handleSebhaClick}
        >
            <p className={style.count}><span className={style.count__num}>{count}</span></p>
        </div>
        <div className={style.SebhaButtons}>
            <button className={style.btnReset} onClick={resetCount}>إعادة</button>
            <button className={style.btnNext} onClick={changeZikr}>تغيير الذكر</button>
        </div>
     </div>
    </>
  )
}
