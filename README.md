# 🌱 CarbonSustain - Sustainability Actions Tracker

A modern, full-stack web application for tracking and managing personal sustainability actions. Built with React and Django, CarbonSustain helps users monitor their environmental impact through a clean, intuitive interface.

![CarbonSustain Header](https://img.shields.io/badge/Status-Active-green) ![React](https://img.shields.io/badge/React-18+-blue) ![Django](https://img.shields.io/badge/Django-4+-green) ![Python](https://img.shields.io/badge/Python-3.8+-blue)

## ✨ Features

### 🎯 Core Functionality
- **Action Tracking**: Log daily sustainability actions with descriptions, dates, and point values
- **CRUD Operations**: Create, read, update, and delete sustainability actions
- **Real-time Updates**: Instant feedback with loading states and success/error notifications
- **Form Validation**: Comprehensive validation using React Hook Form and Zod
- **Responsive Design**: Beautiful, mobile-friendly interface

### 🎨 User Experience
- **Modern UI**: Clean, professional design with sustainability theming
- **Interactive Tables**: Sortable action tables with hover effects
- **Toast Notifications**: User-friendly feedback using react-hot-toast
- **Modal Forms**: Elegant popup forms for creating and editing actions
- **Confirmation Dialogs**: Professional confirmation modals for destructive actions

### 🔧 Technical Features
- **RESTful API**: Well-structured Django REST Framework backend
- **HTTP Client**: Axios-powered API calls with automatic error handling and interceptors
- **JSON Database**: File-based data storage with atomic write operations
- **Error Handling**: Comprehensive error handling with detailed server response integration
- **Environment Configuration**: Secure configuration with environment variables
- **CORS Support**: Proper cross-origin resource sharing setup
- **Request/Response Logging**: Automatic API call logging for debugging

## 🏗️ Architecture

### Frontend (React + Vite)
```
src/
├── api/
│   └── actions.js             # Axios configuration and API methods
├── assets/
│   └── react.svg              # React logo asset
├── components/
│   ├── ActionForm.jsx          # Form for creating/editing actions
│   ├── ActionTable.jsx         # Table displaying all actions
│   ├── DeleteActionButton.jsx  # Delete button component
│   └── UpdateActionButton.jsx  # Update button component
├── ActionForm.css             # Form and modal styling
├── ActionTable.css            # Table and button styling
├── main.css                   # Global styles and header
├── App.jsx                     # Main application component
└── main.jsx                   # Application entry point
```

### Backend (Django)
```
myproject/
├── actions/
│   ├── __init__.py            # Python package marker
│   ├── admin.py               # Django admin configuration
│   ├── apps.py                # App configuration
│   ├── jsondb.py              # JSON file database utilities
│   ├── migrations/            # Database migration files
│   │   └── __init__.py
│   ├── models.py              # Data models (currently file-based)
│   ├── serializer.py          # Data serialization/validation (note: singular)
│   ├── tests.py               # Unit tests
│   ├── urls.py                # App URL routing
│   └── views.py               # API endpoints for CRUD operations
├── myproject/
│   ├── __init__.py            # Python package marker
│   ├── asgi.py                # ASGI configuration
│   ├── settings.py            # Django configuration
│   ├── urls.py                # Main URL configuration
│   └── wsgi.py                # WSGI configuration
├── data.json                  # JSON database file (gitignored)
├── db.sqlite3                 # SQLite database (default Django)
└── manage.py                  # Django management script
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **Python** (v3.8+ recommended)
- **npm** or **yarn**
- **pip** (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CarbonSustain
   ```

2. **Set up the frontend**
   ```bash
   # Install dependencies (includes Axios for API calls)
   npm install
   
   # Start development server
   npm run dev
   ```

3. **Set up the backend**
   ```bash
   # Navigate to Django project
   cd myproject
   
   # Create virtual environment (recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install django djangorestframework django-cors-headers
   
   # Generate a Django secret key
   SECRET_KEY=$(python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")
   
   # Create environment file with generated secret key
   echo "DJANGO_SECRET_KEY=$SECRET_KEY" > .env
   echo "DEBUG=True" >> .env
   
   # Alternative: Generate secret key manually (if above doesn't work)
   # python -c "from django.core.management.utils import get_random_secret_key; print('DJANGO_SECRET_KEY=' + get_random_secret_key())" > .env
   # echo "DEBUG=True" >> .env
   
   # Run migrations (if needed)
   python manage.py migrate
   
   # Start Django server
   python manage.py runserver
   ```

### Environment Variables

Create a `.env` file in the `myproject/` directory:

```env
DJANGO_SECRET_KEY=your-generated-secret-key-here
DEBUG=True
```

### 🔐 Django Secret Key Generation

If you need to generate a secret key manually, use one of these methods:

**Method 1: Using Django utility (Recommended)**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Method 2: Using Python secrets**
```bash
python -c "import secrets; print(''.join(secrets.choice('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)') for _ in range(50)))"
```

**Method 3: Online generator**
Visit [djecrety.ir](https://djecrety.ir/) for a Django-compatible secret key generator.

> **⚠️ Security Note**: Never commit your `.env` file to version control. Each developer should generate their own unique secret key.

## 📡 API Integration

### Axios Configuration
The frontend uses Axios for all HTTP requests with centralized configuration:

```javascript
// src/api/actions.js
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Available methods
export const actionsAPI = {
  getAll: () => api.get('/actions/'),
  create: (actionData) => api.post('/actions/', actionData),
  update: (actionId, actionData) => api.put(`/actions/${actionId}/`, actionData),
  delete: (actionId) => api.delete(`/actions/${actionId}/`),
};
```

### API Endpoints
- **GET** `/api/actions/` - Retrieve all actions
- **POST** `/api/actions/` - Create a new action
- **PUT** `/api/actions/{id}/` - Update an existing action
- **DELETE** `/api/actions/{id}/` - Delete an action

### Request/Response Format
```json
{
  "action": "Used public transportation instead of driving",
  "date": "2024-01-15",
  "points": 25,
  "id": "uuid-string"
}
```

### Error Handling
Axios automatically handles HTTP errors and provides detailed error information:
- **4xx errors**: Client-side validation issues
- **5xx errors**: Server-side processing errors
- **Network errors**: Connection timeouts and failures

## 🎨 Styling & Design

### Design System
- **Primary Colors**: Green gradient (#2e7d32 → #4CAF50 → #66bb6a)
- **Typography**: Modern, clean fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Animations**: Subtle hover effects and smooth transitions

### Component Styling
- **Forms**: Modal overlays with backdrop blur
- **Tables**: Hover effects and clean borders
- **Buttons**: Gradient backgrounds with scale animations
- **Icons**: Clean SVG icons using CSS masks

## 🔧 Development

### Frontend Development
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# View API request logs in browser console
# All Axios requests are automatically logged for debugging
```

### Backend Development
```bash
# Run Django development server
python manage.py runserver

# Run with specific port
python manage.py runserver 8001
```

### Code Style
- **Frontend**: ESLint configuration for React
- **Backend**: Django best practices and PEP 8
- **Formatting**: Consistent indentation and naming conventions

## 📦 Dependencies

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **Axios**: HTTP client for API requests
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **React Hot Toast**: Notification system

### Backend
- **Django**: Web framework
- **Django REST Framework**: API development
- **Django CORS Headers**: Cross-origin support

## 🔒 Security Features

- **Environment Variables**: Sensitive configuration externalized
- **CORS Configuration**: Proper cross-origin setup
- **Input Validation**: Both frontend and backend validation
- **Secure File Operations**: Atomic writes to prevent data corruption

## 🚦 Error Handling

### Frontend
- Form validation with inline error messages
- Axios-powered error handling with server response integration
- Loading states with toast notifications and error boundaries
- Automatic request/response logging for debugging

### Backend
- Comprehensive exception handling
- Proper HTTP status codes
- Detailed error responses for debugging