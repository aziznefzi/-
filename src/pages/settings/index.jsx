import React from 'react'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import {UseTheme} from "../../context/ThemeContext" 

export default function Settings() {
  const {mode, toggleMode} = UseTheme()
  return (
    <>
    <IconButton onClick={toggleMode}>
      {mode === "dark" ? <NightlightRoundIcon/> : <LightModeIcon/>}
    </IconButton>
    </>
  )
}
