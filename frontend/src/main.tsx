import ReactDOM from 'react-dom/client';
import {ConfigProvider} from 'antd';
import App from './App.tsx';
import 'antd/dist/reset.css';
import './index.css';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './services/queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ConfigProvider wave={{disabled: true}}>
            <App/>
        </ConfigProvider>
    </QueryClientProvider>
    // </React.StrictMode>,
);
