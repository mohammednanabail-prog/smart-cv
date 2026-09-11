
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <footer className="bg-white py-4 mt-8 shadow-inner">
      <div className="container mx-auto px-4 text-center text-slate-500">
        <p>{translations.footerCredit}</p>
      </div>
    </footer>
  );
};

export default Footer;
   