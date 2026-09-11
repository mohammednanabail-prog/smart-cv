
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const { translations, language } = useLanguage();
  const fontClass = language === 'ar' ? 'font-cairo' : 'font-poppins';

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 
          onClick={onLogoClick}
          className={`text-2xl font-bold text-blue-600 cursor-pointer ${fontClass}`}
        >
          {translations.appName} ✨
        </h1>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
   