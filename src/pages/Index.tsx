
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <Hero />
      <Gallery />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
      <WhatsAppButton/>
    </div>
  );
};

export default Index;
