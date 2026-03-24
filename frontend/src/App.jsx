import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Services from './pages/Services';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="services" element={<Services />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      
      <Route path="/admin">
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
