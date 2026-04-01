import './styles/AboutPage.css';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal';

const AboutPage = () => {
  return (
    <div className="about-page">

      {/* ── Hero Section ─────────────────────────────── */}
      <section className="hero-section">
        <ScrollReveal variant="fade-right" delay={0} duration={0.8}>
          <div className="hero-content">
            <h1 className="hero-title">
              Revolutionizing Housing with <span className="gradient-text">AI Intelligence</span>
            </h1>
            <p className="hero-subtitle">
              Lyn Housing AI transforms the way you discover, analyze, and secure your perfect home
              through cutting-edge artificial intelligence and predictive analytics.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="zoom-in" delay={0.2} duration={0.9}>
          <div className="hero-visual">
            <div className="ai-animation">
              <div className="neural-node"></div>
              <div className="neural-node"></div>
              <div className="neural-node"></div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Mission Section ───────────────────────────── */}
      <section className="mission-section">
        <div className="container">
          <ScrollReveal variant="fade-up" delay={0}>
            <h2 className="section-title">Our Mission</h2>
          </ScrollReveal>

          <div className="mission-grid">
            <ScrollReveal variant="flip-x" delay={0.05}>
              <div className="mission-card">
                <div className="mission-icon">🏠</div>
                <h3>Smart Discovery</h3>
                <p>AI-powered property matching based on lifestyle preferences, commute patterns, and predictive market trends.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="flip-x" delay={0.18}>
              <div className="mission-card">
                <div className="mission-icon">📊</div>
                <h3>Data-Driven Insights</h3>
                <p>Real-time market analysis, price predictions, and neighborhood scoring using machine learning algorithms.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="flip-x" delay={0.31}>
              <div className="mission-card">
                <div className="mission-icon">🔮</div>
                <h3>Future-Ready</h3>
                <p>Anticipate market changes, investment opportunities, and lifestyle shifts before they happen.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Technology Section ────────────────────────── */}
      <section className="tech-section">
        <div className="container">
          <ScrollReveal variant="fade-up" delay={0}>
            <h2 className="section-title">Powered by Advanced AI</h2>
          </ScrollReveal>

          <div className="tech-features">
            <ScrollReveal variant="fade-right" delay={0.05} duration={0.7}>
              <div className="tech-feature">
                <div className="feature-header">
                  <span className="feature-tag">Neural Networks</span>
                  <h4>Predictive Property Valuation</h4>
                </div>
                <p>Our deep learning models analyze 200+ variables to predict property values with 95% accuracy.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-right" delay={0.18} duration={0.7}>
              <div className="tech-feature">
                <div className="feature-header">
                  <span className="feature-tag">Computer Vision</span>
                  <h4>Automated Property Assessment</h4>
                </div>
                <p>AI-powered image analysis evaluates property conditions, renovations needed, and potential issues.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-right" delay={0.31} duration={0.7}>
              <div className="tech-feature">
                <div className="feature-header">
                  <span className="feature-tag">NLP Processing</span>
                  <h4>Smart Search &amp; Matching</h4>
                </div>
                <p>Natural language processing understands your preferences and finds properties that truly match your lifestyle.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Stats Section ─────────────────────────────── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <ScrollReveal variant="scale-up" delay={0.00}>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Properties Analyzed</div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale-up" delay={0.10}>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Prediction Accuracy</div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale-up" delay={0.20}>
              <div className="stat-item">
                <div className="stat-number">12K+</div>
                <div className="stat-label">Happy Homeowners</div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale-up" delay={0.30}>
              <div className="stat-item">
                <div className="stat-number">200+</div>
                <div className="stat-label">Data Points</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Team Section ──────────────────────────────── */}
      <section className="team-section">
        <div className="container">
          <ScrollReveal variant="fade-up" delay={0}>
            <h2 className="section-title">Meet the Innovators</h2>
          </ScrollReveal>

          <div className="team-grid">
            <ScrollReveal variant="zoom-in" delay={0.05}>
              <div className="team-member">
                <div className="member-avatar">YF</div>
                <h4>Yanfan Lin</h4>
                <p className="member-role">Back-End Lead</p>
                <p className="member-bio">Implement back-end features and AI integration.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="zoom-in" delay={0.18}>
              <div className="team-member">
                <div className="member-avatar">NH</div>
                <h4>Hieu Nguyen</h4>
                <p className="member-role">Front-End Lead</p>
                <p className="member-bio">Work on App UX/UI and System Design.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="zoom-in" delay={0.31}>
              <div className="team-member">
                <div className="member-avatar">FY</div>
                <h4>Fei Yue</h4>
                <p className="member-role">Database Lead</p>
                <p className="member-bio">Data collection, organization and processing.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <ScrollReveal variant="scale" delay={0} duration={0.8}>
            <div className="cta-content">
              <h2>Ready to Find Your Perfect Home?</h2>
              <p>Join thousands of smart homebuyers using AI to make better housing decisions.</p>
              <div className="cta-buttons">
                <Link to="/properties">
                  <button className="btn-primary">Start Your Search</button>
                </Link>
                <Link to="/register">
                  <button className="btn-secondary">Register</button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
