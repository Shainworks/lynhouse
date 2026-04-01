import { useListings } from '../../hooks/useListings';
import ListingCard from '../../components/ListingCard';
import ScrollReveal from '../../components/ScrollReveal';
import './styles/HomePage.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertySearchBox from '../../components/PropertySearchBox';

const HomePage = () => {
    const { listings, loading, error } = useListings();
    const navigate = useNavigate();
    const featuresRef = useRef(null);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleScrollDown = () => {
        if (featuresRef.current) {
            featuresRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Next Investment Property</h1>
                    <p>Use our AI-powered predictions to discover high-appreciation real estate opportunities</p>
                    <PropertySearchBox
                        initialValue={""}
                        onSubmit={city => {
                            const trimmed = city.trim();
                            navigate(trimmed ? `/properties/?city=${encodeURIComponent(trimmed)}` : '/properties');
                        }}
                    />
                    <div className="scroll-down-arrow" onClick={handleScrollDown} style={{cursor: 'pointer'}}>
                        <i className="fa fa-chevron-down"></i>
                        <i className="fa fa-chevron-down"></i>
                        <i className="fa fa-chevron-down" ref={featuresRef}></i>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features container">
                <ScrollReveal variant="fade-up" delay={0}>
                    <div className="section-header">
                        <h2>Why Choose LYN AI</h2>
                        <p>We leverage artificial intelligence to help you make smarter investment decisions</p>
                    </div>
                </ScrollReveal>

                <div className="features-grid">
                    <ScrollReveal variant="flip-x" delay={0.05} className="feature-card-wrapper">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-chart-line"></i>
                            </div>
                            <h3>AI Price Predictions</h3>
                            <p>Our advanced algorithms analyze market trends to forecast property appreciation</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="flip-x" delay={0.18} className="feature-card-wrapper">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-map-marked-alt"></i>
                            </div>
                            <h3>Neighborhood Analysis</h3>
                            <p>Get detailed insights on neighborhood growth potential and investment viability</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="flip-x" delay={0.31} className="feature-card-wrapper">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa fa-calculator"></i>
                            </div>
                            <h3>ROI Calculator</h3>
                            <p>Estimate your return on investment with our comprehensive financial tools</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="properties container">
                <ScrollReveal variant="fade-up" delay={0}>
                    <div className="section-header">
                        <h2>Featured Properties</h2>
                        <p>Discover top investment opportunities selected by our AI</p>
                    </div>
                </ScrollReveal>

                <div className="property-grid">
                    {listings.slice(0, 3).map((listing, index) => (
                        <ScrollReveal
                            key={listing.id}
                            variant="scale-up"
                            delay={index * 0.14}
                        >
                            <ListingCard listing={listing} />
                        </ScrollReveal>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
