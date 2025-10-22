import type { Achievement, Stats } from './types';
import { StarIcon, FireIcon, ClockIcon, SunIcon, MoonIcon, CalendarIcon } from './components/icons/AchievementIcons';

export const DEFAULT_STATS: Stats = {
  streak: 0,
  totalTime: 0,
  lastMeditationDate: null,
};

// FIX: Changed type from Omit<Achievement, 'name' | 'description'>[] to Achievement[] as the Achievement type doesn't have 'name' or 'description' properties.
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    icon: StarIcon,
    condition: (stats) => stats.totalTime > 0,
  },
  {
    id: 'mindful_hour',
    icon: ClockIcon,
    condition: (stats) => stats.totalTime >= 3600,
  },
  {
    id: 'dedicated_day',
    icon: SunIcon,
    condition: (stats) => stats.totalTime >= 86400,
  },
  {
    id: 'three_day_calm',
    icon: MoonIcon,
    condition: (stats) => stats.streak >= 3,
  },
  {
    id: 'weekly_zen',
    icon: FireIcon,
    condition: (stats) => stats.streak >= 7,
  },
  {
    id: 'monthly_master',
    icon: CalendarIcon,
    condition: (stats) => stats.streak >= 30,
  },
];