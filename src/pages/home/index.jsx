import React, { useEffect, useState } from 'react'
import style from "../home/style.module.css"

import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ExploreIcon from '@mui/icons-material/Explore';

// غيّر هذا السطر في الـ import
import { getPrayerTimes as fetchPrayerTimesFromAPI, getLocationSearch } from '../../services/api';
import { getCity } from '../../services/api';

import imgFajr from '../../image/timer-img/Fajer.png';
import imgSunrise from '../../image/timer-img/Shourouk.png';
import imgDhuhr from '../../image/timer-img/dhoher.png';
import imgAsr from '../../image/timer-img/Aser.png';
import imgMaghrib from '../../image/timer-img/Maghreb.png';
import imgIsha from '../../image/timer-img/Idhee.png';
import { useTheme } from '@mui/material/styles';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const prayerImages = {
  Fajr: imgFajr,
  Sunrise: imgSunrise,
  Dhuhr: imgDhuhr,
  Asr: imgAsr,
  Maghrib: imgMaghrib,
  Isha: imgIsha
};

const prayerNamesAr = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء"
};
export default function Home() {
  
  // Prayer times fetched from the API
  const [prayerTimes, setPrayerTimes] = useState(null)
  // Location details derived from reverse‑geocoding
  const [cityName, setCityName] = useState("")
  const [stateName, setStateName] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [gregorianDate, setGregorianDate] = useState("")
  const [TomoroPrayeyDate, setTomoroPrayeyDate] = useState()
  const [hijriDate, setHijriDate] = useState("")
  const [allert, setAllert] = useState({
    allertValue: "",
    alertOpen: false,
  })
  const [cityValue, setCityInput] = useState("")
  const [coords, setCoords] = useState({
    lat: null,
    lon: null,
  })
  const [Datevalue, setValue] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    const parsedDate = savedDate ? dayjs(savedDate, "DD-MM-YYYY") : dayjs();
    return parsedDate.isValid() ? parsedDate : dayjs();
  });
  const theme = useTheme()
  
const handleSearch = async () => {
  if (!cityValue) {
    setAllert({
      allertValue: "اكتب اسم مدينة",
      alertOpen: true,
    });

    setTimeout(() => {
      setAllert({
     ...allert,
     alertOpen: false,
    });
    }, 3000)
    return;
  }

  const geoData = await getLocationSearch(cityValue);

  if (!geoData || geoData.length === 0) {
    setAllert({
      allertValue: "المدينة غير موجودة",
      alertOpen: true,
    });

    setTimeout(() => {
      setAllert({
     ...allert,
     alertOpen: false,
    });
    }, 3000)
    return;
  }

  const result = geoData[0];

  if (!result.display_name) {
    setAllert({
     allertValue: "خطأ في البيانات",
     alertOpen: true,
    });

    setTimeout(() => {
      setAllert({
     ...allert,
     alertOpen: false,
    });
    }, 3000)

    return;
  }

  if (!result.display_name.toLowerCase().includes(cityValue.toLowerCase())) {
    setAllert({
     allertValue: "الرجاء إدخال اسم مدينة صحيح",
     alertOpen: true,
    });

    setTimeout(() => {
      setAllert({
     ...allert,
     alertOpen: false,
    });
    console.log("ee")
    }, 3000)

    return;
  }

  setCoords({
    lat: result.lat,
    lon: result.lon,
  });
};


const getPrayerTimes = async (lat, lon) => {
  const safeDate = (Datevalue && Datevalue.isValid()) ? Datevalue : dayjs();
  const date = safeDate.format('DD-MM-YYYY');
  const data = await fetchPrayerTimesFromAPI(date, lat, lon);

  if (data) {
    setPrayerTimes(data.data.timings);
    
    setGregorianDate(data.data.date.gregorian.date);

    const hijri = data.data.date.hijri;
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const convertNum = (num) => String(num).replace(/[0-9]/g, (w) => arabicNumerals[w]);
    setHijriDate(`${convertNum(hijri.day)} ${hijri.month.ar} ${convertNum(hijri.year)}`);
  }

  const location = await getCity(lat, lon);
  if (location) {
    setStateName(location.results[0].components.state_district);
    setCityName(location.results[0].components.county);
    setCountryCode(location.results[0].components.country_code.toUpperCase());
  }
};

const detectLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setCoords({ lat, lon });
    getPrayerTimes(lat, lon);
  });
};

useEffect(() => {
detectLocation()
}, [])

