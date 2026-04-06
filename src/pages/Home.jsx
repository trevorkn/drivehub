import React, { useState, useEffect } from "react";
import driveHubLogo from '../assets/DriveHubA.png';
import RangeRover from '../assets/RangeRover.png';
import '../styles/home.css';
import HomeCards from '../components/HomeCards';
import { useNavigate } from "react-router-dom";
import CrossHairNav from "../components/CrosshairNav";
import Footer from "../components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <section>
    <div
      className={`bg-noise relative min-h-screen flex flex-col ${loaded ? 'loaded' : ''}`}
      style={{ background: '#1b2540' }}
    >

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between pt-5 pb-3 px-4">
        <img
          src={driveHubLogo}
          alt="DriveHub Logo"
          className="h-20 w-auto object-contain"
        />
        <div className="flex items-center gap-8">
          <a href="#" className="nav-link text-sm">Log In</a>
          <a href="#" className="nav-link text-sm">Sign In</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center pb-10">

        {/* Title */}
        <h1 className="hero-title text-5xl md:text-6xl font-semibold mb-10 fade-start fade-in-title">
          Drive Hub
        </h1>

        {/* Car + glow */}
        <div className="relative w-full max-w-2xl mx-auto mb-12 fade-start fade-in-car">
          <img
            src={RangeRover}
            alt="Range Rover"
            className="car-float w-full object-contain"
            style={{
              maxHeight: '340px',
              filter: 'drop-shadow(0 30px 60px rgba(0, 0, 20, 0.75))',
            }}
          />
          <div className="car-glow" />
        </div>

        {/* Tagline */}
        <p className="hero-tagline text-2xl md:text-3xl font-semibold max-w-2xl mx-auto fade-start fade-in-tag">
          We find and deliver complete{' '}
          <span style={{ color: '#f0c060' }}>GEMS</span>
          , and loves of your lives.
        </p>

      </main>

      {/* Bottom vignette */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ background: 'linear-gradient(to top, rgba(10,16,36,0.55), transparent)' }}
      />
    </div>
    </section>

    
        <HomeCards />  

        {/* ── SECTION 3 - Crosshair Nav ── */}
        <CrossHairNav />

        {/* ── SECTION 4 - Footer ── */}
        <Footer />
        
    </div>
  )
}

