
import { create } from 'zustand';

const useLanguageStore = create((set) => ({
    language: localStorage.getItem('language') || 'en', // เริ่มต้นจากค่าที่เก็บใน localStorage
    setLanguage: (lang) => {
        localStorage.setItem('language', lang); // เก็บค่าภาษาใน localStorage
        set({ language: lang });
    },
}));

export default useLanguageStore;
