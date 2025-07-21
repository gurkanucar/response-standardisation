import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import ReactCountryFlag from 'react-country-flag';
import { useUIStore } from '../store/uiStore';

const languages = [
  { code: 'en', label: 'English', flag: 'GB' },
  { code: 'tr', label: 'Türkçe', flag: 'TR' },
];

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const language = useUIStore((state) => state.language);
  const setLanguage = useUIStore((state) => state.setLanguage);

  const handleChange = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      value={language}
      onChange={handleChange}
      style={{ width: 140 }}
      options={languages.map(lang => ({
        value: lang.code,
        label: (
          <span>
            <ReactCountryFlag countryCode={lang.flag} svg style={{ marginRight: 8 }} />
            {lang.label}
          </span>
        ),
      }))}
      aria-label={t('select_language')}
    />
  );
};

export default LanguageSelector;
