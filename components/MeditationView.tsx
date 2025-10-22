import React, { useState, useEffect } from 'react';
import { TimerCircle } from './TimerCircle';
import { PlayIcon, PauseIcon, StopIcon } from './icons/ControlIcons';
import { useTranslation } from '../hooks/useTranslation';

interface MeditationViewProps {
  isMeditating: boolean;
  setIsMeditating: (isMeditating: boolean) => void;
  sessionDuration: number;
  setSessionDuration: (duration: number) => void;
  onSessionComplete: () => void;
}

export const MeditationView: React.FC<MeditationViewProps> = ({
  isMeditating,
  setIsMeditating,
  sessionDuration,
  setSessionDuration,
  onSessionComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(sessionDuration);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isMeditating) {
      setTimeLeft(sessionDuration);
    }
  }, [sessionDuration, isMeditating]);

  useEffect(() => {
    if (!isMeditating) return;

    if (timeLeft <= 0) {
      onSessionComplete();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isMeditating, timeLeft, onSessionComplete]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isMeditating) {
      setSessionDuration(Number(e.target.value) * 60);
    }
  };

  const handleStop = () => {
    setIsMeditating(false);
    setTimeLeft(sessionDuration);
  };

  const progress = (sessionDuration - timeLeft) / sessionDuration;

  return (
    <div className="flex flex-col items-center space-y-8">
      <TimerCircle progress={progress} timeLeft={timeLeft} />
      
      <div className="w-full px-4">
        <label htmlFor="duration" className="block text-center text-indigo-300 mb-2">
          {t('meditationDuration', { minutes: sessionDuration / 60 })}
        </label>
        <input
          id="duration"
          type="range"
          min="1"
          max="60"
          step="1"
          value={sessionDuration / 60}
          onChange={handleDurationChange}
          disabled={isMeditating}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-400 disabled:opacity-50"
        />
      </div>

      <div className="flex items-center space-x-6 pt-8">
        {isMeditating && (
           <button
            onClick={handleStop}
            className="p-4 rounded-full bg-slate-700 text-indigo-300 hover:bg-slate-600 transition-all duration-300"
            aria-label={t('stopSession')}
          >
            <StopIcon className="w-8 h-8" />
          </button>
        )}
        <button
          onClick={() => setIsMeditating(!isMeditating)}
          className="p-6 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 transform hover:scale-105 transition-all duration-300"
          aria-label={isMeditating ? t('pauseSession') : t('startSession')}
        >
          {isMeditating ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" />}
        </button>
        {/* Placeholder for alignment */}
        {isMeditating && <div className="w-[64px] h-[64px]" />} 
      </div>
    </div>
  );
};