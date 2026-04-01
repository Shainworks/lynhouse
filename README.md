# 🏡 Lyn Housing AI App 

## Overview
**Lyn Housing AI** is a **full-stack intelligent real estate platform** that combines cutting-edge artificial intelligence with modern web technologies to revolutionize property search, analysis, and investment decision-making. Built for home buyers, real estate professionals, and investors who want data-driven insights and AI-powered property recommendations.

<p align="center">
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" alt="React" width="48" height="48"/>
  <img src="https://www.svgrepo.com/show/353657/django-icon.svg" alt="Django" width="48" height="48"/>
  <img src="https://vitejs.dev/logo.svg" alt="Vite" width="48" height="48"/>
  <img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-vertical.png" alt="Firebase" width="32" height="48"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" alt="SQLite" width="48" height="48"/>
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="48" height="48"/>
  <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" alt="Vercel" width="48" height="48"/>
  <img src="https://us1.discourse-cdn.com/flex016/uploads/render/original/2X/1/11352202c8503f736bea5efb59684f678d7c860c.svg" alt="Render" width="48" height="48"/>
  <img src="https://avatars.githubusercontent.com/u/5429470?s=200&v=4$0" alt="Docker" width="48"/>
</p>

---

## Table of Contents
- 📍 [Features](#features)
- 💻 [Tech Stack](#tech-stack)
- 🏗️ [Architecture](#architecture)
- 📂 [Project Structure](#project-structure)
- ⚙️ [Getting Started](#getting-started)
- 🛠️ [API Endpoints](#api-endpoints)
- 🔧 [Development](#development)
- 🤝 [Contributing](#contributing)
- 📜 [License](#license)

---

## Features
- 🤖 **AI-Powered Property Analysis** with OpenAI integration for real estate market insights and price predictions
- 🏠 **Comprehensive Property Search** with city-based filtering, autocomplete suggestions, and advanced sorting
- 🔐 **Secure Firebase Authentication** with complete user registration, login, and session management
- 📊 **Interactive Data Visualization** including price history charts and property comparison tools
- 🗺️ **Property Mapping & Location Intelligence** with Leaflet maps and walkability scoring
- 📱 **Responsive Design Excellence** optimized for desktop, tablet, and mobile experiences
- ⚡ **High-Performance Architecture** using Django REST API with SQLite (dev) / PostgreSQL (prod)
- 🧠 **Real-Time Form Validation** with instant client-side feedback and error handling
- 🧭 **Smart Navigation System** with context-aware back buttons and page state preservation
- 📋 **RESTful API Design** with comprehensive documentation and modular endpoint structure

---

## Tech Stack
| Layer       | Technology                                                  |
|-------------|------------------------------------------------------------|
| **Frontend**    | [ReactJS](https://react.dev/) ([Vite](https://vitejs.dev/)), [Font Awesome](https://fontawesome.com/), [Leaflet Maps](https://leafletjs.com/) |
| **Backend**     | [Django](https://www.djangoproject.com/) ([REST Framework](https://www.django-rest-framework.org/)), [OpenAI API](https://openai.com/api/) |
| **Authentication**        | [Firebase Authentication](https://firebase.google.com/products/auth) |
| **Database**    | [SQLite](https://www.sqlite.org/) (dev), [PostgreSQL](https://www.postgresql.org/) (prod) |
| **AI/ML**      | [OpenAI GPT](https://openai.com/) for property analysis and market insights |
| **Containerization**      | [Docker](https://www.docker.com/) with Docker Compose |
| **Version Control** | [Git](https://git-scm.com/)/[GitHub](https://github.com/) |
| **Deployment**    | [Vercel](https://vercel.com/) (Frontend)<br>[Render](https://render.com/) (Backend) |
---

## Architecture
```
ReactJS Frontend (Vite)
      │
      ├── Firebase Authentication (User Management)
      ├── Leaflet Maps (Interactive Property Maps)
      │
      ▼
Django REST API Backend
      │
      ├── OpenAI GPT Integration (AI Property Analysis)
      ├── Analysis Caching System
      │
      ▼
SQLite (Development) / PostgreSQL (Production)
      │
      ▼
External Services:
• Walk Score API (Walkability Data)
• Geocoding Services (Location Intelligence)
• Image Hosting (Property Media)
```

---

## Project Structure
```
lyn-housing-ai-app/
├── backend/                                # Django REST API
│   ├── listings/                           # Property listings app
│   │   ├── models.py                       # Database models (Listing, PriceHistory, AnalysisCache)
│   │   ├── serializer.py                   # Data serialization for API responses
│   │   ├── views.py                        # API endpoints + OpenAI integration
│   │   ├── urls.py                         # URL routing for listings and AI analysis
│   │   ├── admin.py                        # Django admin configuration
│   │   ├── migrations/                     # Database migration files
│   │   └── management/commands/            # Custom Django commands
│   ├── lynapp-django/                      # Main Django project
│   │   ├── settings.py                     # Project settings + environment config
│   │   ├── urls.py                         # Root URL configuration
│   │   ├── wsgi.py                         # WSGI configuration
│   │   └── asgi.py                         # ASGI configuration
│   ├── requirements.txt                    # Python dependencies (Django, OpenAI, etc.)
│   ├── manage.py                           # Django management script
│   ├── db.sqlite3                          # SQLite database (development)
│   ├── Dockerfile                          # Docker container configuration
│   └── compose.yaml                        # Docker Compose for backend
├── frontend/lynapp-react/                  # React Frontend (Vite)
│   ├── public/                             # Static assets (favicon, images, SEO files)
│   ├── src/
│   │   ├── components/                     # Reusable React components
│   │   │   ├── buttons/                    # Action buttons (AI Analysis, Schedule, etc.)
│   │   │   │   ├── AiAnalysisButton.jsx    # AI-powered property analysis trigger
│   │   │   │   ├── FavoriteButton.jsx      # Property favoriting functionality
│   │   │   │   ├── ScheduleButton.jsx      # Viewing appointment scheduler
│   │   │   │   └── RoiCalculatorButton.jsx # ROI calculation tool
│   │   │   ├── utility/                    # Utility components
│   │   │   │   ├── SimpleToast.jsx         # Notification system
│   │   │   │   ├── ListingCard.jsx         # Property listing display card
│   │   │   │   ├── PropertyMap.jsx         # Interactive Leaflet maps
│   │   │   │   ├── PriceHistoryChart.jsx   # Chart.js price visualization
│   │   │   │   ├── ImageGallery.jsx        # Property image carousel
│   │   │   │   ├── ScoreBadge.jsx          # Walkability/Transit scores
│   │   │   │   └── PropertySearchBox.jsx   # City search with autocomplete
│   │   ├── contexts/                       # React Context providers
│   │   │   └── AuthContext.jsx             # Firebase authentication state
│   │   ├── hooks/                          # Custom React hooks
│   │   │   └── useListings.js              # Property data fetching logic
│   │   ├── pages/                          # Page components
│   │   │   ├── auth/                       # Authentication pages
│   │   │   │   ├── LoginPage.jsx           # User login with Firebase
│   │   │   │   └── RegisterPage.jsx        # User registration with validation
│   │   │   ├── guest/                      # Public pages
│   │   │   │   ├── HomePage.jsx            # Landing page with AI features
│   │   │   │   ├── AboutPage.jsx           # Company/team information
│   │   │   │   ├── PropertiesPage.jsx      # Property search and filtering
│   │   │   │   └── PropertyDetailPage.jsx  # Detailed property view + AI analysis
│   │   │   └── user/                       # Authenticated user pages
│   │   │       └── UserDashboardPage.jsx   # User dashboard after login
│   │   ├── services/                       # API and external service integrations
│   │   │   ├── api.js                      # Django REST API client
│   │   │   └── firebase.js                 # Firebase configuration
│   │   ├── tools/                          # Utility functions
│   │   │   ├── InputValidation.js          # Form validation helpers
│   │   │   └── ScrollToTop.jsx             # Navigation utilities
│   │   ├── styles/                         # Global styling
│   │   │   └── colors.css                  # Design system color variables
│   │   ├── App.jsx                         # Main application component + routing
│   │   ├── main.jsx                        # React entry point
│   │   └── index.css                       # Global CSS resets and base styles
│   ├── package.json                        # Node.js dependencies
│   ├── vite.config.js                      # Vite build configuration
│   ├── index.html                          # HTML template with SEO meta tags
│   ├── Dockerfile                          # Docker container for frontend
│   └── compose.yaml                        # Docker Compose for frontend
├── docs/                                   # Project documentation
│   ├── API.md                              # RESTful API endpoint documentation
│   ├── ARCHITECTURE.md                     # System architecture overview
│   ├── CONTRIBUTING.md                     # Contribution guidelines
│   ├── DEVELOPMENT.md                      # Development setup guide
│   ├── INSTALLATION.md                     # Installation instructions
│   └── PROJECT-STRUCTURE.md                # Project organization details
├── docker-compose.yml                      # Multi-service Docker orchestration
├── start-lynapp-macos.sh                   # macOS startup script
├── start-lynapp-win.bat                    # Windows startup script
├── LICENSE                                 # MIT License
└── README.md                               # Project overview and setup guide
```

---

## Getting Started

### Prerequisites
- **Python 3.8+** with pip package manager
- **Node.js 16+** with npm package manager  
- **OpenAI API Key** for AI property analysis features
- **Firebase Project** for authentication services

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/ndmh99/lyn-housing-ai-app.git
cd lyn-housing-ai-app
```

2. **Backend Setup (Django)**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create environment file
cp .env.example .env  # Edit with your API keys
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup (React)**
```bash
cd frontend/lynapp-react
npm install

# Create environment file  
cp .env.example .env  # Edit with your Firebase config
npm run dev
```

### Quick Start Scripts
```bash
# macOS/Linux
./start-lynapp-macos.sh

# Windows
start-lynapp-win.bat
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000
- **Admin Panel**: http://127.0.0.1:8000/admin

### Environment Variables Required
**Backend (.env)**:
```env
SECRET_KEY=your_django_secret_key
DEBUG=True
OPENAI_API_KEY=your_openai_api_key
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend (.env)**:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## API Endpoints

### Core Listings API
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/listings/` | Get all property listings |
| `GET` | `/api/listings/{id}/` | Get specific property details |
| `GET` | `/api/listings/search/?city={city}` | Search properties by city |
| `POST` | `/api/listings/create/` | Create new property listing |
| `PUT` | `/api/listings/{id}/update/` | Update existing property |
| `DELETE` | `/api/listings/{id}/delete/` | Delete property listing |

### AI Analysis API
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/listings/analyze-housing/` | Generate AI property analysis using OpenAI |

### Features
- **Caching System**: AI analysis results are cached to improve performance
- **Error Handling**: Comprehensive error responses with details
- **Authentication**: Firebase token validation for protected endpoints
- **Rate Limiting**: Built-in protection against API abuse

📖 **Full Documentation**: [API Reference Guide](./docs/API.md)

---

## Development

### Branch Strategy
- **`main`**: Production-ready stable releases
- **`develop`**: Active development branch (current)
- **`test`**: Integration testing environment
- **`deployment`**: Cloud deployment configurations

### Development Workflow
1. Fork the repository and create feature branches from `develop`
2. Follow the coding standards and run tests locally
3. Submit pull requests targeting the `develop` branch
4. All PRs require review before merging

### Local Development Setup
```bash
# Start backend with hot reload
cd backend && python manage.py runserver

# Start frontend with hot reload  
cd frontend/lynapp-react && npm run dev

# Run tests
cd backend && python manage.py test
cd frontend/lynapp-react && npm test
```

### Docker Development
```bash
# Start all services
docker-compose up --build

# Backend only
cd backend && docker-compose up

# Frontend only  
cd frontend/lynapp-react && docker-compose up
```

📖 **Contributing**: See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for detailed guidelines

---

## Contributing

We welcome contributions from developers of all experience levels! Here's how you can help:

### How to Contribute
1. **Fork** the repository and clone your fork locally
2. **Create a feature branch** from `develop`: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our coding standards
4. **Test thoroughly** and ensure all tests pass
5. **Submit a Pull Request** with a clear description of changes

### Areas for Contribution
- 🤖 **AI Features**: Enhance property analysis algorithms
- 🎨 **UI/UX**: Improve user interface and experience
- 📊 **Data Visualization**: Add new chart types and analytics
- 🔧 **Performance**: Optimize loading times and responsiveness
- 📱 **Mobile**: Enhance mobile user experience
- 🧪 **Testing**: Expand test coverage and automation

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed
- Be respectful and collaborative in discussions

🤝 **Questions?** Open an [issue](https://github.com/ndmh99/lyn-housing-ai-app/issues) or discussion thread

📋 **Detailed Guidelines**: [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

---

## License
[MIT License](./LICENSE) © [SHAIN](https://github.com/Shainworks)

---

> *lyn-housing-ai-app* 🏡✨ 2025
