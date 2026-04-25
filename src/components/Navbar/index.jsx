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
            <li><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to="#">الرئيسية</Link></li>
            <li><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to="#">السبحة</Link></li>
            <li><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to="#">الأذكار</Link></li>
            <li><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to="#">القرآن الكريم</Link></li>
            <li><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to="#">مواقيت الصلاة</Link></li>
            <li><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to="#">القبلة</Link></li>
            <li><Link style={{color: theme.palette.text.navColor, textDecoration: 'none'}} to="/settings">الإعدادات</Link></li>
        </ul>
        <MenuIcon 
        onClick={() => {setShowNav(!showNav), 
          setShowNav(!showNav)
          showNav === false ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
          }} className={styles.menuIcon}/>
    </nav>

    <Slide in={showNav} direction="down">
    <nav className={styles.mobile_nav}>
        <ul>
            <li>
                <Link className={styles.mobile_link} style={{color: theme.palette.text.navColor}} to="#">
                    <HomeIcon /> الرئيسية
                </Link>
            </li>
            <li>
                <Link className={styles.mobile_link} style={{color: theme.palette.text.navColor}} to="#">
                    <HistoryIcon /> السبحة
                </Link>
            </li>
            <li>
                <Link className={styles.mobile_link} style={{color: theme.palette.text.navColor}} to="#">
                    <StickyNote2Icon /> الأذكار
                </Link>
            </li>
            <li>
                <Link className={styles.mobile_link} style={{color: theme.palette.text.navColor}} to="#">
                    <AutoStoriesIcon /> القرآن الكريم
                </Link>
            </li>
            <li>
                <Link className={styles.mobile_link} style={{color: theme.palette.text.navColor}} to="#">
                    <AccessTimeIcon /> مواقيت الصلاة
                </Link>
            </li>
            <li>
                <Link className={styles.mobile_link} style={{color: theme.palette.text.navColor}} to="#">
                    <ExploreIcon /> القبلة
                </Link>
            </li>
            <li>
                <Link className={styles.mobile_link} style={{color: theme.palette.text.navColor}} to="/settings">
                    <SettingsIcon /> الإعدادات
                </Link>
            </li>
        </ul>
    </nav>
      </Slide> 
    </div>
  )
}