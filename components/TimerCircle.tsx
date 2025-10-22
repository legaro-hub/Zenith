
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface TimerCircleProps {
  progress: number;
  timeLeft: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const TimerCircle: React.FC<TimerCircleProps> = ({ progress, timeLeft }) => {
  const { t } = useTranslation();
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          strokeWidth="10"
          className="stroke-slate-700"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          strokeWidth="10"
          className="stroke-indigo-400"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 0.5s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-mono font-bold text-white tracking-widest">
          {formatTime(timeLeft)}
        </span>
        <span className="text-sm text-indigo-300 uppercase tracking-widest mt-2">{t('timeLeft')}</span>
      </div>
    </div>
  );
};
