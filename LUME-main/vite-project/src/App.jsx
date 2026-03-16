import { useEffect, useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Manage body scroll when mobile menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  useEffect(() => {
    // Header scrolled effect
    const headerEl = document.querySelector('.header')
    const onScroll = () => {
      if (!headerEl) return
      if (window.scrollY > 8) headerEl.classList.add('scrolled')
      else headerEl.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => setMenuOpen((v) => !v)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Header and Navigation */}
      <header className="header" role="banner">
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <div className="logo">
            <a href="#" aria-label="LUME home">
              <img src="/LUME_icon(v3).png" alt="LUME logo" />
              LUME
            </a>
          </div>

          {/* Nav Links */}
          <ul className="nav-links" role="menubar">
            <li role="none"><a href="#" role="menuitem" aria-label="Therapeutic paths">THERAPEUTIC PATHS</a></li>
            <li role="none"><a href="#" role="menuitem" aria-label="Guided meditations">MEDITATION</a></li>
            <li role="none"><a href="#" role="menuitem" aria-label="Emotional journal">EMOTIONAL JOURNAL</a></li>
            <li role="none"><a href="#" role="menuitem" aria-label="Personalized paths">PERSONALIZED PATHS</a></li>
          </ul>

          {/* Action Buttons */}
          <div className="nav-buttons">
            <a href="#" className="btn-login" aria-label="Sign in">Login</a>
            <a href="#" className="btn-signin" aria-label="Create account">Sign In</a>
          </div>

          {/* Hamburger */}
          <div className="hamburger">
            <button
              className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'active' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
          <ul className="mobile-nav-links">
            <li><a href="#" aria-label="Therapeutic paths" onClick={closeMenu}>THERAPEUTIC PATHS</a></li>
            <li><a href="#" aria-label="Guided meditations" onClick={closeMenu}>MEDITATION</a></li>
            <li><a href="#" aria-label="Emotional journal" onClick={closeMenu}>EMOTIONAL JOURNAL</a></li>
            <li><a href="#" aria-label="Personalized paths" onClick={closeMenu}>PERSONALIZED PATHS</a></li>
            <li><a href="#" className="btn-login" aria-label="Sign in" onClick={closeMenu}>Login</a></li>
            <li><a href="#" className="btn-signin" aria-label="Create account" onClick={closeMenu}>Sign In</a></li>
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <main role="main">
        {/* Hero */}
        <section className="main-content section" aria-labelledby="hero-title">
          <div className="container">
            <h1 className="main-title" id="hero-title">Breathe. Focus.</h1>
            <h2 className="main-subtitle">Move forward.</h2>
            <p className="hero-description">Your digital sanctuary for mental well-being</p>
          </div>
        </section>

        {/* Carousel */}
        <section className="section carousel-section" aria-label="Image gallery">
          <div className="image-carousel" role="region" aria-label="Image carousel">
            <div className="image image1">
              <img src="/Img1.png" alt="Image representing mental well-being and inner peace" loading="lazy" />
            </div>
            <div className="image image2">
              <img src="/Img2.png" alt="Image representing meditation and mindfulness" loading="lazy" />
            </div>
            <div className="image image3">
              <img src="/Img3.png" alt="Image representing personal growth and self-discovery" loading="lazy" />
            </div>
            {/* Duplicates for infinite loop */}
            <div className="image image1">
              <img src="/Img1.png" alt="Image representing mental well-being and inner peace" loading="lazy" />
            </div>
            <div className="image image2">
              <img src="/Img2.png" alt="Image representing meditation and mindfulness" loading="lazy" />
            </div>
            <div className="image image3">
              <img src="/Img3.png" alt="Image representing personal growth and self-discovery" loading="lazy" />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section about-section" aria-labelledby="about-title">
          <div className="container">
            <header className="about_title">
              <h2 id="about-title">Who we are?</h2>
            </header>
            <div className="about">
              <p>
                Modern life is fast-paced and, at times, overwhelming. Between the pressure to be productive and the uncertainties of the future, finding a moment of peace can feel like a luxury. We understand. LUME was born from this understanding: that caring for your mind isn't a luxury, but the foundation for everything. We are your digital sanctuary, a safe space where you can pause, breathe, and reconnect with your true self. Through therapeutic paths, guided meditations, and self-discovery tools, we offer a gentle way back to your center, at your own pace and in your own time.
              </p>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="section services-section" aria-labelledby="services-title">
          <div className="container">
            <header className="whatwedo">
              <h2 id="services-title">What we do?</h2>
            </header>
            <div className="whatwedotext">
              <p>
                At LUME, we create digital mental health tools designed to fit into your life, offering practical and gentle support whenever you need it. We help you build a self-care routine through:
              </p>
              <ul className="services-list">
                <li>
                  <strong>Therapeutic paths</strong>
                  <p>Follow audio-guided journeys and interactive exercises on topics like anxiety, sleep, and focus. Each path is a safe step toward your well-being.</p>
                </li>
                <li>
                  <strong>Guided meditations</strong>
                  <p>Find calm pauses in your day. Our 5 to 20-minute meditations help silence mental noise and find clarity.</p>
                </li>
                <li>
                  <strong>Emotional Journal</strong>
                  <p>A safe space to record and understand your feelings. Identify patterns and celebrate your progress with our intelligent journal.</p>
                </li>
                <li>
                  <strong>Personalized paths</strong>
                  <p>Based on your journal entries, LUME suggests content and practices tailored to your current challenges and goals.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section testimonials-section" aria-labelledby="testimonials-title">
          <div className="container">
            <header className="whoislumefor">
              <h2 id="testimonials-title">Who is LUME for?</h2>
            </header>
            <div className="whoislumefortext">
              <h3>What Our Users Says?</h3>
              <blockquote className="testimonial">
                <p>"The Emotional Journal changed how I process my feelings. Within a few weeks, I started to understand my anxiety triggers. LUME has become my daily sanctuary."</p>
                <cite>- Mariana V., Lawyer</cite>
              </blockquote>
              <blockquote className="testimonial">
                <p>"I could never truly meditate until I found the Guided Paths. The calm voice and clear instructions helped me build a habit that is genuinely reducing my stress at work."</p>
                <cite>- Lucas P., Developer</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section cta-section" aria-labelledby="cta-title">
          <div className="container">
            <header className="CTA">
              <h2 id="cta-title">Ready to breathe?</h2>
            </header>
            <div className="CTAText">
              <p>Sign up and start your journey to mental well-being.</p>
            </div>
            <div className="btn">
              <a href="#" className="btn-signin btn-large" aria-label="Create account and start journey">Sign In</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer role="contentinfo">
        <div className="footer-container">
          {/* Left Column */}
          <div className="footer-left">
            <div className="footer-lume">
              <h3>LUME</h3>
            </div>
            <nav aria-label="Footer links">
              <ul className="footer-links">
                <li><a href="#" aria-label="Therapeutic paths">THERAPEUTIC PATHS</a></li>
                <li><a href="#" aria-label="Guided meditations">MEDITATION</a></li>
                <li><a href="#" aria-label="Emotional journal">EMOTIONAL JOURNAL</a></li>
                <li><a href="#" aria-label="Personalized paths">PERSONALIZED PATHS</a></li>
              </ul>
            </nav>
          </div>

          <div className="company">
            <div className="company-title">
              <h3>COMPANY</h3>
            </div>
            <ul>
              <li>About Us</li>
              <li>Blog</li>
              <li>Carrers</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="resources">
            <div className="resources-title">
              <h3>RESOURCES</h3>
            </div>
            <ul>
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Community</li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="footer-right">
            <div className="footer-contact">
              <h3>Contact</h3>
            </div>
            <div className="footer-social" aria-label="Social media">
              <a href="#" aria-label="Facebook"><img src="/facebook.png" alt="Facebook" loading="lazy" /></a>
              <a href="#" aria-label="Instagram"><img src="/insta.png" alt="Instagram" loading="lazy" /></a>
              <a href="#" aria-label="X (Twitter)"><img src="/X.png" alt="X" loading="lazy" /></a>
              <a href="#" aria-label="LinkedIn"><img src="/linkedin.png" alt="LinkedIn" loading="lazy" /></a>
              <a href="#" aria-label="YouTube"><img src="/yt_icon.png" alt="YouTube" loading="lazy" /></a>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2024 LUME. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
