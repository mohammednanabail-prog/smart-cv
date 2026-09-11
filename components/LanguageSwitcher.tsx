
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../constants';
import type { Language } from '../types';


export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-slate-100 rounded-full p-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as Language)}
          className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
            language === lang.code
              ? 'bg-blue-600 text-white shadow'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};
   