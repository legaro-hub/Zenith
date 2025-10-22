import React from 'react';
import type { Stats } from '../types';
import { FireIcon, ClockIcon } from './icons/StatIcons';
import { useTranslation } from '../hooks/useTranslation';

interface StatsViewProps {
  stats: Stats;
}

const formatTotalTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export const StatsView: React.FC<StatsViewProps> = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/50 p-4 rounded-xl flex items-center space-x-3">
          <FireIcon className="w-8 h-8 text-orange-400" />
          <div>
            <p className="text-xl font-bold">{stats.streak}</p>
            <p className="text-xs text-slate-400">{t('dayStreak')}</p>
          </div>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-xl flex items-center space-x-3">
          <ClockIcon className="w-8 h-8 text-teal-400" />
          <div>
            <p className="text-xl font-bold">{formatTotalTime(stats.totalTime)}</p>
            <p className="text-xs text-slate-400">{t('totalTime')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};