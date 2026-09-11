
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ title: string, icon: string }> = ({ title, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
        <span className="text-4xl mb-4">{icon}</span>
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const { translations, language } = useLanguage();
  const fontClass = language === 'ar' ? 'font-cairo' : 'font-poppins';

  return (
    <div className={`text-center ${fontClass}`}>
      <div className="py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">{translations.appName}</h1>
        <p className="text-lg md:text-2xl text-slate-600 mb-8">{translations.tagline}</p>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          {translations.startNow}
        </button>
      </div>

      <div className="py-16 bg-slate-100 rounded-xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-10">{translations.features}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            <FeatureCard title={translations.feature1} icon="⚡️" />
            <FeatureCard title={translations.feature2} icon="🤖" />
            <FeatureCard title={translations.feature3} icon="🎨" />
            <FeatureCard title={translations.feature4} icon="📄" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
   