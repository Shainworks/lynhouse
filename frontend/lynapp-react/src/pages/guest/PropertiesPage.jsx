import { useListings } from '../../hooks/useListings';
import ListingCard from '../../components/ListingCard';
import ScrollReveal from '../../components/ScrollReveal';
import './styles/PropertiesPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import PropertySearchBox from '../../components/PropertySearchBox';
import { useState, useRef, useMemo } from 'react';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid');
  const [gridLayout, setGridLayout] = useState('three-col');

  const params = new URLSearchParams(location.search);
  const pageParam = parseInt(params.get('page'), 10) || 1;
  const cityParam = params.get('city') || '';

  const [currentPage, setCurrentPage] = useState(pageParam);
  const listingsSectionRef = useRef(null);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedroomFilter, setBedroomFilter] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const { listings: rawListings, loading, error } = useListings(cityParam);

  // ── Determine property type from title/description (heuristic) ────────────
  const getPropertyType = (listing) => {
    const text = `${listing.title} ${listing.description}`.toLowerCase();
    if (text.includes('condo')) return 'condo';
    if (text.includes('apartment') || text.includes('apt')) return 'apartment';
    return 'house';
  };

  // ── Apply filters + sort (memoized for performance) ───────────────────────
  const listings = useMemo(() => {
    let filtered = [...rawListings];

    // Price range filter
    if (minPrice !== '') {
      filtered = filtered.filter(l => parseFloat(l.current_price) >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      filtered = filtered.filter(l => parseFloat(l.current_price) <= parseFloat(maxPrice));
    }

    // Property type filter
    if (propertyType !== '') {
      filtered = filtered.filter(l => getPropertyType(l) === propertyType);
    }

    // Bedroom filter
    if (bedroomFilter !== '') {
      if (bedroomFilter === '5+') {
        filtered = filtered.filter(l => l.bedrooms >= 5);
      } else {
        filtered = filtered.filter(l => l.bedrooms === parseInt(bedroomFilter, 10));
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.current_price) - parseFloat(b.current_price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.current_price) - parseFloat(a.current_price));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break; // 'recommended' — keep original API order
    }

    return filtered;
  }, [rawListings, minPrice, maxPrice, propertyType, bedroomFilter, sortBy]);

  const hasActiveFilters =
    minPrice !== '' || maxPrice !== '' || propertyType !== '' || bedroomFilter !== '' || sortBy !== 'recommended';

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setPropertyType('');
    setBedroomFilter('');
    setSortBy('recommended');
    setCurrentPage(1);
  };

  // ── Pagination ────────────────────────────────────────────────────────────
  const itemsPerPage = gridLayout === 'two-col' ? 6 : 9;
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = listings.slice(startIndex, endIndex);

  // Wrapper: apply a filter value AND reset page to 1
  const applyFilter = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleLayoutChange = (layout) => {
    setGridLayout(layout);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', String(newPage));
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  };

  // ── Pagination UI ─────────────────────────────────────────────────────────
  const PaginationControls = () => {
    const generatePageNumbers = () => {
      const pages = [];
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
      return pages;
    };

    if (loading || error || listings.length === 0 || totalPages <= 1) return null;

    return (
      <div className="pagination-container">
        <div className="pagination-info">
          Showing {startIndex + 1}–{Math.min(endIndex, listings.length)} of {listings.length} properties
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn first" onClick={() => handlePageChange(1)} disabled={currentPage === 1} title="First page">⇤ First</button>
          <button className="pagination-btn prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
          <div className="page-numbers">
            {generatePageNumbers().map((pageNum, index) =>
              pageNum === '...'
                ? <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                : <button key={pageNum} className={`page-btn ${currentPage === pageNum ? 'active' : ''}`} onClick={() => handlePageChange(pageNum)}>{pageNum}</button>
            )}
          </div>
          <button className="pagination-btn next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next →</button>
          <button className="pagination-btn last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} title="Last page">Last ⇥</button>
        </div>
      </div>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="properties-page">
      <PropertySearchBox
        initialValue={cityParam}
        onSubmit={city => {
          const trimmed = city.trim();
          navigate(trimmed ? `/properties/?city=${encodeURIComponent(trimmed)}` : '/properties');
          setCurrentPage(1);
          listingsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      <ScrollReveal variant="fade-down" delay={0} rootMargin="-20px">
        <div className="filters-section-container">
          <div className="filters-section">
            <div className="container">
              <div className="filters-header">
                <h3>Filter &amp; Sort</h3>
                <div className="filters-header-right">
                  <span className="results-count">
                    {loading ? 'Loading...' : `${listings.length} of ${rawListings.length} properties`}
                  </span>
                  {hasActiveFilters && (
                    <button className="clear-filters-btn" onClick={clearFilters}>
                      ✕ Clear Filters
                    </button>
                  )}
                </div>
              </div>

              <div className="filters-grid">
                {/* Price Range */}
                <div className="filter-group">
                  <label>Price Range</label>
                  <div className="price-range">
                    <input
                      type="number"
                      placeholder="Min price"
                      value={minPrice}
                      min="0"
                      onChange={e => applyFilter(setMinPrice)(e.target.value)}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      placeholder="Max price"
                      value={maxPrice}
                      min="0"
                      onChange={e => applyFilter(setMaxPrice)(e.target.value)}
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div className="filter-group">
                  <label>Property Type</label>
                  <select
                    value={propertyType}
                    onChange={e => applyFilter(setPropertyType)(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div className="filter-group">
                  <label>Bedrooms</label>
                  <div className="bedroom-pills">
                    {[1, 2, 3, 4, '5+'].map(num => (
                      <button
                        key={num}
                        className={`pill-btn ${bedroomFilter === String(num) ? 'active' : ''}`}
                        onClick={() =>
                          applyFilter(setBedroomFilter)(
                            bedroomFilter === String(num) ? '' : String(num)
                          )
                        }
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="filter-group">
                  <label>Sort By</label>
                  <select
                    value={sortBy}
                    onChange={e => applyFilter(setSortBy)(e.target.value)}
                  >
                    <option value="recommended">AI Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <section className="properties container" ref={listingsSectionRef}>
        <ScrollReveal variant="fade-up" delay={0}>
          <div className="section-header">
            <div className="header-content">
              <h2>Featured Properties {cityParam && `in ${cityParam}`}</h2>
              <p>Discover top investment opportunities selected by our AI</p>
            </div>
            <div className="property-stats">
              <div className="stat-item">
                <span className="stat-number">{listings.length}</span>
                <span className="stat-label">Properties</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">AI Match Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$2.4M</span>
                <span className="stat-label">Avg. Value</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="view-controls">
          <div className="view-toggle">
            <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              <span className="icon">⊞</span> Grid View
            </button>
            <button className={`view-btn ${viewMode === 'map' ? 'active' : ''}`} onClick={() => setViewMode('map')}>
              <span className="icon">🗺️</span> Map View
            </button>
          </div>
          {viewMode === 'grid' && (
            <div className="layout-options">
              <button className={`layout-btn ${gridLayout === 'two-col' ? 'active' : ''}`} onClick={() => handleLayoutChange('two-col')} title="2 columns">⊞⊞</button>
              <button className={`layout-btn ${gridLayout === 'three-col' ? 'active' : ''}`} onClick={() => handleLayoutChange('three-col')} title="3 columns">⊞⊞⊞</button>
            </div>
          )}
        </div>

        {viewMode === 'grid' && <PaginationControls />}

        {viewMode === 'map' ? (
          <div className="development-message">
            <div className="development-icon">🚧</div>
            <h3>Map View Coming Soon!</h3>
            <p>We're working hard to bring you an interactive map experience. This feature is currently under development.</p>
            <div className="development-features">
              <p><strong>Upcoming features:</strong></p>
              <ul>
                <li>Interactive property map with pins 📍</li>
                <li>Neighborhood insights and boundaries 🗺️</li>
                <li>Nearby amenities visualization ⛪</li>
              </ul>
            </div>
            <button className="switch-to-grid-btn" onClick={() => setViewMode('grid')}>
              <span className="icon">⊞</span> Switch to Grid View
            </button>
          </div>
        ) : (
          <div className={`property-grid ${gridLayout}`}>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Finding the best properties for you, please wait...</p>
                <div className="loading-skeleton">
                  <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line short"></div>
                      <div className="skeleton-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="error-container">
                <div className="error-icon">⚠️</div>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button className="retry-btn" onClick={() => window.location.reload()}>Try Again</button>
              </div>
            ) : listings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏠</div>
                <h3>No properties match your filters</h3>
                <p>Try adjusting or clearing your filter criteria.</p>
                {hasActiveFilters && (
                  <button className="retry-btn" onClick={clearFilters}>Clear Filters</button>
                )}
              </div>
            ) : (
              currentListings.map((listing, index) => (
                <ScrollReveal key={listing.id} variant="scale-up" delay={index * 0.08} threshold={0.05}>
                  <ListingCard listing={listing} />
                </ScrollReveal>
              ))
            )}
          </div>
        )}

        {viewMode === 'grid' && <PaginationControls />}
      </section>
    </div>
  );
};

export default PropertiesPage;
