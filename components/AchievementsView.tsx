import React from 'react';
import type { Achievement } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface AchievementsViewProps {
  unlockedAchievements: string[];
  achievements: Achievement[];
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ unlockedAchievements, achievements }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-300 mb-6 text-center">{t('achievements')}</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto hide-scrollbar">
          {achievements.map((ach) => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            const name = t(`achievementsData.${ach.id}.name`);
            const description = t(`achievementsData.${ach.id}.description`);
            return (
              <div
                key={ach.id}
                className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                  isUnlocked ? 'bg-indigo-500/20 shadow-md shadow-indigo-500/10' : 'bg-slate-700/50'
                }`}
              >
                <div className={`p-3 rounded-full transition-colors duration-300 ${isUnlocked ? 'bg-indigo-500 text-white' : 'bg-slate-600 text-slate-400'}`}>
                  <ach.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className={`font-semibold text-lg ${isUnlocked ? 'text-white' : 'text-slate-300'}`}>
                    {name}
                  </p>
                  <p className={`text-sm ${isUnlocked ? 'text-indigo-300' : 'text-slate-400'}`}>
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};