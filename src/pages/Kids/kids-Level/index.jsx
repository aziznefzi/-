import React from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function KidsLevel() {
  const navigate = useNavigate();

  const card = [
    {id:1, title: "براعم", icon: "🌱", levelClass: styles.level1},
    {id:2, title: "مستكشف", icon: "🔍", levelClass: styles.level2},
    {id:3, title: "متعلم", icon: "📚", levelClass: styles.level3},
    {id:4, title: "خبير", icon: "⭐", levelClass: styles.level4},
    {id:5, title: "متقن", icon: "🏆", levelClass: styles.level5},
  ]

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/Kids')} className={styles.backBtn}>
        <ArrowForwardIcon />
        العودة للرئيسية
      </button>

      <div className={styles.cards}>
       {card.map((item) => (
        <div className={`${styles.card} ${item.levelClass}`} key={item.id}>
          <span className={styles.cardIcon}>{item.icon}</span>
          <p className={styles.cardTitle}>{item.title}</p>
        </div>
       ))}
      </div>
    </div>
  )
}
