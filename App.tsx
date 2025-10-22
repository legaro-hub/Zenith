import React, { useState } from 'react';
import { MeditationView } from './components/MeditationView';
import { StatsView } from './components/StatsView';
import { useMeditationData } from './hooks/useMeditationData';
import { Footer } from './components/Footer';
import { useTranslation } from './hooks/useTranslation';
import { AchievementsView } from './components/AchievementsView';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslation();

    const buttonStyle = "px-3 py-1 text-sm font-medium rounded-md transition-colors";
    const activeStyle = "bg-indigo-500 text-white";
    const inactiveStyle = "bg-slate-700 text-slate-300 hover:bg-slate-600";

    return (
        <div className="absolute top-4 right-4 bg-slate-800 p-1 rounded-lg flex space-x-1 z-10">
            <button
                onClick={() => setLanguage('en')}
                className={`${buttonStyle} ${language === 'en' ? activeStyle : inactiveStyle}`}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('ru')}
                className={`${buttonStyle} ${language === 'ru' ? activeStyle : inactiveStyle}`}
                 aria-pressed={language === 'ru'}
            >
                RU
            </button>
        </div>
    );
};

type View = 'meditation' | 'achievements';

const Navigation: React.FC<{ activeView: View; onViewChange: (view: View) => void }> = ({ activeView, onViewChange }) => {
    const { t } = useTranslation();
    const baseStyle = "w-full py-3 text-center font-semibold rounded-t-lg transition-colors duration-300";
    const activeStyle = "bg-slate-800/50 text-indigo-300";
    const inactiveStyle = "bg-slate-900/20 text-slate-400 hover:bg-slate-900/40";

    return (
        <nav className="grid grid-cols-2 gap-1 px-2 pt-2">
            <button onClick={() => onViewChange('meditation')} className={`${baseStyle} ${activeView === 'meditation' ? activeStyle : inactiveStyle}`}>
                {t('tabs.meditation')}
            </button>
            <button onClick={() => onViewChange('achievements')} className={`${baseStyle} ${activeView === 'achievements' ? activeStyle : inactiveStyle}`}>
                {t('tabs.achievements')}
            </button>
        </nav>
    );
};


function App() {
  const { stats, achievements, unlockedAchievements, completeSession } = useMeditationData();
  const [isMeditating, setIsMeditating] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(10 * 60); // Default 10 minutes
  const [activeView, setActiveView] = useState<View>('meditation');
  const { t } = useTranslation();

  const handleSessionComplete = () => {
    completeSession(sessionDuration);
    setIsMeditating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto relative">
        <LanguageSwitcher />
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-indigo-300">{t('appName')}</h1>
          <p className="text-indigo-400">{t('appDescription')}</p>
        </header>

        <div className="shadow-2xl">
          <Navigation activeView={activeView} onViewChange={setActiveView} />
          <main className="bg-slate-800/50 backdrop-blur-sm rounded-b-3xl p-6 md:p-8">
            {activeView === 'meditation' && (
              <>
                <MeditationView 
                  isMeditating={isMeditating}
                  setIsMeditating={setIsMeditating}
                  sessionDuration={sessionDuration}
                  setSessionDuration={setSessionDuration}
                  onSessionComplete={handleSessionComplete}
                />
                <StatsView 
                  stats={stats} 
                />
              </>
            )}
            {activeView === 'achievements' && (
              <AchievementsView
                unlockedAchievements={unlockedAchievements}
                achievements={achievements}
              />
            )}
          </main>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;