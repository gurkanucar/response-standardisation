import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import SidebarLayout from './components/Sidebar';
import Users from './pages/Users';
import './App.css';

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<SidebarLayout />}>
                        <Route path="products" element={<Products />} />
                        <Route path="users" element={<Users />} />
                    </Route>
                </Routes>
        </Router>
    );
}

export default App;
