import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Booking from './pages/Booking';
import About from './pages/About';
import HouseRules from './pages/HouseRules';
import NearbyAttractions from './pages/NearbyAttractions';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

import CancellationRefund from './pages/CancellationRefund';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Shipping from './pages/Shipping';

// Layout component to handle conditional rendering of Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  // Hide Navbar and Footer on admin pages if desired, or keep them.
  // For this requirement, we'll keep them everywhere for consistency, 
  // but maybe hide them on login page if it looks cleaner.
  // Let's keep them for now.

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<HouseRules />} />
          <Route path="/attractions" element={<NearbyAttractions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cancellation-refund" element={<CancellationRefund />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
