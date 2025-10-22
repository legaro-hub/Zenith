
import React from 'react';

export const FireIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 19c-3 0-5.5-1-5.5-6 0-2 1-4 3-4 1.5 0 2.5 1 3.5 1.5-1-2-1-4 0-5.5 1.5-2 4-2.5 5.5-1.5 1.5 1 .5 4.5-1.5 6.5-2 2-3 3-3 4.5 0 2-2.5 3.5-5.5 3.5z" />
  </svg>
);

export const ClockIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
