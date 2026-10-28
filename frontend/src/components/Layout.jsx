import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FC] text-[#344054]">
      <Navbar />
      <main className="flex-grow pt-[68px] sm:pt-[76px] lg:pt-[84px]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
