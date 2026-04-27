import React, { useState } from 'react'
import style from "./style.module.css"
import { useTheme } from '@mui/material/styles'
import { getHadithBooks } from '../../services/api';

export default function Hadith() {
  const [HadithData, setHadith] = useState([])
  const [HadithOpen, SetHadithOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBookName, setCurrentBookName] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const HadithBooks = [
    {
      id: 1, 
      Auther: "الإمام محمد بن إسماعيل البخاري", 
      name: "sahih-bukhari", 
      book: "صحيح البخاري", 
      count: 7563, 
      type: "صحيح", 
      desc: "أصح الكتب بعد كتاب الله عز وجل، جمعه الإمام البخاري في ست عشرة سنة."
    },
    {
      id: 2, 
      Auther: "الإمام مسلم بن الحجاج النيسابوري", 
      name: "sahih-muslim", 
      book: "صحيح مسلم", 
      count: 7500, 
      type: "صحيح", 
      desc: "يعتبر ثاني أصح كتاب حديث بعد صحيح البخاري، اعتنى فيه بجمع الأحاديث الصحيحة."
    },
    {
      id: 3, 
      Auther: "الإمام محمد بن عيسى الترمذي", 
      name: "al-tirmidhi", 
      book: "سنن الترمذي", 
      count: 3956, 
      type: "سنن", 
      desc: "اشتهر بذكر فقه الأحاديث وبيان درجاتها من الصحة والحسن والضعف."
    },
    {
      id: 4, 
      Auther: "الإمام أبي داود السجستاني", 
      name: "abu-dawood", 
      book: "سنن أبي داود", 
      count: 5274, 
      type: "سنن", 
      desc: "اعتنى فيه بجمع أحاديث الأحكام التي يستدل بها الفقهاء."
    },
    {
      id: 5, 
      Auther: "الإمام أحمد بن شعيب النسائي", 
      name: "sunan-nasai", 
      book: "سنن النسائي", 
      count: 5758, 
      type: "سنن", 
      desc: "يعرف بـ 'المجتبى' وهو من أقل كتب السنن أحاديث ضعيفة."
    },
    {
      id: 6, 
      Auther: "الإمام ابن ماجة القزويني", 
      name: "ibn-e-majah", 
      book: "سنن ابن ماجه", 
      count: 4341, 
      type: "سنن", 
      desc: "أحد الكتب الستة المعتمدة، تميز بتبويباته الفقهية الدقيقة."
    },
    {
      id: 7, 
      Auther: "الإمام مالك بن أنس", 
      name: "muwatta-malik", 
      book: "موطأ مالك", 
      count: 1720, 
      type: "موطأ", 
      desc: "من أقدم دواوين الحديث المرتبة على الأبواب الفقهية."
    },
    {
      id: 8, 
      Auther: "الخطيب التبريزي", 
      name: "mishkat", 
      book: "مشكاة المصابيح", 
      count: 5945, 
      type: "تجميع", 
      desc: "كتاب جامع لأحاديث المصابيح مع إضافة التخريج والزيادات."
    },
    {
      id: 9, 
      Auther: "الشيخ محمد ناصر الدين الألباني", 
      name: "al-silsila-sahiha", 
      book: "السلسلة الصحيحة", 
      count: 4035, 
      type: "معاصر", 
      desc: "موسوعة حديثية تعنى بجمع الأحاديث التي صححها الشيخ الألباني."
    },
  ]

  const handleHadithBooks = async (bookName, bookTitle, count, page = 1) => {
    setLoading(true);
    setSelectedBook(bookTitle);
    setCurrentBookName(bookName);
    setTotalCount(count);
    setCurrentPage(page);
    try {
      const response = await getHadithBooks(bookName, page, 50); 
      if (response && response.hadiths && response.hadiths.data) {
        setHadith(response.hadiths.data);
        SetHadithOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.log(error, "failed to retrieve the data");
    } finally {
      setLoading(false);
    }
  }

  const handleBack = () => {
    SetHadithOpen(false);
    setHadith([]);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(totalCount / 50);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 10;
    let start = Math.max(1, currentPage - 4);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
  };

  const theme = useTheme()
  return (
    <div className={style.container}>
       {!HadithOpen ? (
        <>
          <h1 className={style.title}>كتب الحديث النبوي</h1>
          <div className={style.Badith_Books}>
            {HadithBooks.map((book)=>(
                <div className={style.book_card} key={book.id}>
                    <div className={style.book_header}>
                        <span className={style.book_type}>{book.type}</span>
                        <h2 className={style.book_title}>{book.book}</h2>
                    </div>
                    <div className={style.book_body}>
                        <p className={style.author_name}><span className={style.label}>المؤلف:</span> {book.Auther}</p>
                        <p className={style.hadith_count}><span className={style.label}>عدد الأحاديث:</span> {book.count}</p>
                        <p className={style.book_desc}>{book.desc}</p>
                    </div>
                    <div className={style.book_footer}>
                        <button 
                          onClick={() => handleHadithBooks(book.name, book.book, book.count, 1)} 
                          className={style.view_btn}
                          disabled={loading}
                        >
                          {loading && selectedBook === book.book ? "جاري التحميل..." : "تصفح الكتاب"}
                        </button>
                    </div>
                </div>
            ))}
          </div>
        </>
       ) : (
         <div className={style.hadith_list_container}>
            <div className={style.list_header}>
                <button onClick={handleBack} className={style.back_btn}>العودة للكتب</button>
                <h2 className={style.selected_book_title}>{selectedBook}</h2>
            </div>
            {loading ? (
                <div className={style.loading_spinner}>جاري تحميل الأحاديث...</div>
            ) : (
                <>
                    <div className={style.hadith_items}>
                        {HadithData.map((item) => (
                            <div key={item.id} className={style.hadith_item_card}>
                                <div className={style.hadith_item_header}>
                                    <span className={style.hadith_number}>حديث رقم: {item.hadithNumber}</span>
                                    <span className={style.hadith_status}>{item.status}</span>
                                </div>
                                <p className={style.hadith_arabic}>{item.hadithArabic}</p>
                                <div className={style.hadith_footer}>
                                    <p className={item.englishNarrator ? style.narrator : style.hidden}><span className={style.label}>الراوي:</span> {item.englishNarrator}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={style.pagination}>
                        <button 
                            className={style.nav_btn} 
                            disabled={currentPage === 1 || loading}
                            onClick={() => handleHadithBooks(currentBookName, selectedBook, totalCount, currentPage - 1)}
                        >
                            السابق
                        </button>
                        
                        {getVisiblePages()[0] > 1 && (
                            <>
                                <button 
                                    className={`${style.page_btn} ${currentPage === 1 ? style.page_btn_active : ""}`}
                                    onClick={() => handleHadithBooks(currentBookName, selectedBook, totalCount, 1)}
                                    disabled={loading}
                                >
                                    1
                                </button>
                                {getVisiblePages()[0] > 2 && <span className={style.page_dots}>...</span>}
                            </>
                        )}

                        {getVisiblePages().map(page => (
                            <button 
                                key={page} 
                                className={`${style.page_btn} ${currentPage === page ? style.page_btn_active : ""}`}
                                onClick={() => handleHadithBooks(currentBookName, selectedBook, totalCount, page)}
                                disabled={loading}
                            >
                                {page}
                            </button>
                        ))}

                        {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
                            <>
                                {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && <span className={style.page_dots}>...</span>}
                                <button 
                                    className={`${style.page_btn} ${currentPage === totalPages ? style.page_btn_active : ""}`}
                                    onClick={() => handleHadithBooks(currentBookName, selectedBook, totalCount, totalPages)}
                                    disabled={loading}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button 
                            className={style.nav_btn} 
                            disabled={currentPage === totalPages || loading}
                            onClick={() => handleHadithBooks(currentBookName, selectedBook, totalCount, currentPage + 1)}
                        >
                            التالي
                        </button>
                    </div>
                </>
            )}
         </div>
       )}
    </div>
  )
}