useEffect(() => {
  if (!coords.lat || !coords.lon) return;

  getPrayerTimes(coords.lat, coords.lon);
}, [Datevalue, coords.lat, coords.lon]);

useEffect(() => {
  const safeDate = (Datevalue && Datevalue.isValid()) ? Datevalue : dayjs();
  const tomorrow = safeDate.add(1, 'day').toDate();
  
  try {
    const formattedTomorrow = new Intl.DateTimeFormat('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(tomorrow);
    setTomoroPrayeyDate(formattedTomorrow);
  } catch (error) {
    console.error("Invalid date for tomorrow:", error);
    setTomoroPrayeyDate("");
  }
}, [Datevalue]);

   const BgItems = {
    bgItem: theme.palette.background.navBg,
    colorItem: theme.palette.text.titleColor
   }
  return (
    <>
    {allert.alertOpen && (
       <Alert className={style.Allert} severity="warning">{allert.allertValue}</Alert>
    )} 

    <div className={style.container}>
      <div className={style.location_contaner}
        style={{
          background: BgItems.bgItem,
        }}
      >
        <div className={style.sity}>
          <SearchIcon sx={{
            color: theme.palette.text.primary
          }}/>
          <input
          value={cityValue}
          onChange={(e) => setCityInput(e.target.value)}
             onKeyDown={(e) => {
               if (e.key === "Enter") {
                 e.preventDefault(); // مهم
                 handleSearch();
                 setCityInput("")
               }
             }}
          style={{color: theme.palette.text.primary}}
          type="text" placeholder='اسم المدينة'/>
        </div>
        <button className={style.location_btn} onClick={detectLocation}> <i className="fa-solid fa-paper-plane"></i> استخدم الموقع الحالي</button>
      </div>

      <div className={style.Information_Prayer}>
        <div 
        style={{
          background: BgItems.bgItem,
        }}
        className={style.Information_Sity}>
            <PlaceIcon/>
            <p>{`${stateName}, ${cityName}, ${countryCode}`}</p>
        </div>

        <div className={style.Information_Time}>
          <h3>مواقيت الصلاة اليوم</h3>
          <p><span className={style.hijriDate}>{hijriDate}</span> | <span className={style.gregorianDate}>{gregorianDate}</span></p>
        </div>

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="اختر التاريخ"
    value={Datevalue}
    onChange={(newValue) => {
      setValue(newValue)
      if(newValue) {
        localStorage.setItem("selectedDate", newValue.format("DD-MM-YYYY"));
      }
    }}
    slotProps={{
      textField: {
        variant: "outlined",
        size: "small",
        fullWidth: false,
        sx: {
          width: "150px",
          backgroundColor:"black !important",
          borderRadius: "5px !important",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "black",
            color: "white",
            transition: "0.3s",

            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.3)",
                        
            },

            "&:hover fieldset": {
              borderColor: "white",
            },

            "&.Mui-focused fieldset": {
              borderColor: "white",
              borderWidth: "1px",
            },
          },

          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.9rem",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },

          "& .MuiSvgIcon-root": {
            color: "white",
          },
        },
      },
    }}
  />

</LocalizationProvider>
        
  </div>
    <div 
      style={{
        background: BgItems.bgItem,
      }}
    className={style.content}>
     <div
      className={style.prayers_time}>
        {prayerTimes && Object.entries(prayerTimes).map(([prayer, time]) => (
          prayerImages[prayer] ? (
            <div 
              key={prayer} 
              className={style.prayer_time} 
              style={{
                backgroundImage: `url(${prayerImages[prayer]})`,
                border: theme.palette.mode === "dark" ? "1px solid #fff" : "none",
              }}
            >
              <h4>{prayerNamesAr[prayer]}</h4>
              <p>{time}</p>
            </div>
          ) : null
        ))}
      </div>
     <div className={style.content_buttom}>
       <Link to={"/adhkar"} style={{color: theme.palette.text.primary}} className={style.Adhkar}>
            <StickyNote2Icon sx={{color: BgItems.colorItem}}/>
            <p>أذكار الصباح والمساء</p>
          </Link>
          <div className={style.prayer_time_tomorow}>
            <EventNoteIcon sx={{color: BgItems.colorItem}}/>
            <div className={style.date}>
            <p>غدا</p>
            <p>{TomoroPrayeyDate}</p>
            </div>
          </div>
          <div className={style.compass}>
            <ExploreIcon sx={{color: BgItems.colorItem}}/>
            <p>القبلة 90°</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}