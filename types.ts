// FIX: Import React to provide the 'React' namespace for types like React.FC.
import React from 'react';

export interface Stats {
  streak: number;
  totalTime: number; // in seconds
  lastMeditationDate: string | null; // ISO date string
}

export interface Achievement {
  id: string;
  icon: React.FC<{className?: string}>;
  condition: (stats: Stats) => boolean;
}
