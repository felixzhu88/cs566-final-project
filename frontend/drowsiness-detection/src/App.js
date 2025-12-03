import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Demo from './components/Demo';
import HowItWorks from './components/HowItWorks';
import Approaches from './components/Approaches';
//import Metrics from './components/Metrics';
import Team from './components/Team';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Demo />
      <HowItWorks />
      <Approaches />
      <Team />
      <Footer />
    </div>
  );
}