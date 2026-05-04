import React, { useState } from 'react'
import style from "./style.module.css"
import LogoutIcon from '@mui/icons-material/Logout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StarIcon from '@mui/icons-material/Star';
import profile_img from "../../image/Kids-img/profile.png" 
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookIcon from '@mui/icons-material/Book';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import Goold from "../../image/Kids-img/icons/Goold.png"
import Microphone from "../../image/Kids-img/icons/Microphone.png"
import Kaaba from "../../image/Kids-img/icons/Kaaba.png"
import hand from "../../image/Kids-img/icons/hand.png"
import masjed from "../../image/Kids-img/icons/masjed.png"
import { useKidsContext } from "../../context/KidsContext"
import { useNavigate, useLocation } from 'react-router-dom';
import KidsLevel from './kids-Level';

export default function Kids() {
  const Cards = [
    {id: 1, name: "إنجازاتي", icon: Goold, iconBackground: "rosy"},
    {id: 2, name: "أناشيد إسلامية", icon: Microphone, iconBackground: "blue"},
    {id: 3, name: "قصص الأنبياء", icon: Kaaba, iconBackground: "rosy"},
    {id: 4, name: "أدعية وأذكار", icon: hand, iconBackground: "gold"},
    {id: 5, name: "العبادات", icon: masjed, iconBackground: "green"},
  ]
  
  const {KidsLink, setKidsLink, points} = useKidsContext()
  const navigate = useNavigate();
  const location = useLocation();

  const isLevelPage = location.pathname === '/Kids/KidsLevel';
  return (
    <div className={style.container}>
      <nav>
      <div className={style.Left_Nav}>
        <LogoutIcon className={style.LogoutIcon}/>
        <CardGiftcardIcon className={style.GiftIcon}/>
      </div>
       <div className={style.Center_Nav}>
      <h1 className={style.title}>
        <span className={style.letterPurple}>ا</span>
        <span className={style.letterGreen}>ه</span>
        <span className={style.letterOrange}>ل</span>
        <span className={style.letterOrange}>ا</span>
        <span className={style.letterYellow}> </span>
        <span className={style.letterGreen}>ب</span>
        <span className={style.letterLightBlue}>ك</span>
      </h1>
      <p className={style.subtitle}>
        تعلم، العب، واستمتع بدينك ❤️
      </p>
      </div>
      <div className={style.Right_Nav}>
        <div className={style.Points}>
          <div className={style.PointsCount}>
            <p>{points}</p>
            <StarIcon/>
          </div>
        <img className={style.ProfileImg} src={profile_img} alt="star" />
        </div>
      </div>
      </nav>
      {!isLevelPage ? (
      <div className={style.content}>
        <div className={style.Top_content}>
          <div className={style.Games_card}>
            <div className={style.content_card}>
                <SportsEsportsIcon sx={{backgroundColor: "#8f0ff1"}} className={style.icon}/>
              <h2>العب وإستمتع</h2>
              <p>ألعاب تعليمية مسلية اقرأ القرأن، تعلم اختبر معلوماتك، وتحدى قصص الأنبياء، الأدعيةأصدقاتك</p>
            <button
           onClick={() => {
            setKidsLink("game");
            navigate("/Kids/KidsLevel");
          }}
            >
              إبدأ اللعب
            <NavigateBeforeIcon/>
            </button>
            </div>
          </div>  
          <div className={style.Quran_card}>
            <div className={style.content_card}>
                <AutoStoriesIcon sx={{backgroundColor: "#1270ea"}}  className={style.icon}/>
              <h2>إقرء وتعلم</h2>
              <p>اقرأ القرأن، تعلم اختبر معلوماتك، وتحدى قصص الأنبياء، الأدعية أصدقاتك والمزيد</p>
              <button
                onClick={() => {
                  setKidsLink("book");
                  navigate("/Kids/KidsLevel");
                }}
              >
               إبدأ التعلم
              <NavigateBeforeIcon/>
            </button>
            </div>
          </div>  
        </div>
        <div className={style.bottom_content}>
          {Cards.map((item) => 
          <div key={item.id} className={`${style.card} ${style[item.iconBackground]}`}>  
           <img src={item.icon} alt="icon" />
           <p>{item.name}</p>
          </div>
          )}
        </div>
      </div>
      ):(
        <KidsLevel/>
      )}

    </div>
  )
}
