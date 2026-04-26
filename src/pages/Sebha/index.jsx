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
        setAzkarIndex((prev) => (prev + 1) % azkarData.length)
        
        setIsAnimating(false)
        setTimeout(() => {
            setIsAnimating(true)
        }, 10)
        
        // Optional vibration for mobile devices
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(50)
        }
    }

    const changeZikr = () => {
        setAzkarIndex((prev) => (prev + 1) % azkarData.length)
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
            onAnimationEnd={() => setIsAnimating(false)}
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
