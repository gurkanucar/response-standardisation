import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp } from 'antd';
import { queryClient } from '../services/queryClient';
import ThemeProvider from './ThemeProvider';
import MessageProvider from './MessageProvider';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AntdApp>
          <MessageProvider />
          {children}
        </AntdApp>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProviders; 