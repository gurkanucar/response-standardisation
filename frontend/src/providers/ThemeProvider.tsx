import {ConfigProvider, theme as antdTheme} from 'antd';
import {useUIStore} from '../store/uiStore';
import React from 'react';

const ThemeProvider = ({children}: { children: React.ReactNode }) => {
  const theme = useUIStore((state) => state.theme);
  return (
    <ConfigProvider
      wave={{disabled: true}}
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider; 