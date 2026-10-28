import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Code-split pages for optimized bundle size and fast loading
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const OnlineServices = lazy(() => import('./pages/OnlineServices'));
const ITServices = lazy(() => import('./pages/ITServices'));
const BusinessAMC = lazy(() => import('./pages/BusinessAMC'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const Shop = lazy(() => import('./pages/Shop'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] py-12">
    <div className="w-8 h-8 rounded-full border-2 border-[#155EEF] border-t-transparent animate-spin"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="online-services" element={<OnlineServices />} />
          <Route path="it-services" element={<ITServices />} />
          <Route path="business-amc" element={<BusinessAMC />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Preserved legacy routes for bookmark compatibility */}
          <Route path="services" element={<Services />} />
          <Route path="shop" element={<Shop />} />

          {/* Catch-all route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        
        {/* Isolated Admin Routes */}
        <Route path="/admin">
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route index element={<Navigate to="/admin/login" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
