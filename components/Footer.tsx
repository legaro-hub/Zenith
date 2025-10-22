
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="text-center mt-8">
      <p className="text-xs text-slate-500">
        {t('footerText')}
      </p>
    </footer>
  );
};
