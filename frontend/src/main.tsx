import ReactDOM from 'react-dom/client';
import {ConfigProvider, theme as antdTheme} from 'antd';
import App from './App.tsx';
import 'antd/dist/reset.css';
import './index.css';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './services/queryClient';
import './i18n';
import {useUIStore} from './store/uiStore';
import React from 'react';

function ThemeProvider({children}: { children: React.ReactNode }) {
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

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </QueryClientProvider>
    // </React.StrictMode>,
);
