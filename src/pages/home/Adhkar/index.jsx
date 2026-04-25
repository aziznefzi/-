import React, { useState } from 'react'
import style from "../Adhkar/style.module.css"
import adkar_img from "../../../image/Adhkar.jpg"
import adhkarData from "../../../data/adhkar.json"
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import SearchIcon from '@mui/icons-material/Search';

export default function Adhkar() {
  const [category, setCategory] = useState("morning");
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { palette } = useTheme();

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentAdhkar = adhkarData[category];
  
  const filteredAdhkar = currentAdhkar.filter(item => 
    item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={style.container}>
      <img className={style.adkar_img} src={adkar_img} alt="Adhkar" />
      
      <div className={style.search_container}>
        <div className={style.search_wrapper}>
          <SearchIcon sx={{ color: palette.text.secondary }} />
          <input 
            type="text" 
            placeholder="ابحث في الأذكار..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={style.search_input}
          />
        </div>
      </div>

      <div className={style.Adhkar_bar}>

        <ul>
          <li 
            onClick={() => setCategory("morning")}
            className={`${style.category_item} ${category === "morning" ? style.active : ""}`}
            style={{ color: palette.text.primary }}
          >
            <WbSunnyIcon />
            أذكار الصباح
          </li>
          <li 
            onClick={() => setCategory("evening")}
            className={`${style.category_item} ${category === "evening" ? style.active : ""}`}
            style={{ color: palette.text.primary }}
          >
            <DarkModeIcon />
            أذكار المساء
          </li>
          <li 
            onClick={() => setCategory("sleeping")}
            className={`${style.category_item} ${category === "sleeping" ? style.active : ""}`}
            style={{ color: palette.text.primary }}
          >
            <BedtimeIcon />
            أذكار النوم
          </li>
        </ul>
      </div>


      <div className={style.Adhkar_kards}>
        {filteredAdhkar.length > 0 ? (
          filteredAdhkar.map((item) => (
            <div key={item.id} className={style.hadith_card}>
              <div className={style.card_header}>
                <button 
                  className={style.copy_btn} 
                  onClick={() => handleCopy(item.text, item.id)}
                  title="نسخ النص"
                >
                  {copiedId === item.id ? <CheckIcon sx={{ color: '#059669' }} /> : <ContentCopyIcon />}
                </button>
              </div>
              <p>{item.text}</p>
              <div className={style.card_footer}>
                <span className={style.count}>التكرار: {item.count}</span>
                <span className={style.description} style={{ color: palette.text.text1 }}>{item.description}</span>
              </div>
            </div>
          ))
        ) : (
          <div className={style.no_results}>
             <p>لا توجد نتائج تطابق بحثك...</p>
          </div>
        )}
      </div>
    </div>
  )
}


