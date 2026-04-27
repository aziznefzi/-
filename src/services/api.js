// get Prayer Times
import { roRO } from '@mui/x-date-pickers/locales';
import axios from 'axios';
import { useEffect } from 'react';


export const getPrayerTimes = async (date, lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lon}&method=2`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getCity = async (lat, lon) => {
    try{
        const data = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=edab00012cef4b529b98b0634cb020cc&language=ar`);
        return data.data;
    }catch(error){
        console.log(error);
        return null;
    }
}

export const getLocationSearch = async (city) => {
  try {
    const data = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getHadith = async () => {
  try {
    const data = await axios.get("/api-hadith/hadiths/?apiKey=$2y$10$fhC5WaHPNx6cvwHeaCb2u3J5HaqSLCjHNS766zToJZgiMoAV9gXC");
    return data.data;
  }catch(error){
    console.log(error);
    return null;
  }
}

// hadith books
export const getHadithBooks = async (bookName, page = 1, paginate = 50) => {
  try {
    const data = await axios.get(`/api-hadith/hadiths/?apiKey=$2y$10$fhC5WaHPNx6cvwHeaCb2u3J5HaqSLCjHNS766zToJZgiMoAV9gXC&book=${bookName}&paginate=${paginate}&page=${page}`);
    return data.data;
  }catch(error){
    console.log(error);
    return null;
  }
}

