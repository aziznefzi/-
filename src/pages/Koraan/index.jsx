import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { getSurahs, getReciters } from '../../services/api';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Koraan() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const [surahs, setSurahs] = useState([]);
    const [reciters, setReciters] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Viewer state
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedReciter, setSelectedReciter] = useState(null);

    useEffect(() => {
        // Fetch surahs from quran.com api
        getSurahs().then(data => {
            if (data && data.chapters) {
                setSurahs(data.chapters);
            }
        });

        // Fetch reciters from mp3quran api
        getReciters().then(data => {
            if (data && data.reciters) {
                setReciters(data.reciters);
                setSelectedReciter(data.reciters[0]);
            }
        });
    }, []);

    const filteredSurahs = surahs.filter(s => 
        s.name_arabic.includes(searchQuery) || 
        s.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSurahClick = (surah) => {
        setSelectedSurah(surah);
        // surah.pages[0] is the starting page of the surah
        if (surah.pages && surah.pages.length > 0) {
            setPage(surah.pages[0]);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setSelectedSurah(null);
    };

    const handleNextPage = () => {
        if (page < 604) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const getPageImageUrl = (pageNumber) => {
        const paddedPage = String(pageNumber).padStart(3, '0');
        return `https://android.quran.com/data/width_1024/page${paddedPage}.png`;
    };

    const getAudioUrl = () => {
        if (!selectedReciter || !selectedReciter.moshaf || selectedReciter.moshaf.length === 0 || !selectedSurah) return "";
        const server = selectedReciter.moshaf[0].server;
        const paddedSurah = String(selectedSurah.id).padStart(3, '0');
        return `${server}${paddedSurah}.mp3`;
    };

    return (
        <div className={style.container}>
            {!selectedSurah ? (
                <>
                    <h1 className={style.title} style={{ color: theme.palette.text.titleColor }}>القرآن الكريم</h1>
                    
                    <div className={style.searchContainer}>
                        <input 
                            type="text" 
                            placeholder="ابحث عن سورة (مثال: الكهف)..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={style.searchInput}
                            style={{ 
                                backgroundColor: theme.palette.background.paper, 
                                color: theme.palette.text.primary,
                                borderColor: isDark ? '#333' : '#ddd'
                            }}
                        />
                    </div>

                    <div className={style.cardsGrid}>
                        {filteredSurahs.map((surah) => (
                            <div 
                                key={surah.id} 
                                className={style.surahCard}
                                onClick={() => handleSurahClick(surah)}
                                style={{ 
                                    backgroundColor: theme.palette.background.paper,
                                    borderColor: isDark ? '#333' : '#eaeaea',
                                    color: theme.palette.text.primary
                                }}
                            >
                                <div className={style.surahNumber}>
                                    <div 
                                        className={style.numberBadge} 
                                        style={{ 
                                            backgroundColor: theme.palette.background.default, 
                                            color: theme.palette.text.primary,
                                            borderColor: theme.palette.text.titleColor
                                        }}
                                    >
                                        {surah.id}
                                    </div>
                                </div>
                                <div className={style.surahInfo}>
                                    <h2 className={style.surahName}>{surah.name_arabic}</h2>
                                    <div className={style.surahMeta} style={{ color: theme.palette.text.secondary }}>
                                        <span>{surah.revelation_place === 'makkah' ? 'مكية' : 'مدنية'}</span>
                                        <span className={style.dot}>•</span>
                                        <span>آياتها {surah.verses_count}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={style.viewerContainer}>
                    <div className={style.viewerHeader} style={{ backgroundColor: theme.palette.background.paper, borderColor: isDark ? '#333' : '#eaeaea' }}>
                        <div className={style.viewerTopRow}>
                            <button 
                                onClick={handleBack} 
                                className={style.backBtn} 
                                style={{ 
                                    backgroundColor: theme.palette.background.default, 
                                    color: theme.palette.text.primary 
                                }}
                            >
                                العودة للسور
                            </button>
                            <h2 className={style.viewerTitle} style={{ color: theme.palette.text.primary }}>
                                سورة {selectedSurah.name_arabic}
                            </h2>
                        </div>
                        
                        <div className={style.audioSection}>
                            <div className={style.formGroup}>
                                <label style={{ color: theme.palette.text.primary, marginBottom: '10px' }}>اختر القارئ للاستماع:</label>
                                <Autocomplete
                                    options={reciters}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedReciter}
                                    onChange={(event, newValue) => {
                                        setSelectedReciter(newValue);
                                    }}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField 
                                            {...params} 
                                            variant="outlined" 
                                            placeholder="ابحث عن قارئ..." 
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px',
                                                    backgroundColor: theme.palette.background.default,
                                                    color: theme.palette.text.primary,
                                                    '& fieldset': {
                                                        borderColor: isDark ? '#444' : '#ccc',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: theme.palette.text.titleColor,
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: theme.palette.text.titleColor,
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    fontFamily: 'inherit',
                                                }
                                            }}
                                        />
                                    )}
                                    ListboxProps={{
                                        sx: {
                                            backgroundColor: theme.palette.background.paper,
                                            color: theme.palette.text.primary,
                                            fontFamily: 'inherit',
                                            '&::-webkit-scrollbar': {
                                                width: '8px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                backgroundColor: theme.palette.background.default,
                                                borderRadius: '10px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: isDark ? '#555' : '#bbb',
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.text.titleColor,
                                                }
                                            },
                                        }
                                    }}
                                />
                            </div>
                            
                            {selectedReciter && (
                                <div className={style.playerWrapper}>
                                    <audio 
                                        src={getAudioUrl()} 
                                        controls 
                                        className={style.audioPlayer}
                                        key={getAudioUrl()}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={style.pageViewer} style={{ backgroundColor: theme.palette.background.paper }}>
                        <div className={style.controls}>
                            <button 
                                onClick={handleNextPage} 
                                disabled={page === 604}
                                className={style.navBtn}
                            >
                                الصفحة التالية
                            </button>
                            <span 
                                className={style.pageIndicator} 
                                style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
                            >
                                صفحة {page} / 604
                            </span>
                            <button 
                                onClick={handlePrevPage} 
                                disabled={page === 1}
                                className={style.navBtn}
                            >
                                الصفحة السابقة
                            </button>
                        </div>
                        
                        <div className={style.imageContainer} style={{ backgroundColor: '#fff', padding: isDark ? '5px' : '10px' }}>
                            <img 
                                src={getPageImageUrl(page)} 
                                alt={`Quran Page ${page}`} 
                                className={style.quranPage}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}