import React, { useState } from 'react'
import styles from "./style.module.css"
import logo from "../../image/title-img.png"
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExploreIcon from '@mui/icons-material/Explore';
import SettingsIcon from '@mui/icons-material/Settings';
import Slide from '@mui/material/Slide';


export default function Navbar() {
  const theme = useTheme()
  const [showNav, setShowNav] = useState(false)

  const NavMobileData = [
    {id: 1, icon: <HomeIcon />, to: "/", title: "الرئيسية"},
    {id: 2, icon: <HistoryIcon />, to: "/sebha", title: "السبحة"},
    {id: 3, icon: <StickyNote2Icon />, to: "/hadith", title: "الأحاديث"},
    {id: 4, icon: <AutoStoriesIcon />, to: "#", title: "القرآن الكريم"},
    {id: 5, icon: <AccessTimeIcon />, to: "#", title: "مواقيت الصلاة"},
    {id: 6, icon: <ExploreIcon />, to: "#", title: "القبلة"},
    {id: 7, icon: <SettingsIcon />, to: "/settings", title: "الإعدادات"}
  ]

  const NavMobile = [
    {id: 1, icon: <HomeIcon />, to: "/", title: "الرئيسية"},
    {id: 2, icon: <HistoryIcon />, to: "/sebha", title: "السبحة"},
    {id: 3, icon: <StickyNote2Icon />, to: "/hadith", title: "الأحاديث"},
    {id: 4, icon: <AutoStoriesIcon />, to: "#", title: "القرآن الكريم"},
    {id: 5, icon: <AccessTimeIcon />, to: "#", title: "مواقيت الصلاة"},
    {id: 6, icon: <ExploreIcon />, to: "#", title: "القبلة"},
    {id: 7, icon: <SettingsIcon />, to: "/settings", title: "الإعدادات"}
  ]

  return (
    <div 
    style={{
        backgroundColor: theme.palette.background.navBg,
    }}
    className={styles.container}>
    <nav>
        <div className={styles.logo}>
            <h1 style={{color: theme.palette.text.titleColor}}>صلواتي</h1>
            <img src={logo} alt="logo" />
        </div>
        <ul>
          {NavMobile.map((item) => (
              <li key={item.id}><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to={item.to}>{item.title}</Link></li>
          ))}
        </ul>
        <MenuIcon 
        onClick={() => {
          setShowNav(!showNav)
          document.body.style.overflow = showNav ? "auto" : "hidden"
          }} className={styles.menuIcon}/>
    </nav>

    <Slide in={showNav} direction="down">
    <nav className={styles.mobile_nav}>
        <ul>
            {NavMobileData.map((item) => (
                <li key={item.id}>
                    <Link 
                      className={styles.mobile_link} 
                      style={{color: theme.palette.text.navColor, display: 'flex', width: '100%'}} 
                      to={item.to}
                      onClick={() => {
                        setShowNav(false)
                        document.body.style.overflow = "auto"
                      }}
                    >
                        {item.icon} {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
      </Slide> 
    </div>
  )
}