import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./router/Router.tsx";
import AppProviders from "./providers/AppProviders.tsx";
import './i18n.ts';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AppProviders>
        <RouterProvider router={router}/>
    </AppProviders>
  // </React.StrictMode>,
);
