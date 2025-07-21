import ReactDOM from 'react-dom/client';
import {App as AntdApp} from 'antd';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './services/queryClient';
import './i18n.ts';
import ThemeProvider from "./providers/ThemeProvider.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/Router.tsx";
import './index.css';
import MessageProvider from "./providers/MessageProvider.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AntdApp>
        <MessageProvider/>
        <RouterProvider router={router}/>
      </AntdApp>
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>,
);
