
import { useState, useEffect, useCallback } from 'react';
import type { Stats } from '../types';
import { ACHIEVEMENTS, DEFAULT_STATS } from '../constants';

const STATS_KEY = 'meditation_stats';
const ACHIEVEMENTS_KEY = 'meditation_achievements';

export const useMeditationData = () => {
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedStats = localStorage.getItem(STATS_KEY);
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
      const storedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);
      if (storedAchievements) {
        setUnlockedAchievements(JSON.parse(storedAchievements));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  const saveStats = useCallback((newStats: Stats) => {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
      setStats(newStats);
    } catch (error) {
      console.error("Failed to save stats to localStorage", error);
    }
  }, []);

  const saveAchievements = useCallback((newlyUnlocked: string[]) => {
    try {
      const updatedAchievements = [...new Set([...unlockedAchievements, ...newlyUnlocked])];
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updatedAchievements));
      setUnlockedAchievements(updatedAchievements);
    } catch (error) {
      console.error("Failed to save achievements to localStorage", error);
    }
  }, [unlockedAchievements]);

  const completeSession = useCallback((durationInSeconds: number) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const newTotalTime = stats.totalTime + durationInSeconds;
    let newStreak = stats.streak;

    if (stats.lastMeditationDate) {
      const lastDate = new Date(stats.lastMeditationDate);
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (stats.lastMeditationDate === yesterdayStr) {
        newStreak += 1; // It's a consecutive day
      } else if (stats.lastMeditationDate !== todayStr) {
        newStreak = 1; // Streak was broken
      }
    } else {
      newStreak = 1; // First session ever
    }

    const newStats: Stats = {
      totalTime: newTotalTime,
      streak: newStreak,
      lastMeditationDate: todayStr,
    };

    saveStats(newStats);

    const newlyUnlocked = ACHIEVEMENTS.filter(ach => 
      !unlockedAchievements.includes(ach.id) && ach.condition(newStats)
    ).map(ach => ach.id);
    
    if (newlyUnlocked.length > 0) {
      saveAchievements(newlyUnlocked);
    }
  }, [stats, unlockedAchievements, saveStats, saveAchievements]);

  return { stats, achievements: ACHIEVEMENTS, unlockedAchievements, completeSession };
};
