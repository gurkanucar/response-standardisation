import React, { useEffect } from 'react';
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
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <Select
      value={language}
      onChange={handleChange}
      variant="borderless"
      options={languages.map(lang => ({
        value: lang.code,
        label: (
          <ReactCountryFlag countryCode={lang.flag} svg style={{ width: 20, height: 20 }} />
        ),
      }))}
      aria-label={t('select_language')}
    />
  );
};

export default LanguageSelector;
