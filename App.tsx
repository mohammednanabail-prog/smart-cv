
import React, { useState, useCallback } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './components/HomePage';
import CvBuilder from './components/CvBuilder';
import Header from './components/Header';
import Footer from './components/Footer';

export enum View {
  HOME,
  BUILDER,
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const startBuilding = useCallback(() => {
    setCurrentView(View.BUILDER);
  }, []);
  
  const goHome = useCallback(() => {
    setCurrentView(View.HOME);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <Header onLogoClick={goHome} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {currentView === View.HOME && <HomePage onStart={startBuilding} />}
          {currentView === View.BUILDER && <CvBuilder />}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
   