import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'antd/dist/reset.css';
import './index.css';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './services/queryClient';
import './i18n.ts';
import ThemeProvider from "./providers/ThemeProvider.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/Router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </QueryClientProvider>
    // </React.StrictMode>,
);
