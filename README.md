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
- **JSON Database**: File-based data storage with atomic write operations
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Environment Configuration**: Secure configuration with environment variables
- **CORS Support**: Proper cross-origin resource sharing setup

## 🏗️ Architecture

### Frontend (React + Vite)
```
src/
├── components/
│   ├── ActionForm.jsx          # Form for creating/editing actions
│   ├── ActionTable.jsx         # Table displaying all actions
│   └── ConfirmModal.jsx        # Confirmation dialog component
├── styles/
│   ├── ActionForm.css          # Form and modal styling
│   ├── ActionTable.css         # Table and button styling
│   └── main.css               # Global styles and header
├── App.jsx                     # Main application component
└── main.jsx                   # Application entry point
```

### Backend (Django)
```
myproject/
├── actions/
│   ├── views.py               # API endpoints for CRUD operations
│   ├── models.py              # Data models (currently file-based)
│   ├── serializers.py         # Data serialization/validation
│   ├── urls.py                # URL routing
│   └── jsondb.py             # JSON file database utilities
├── myproject/
│   ├── settings.py           # Django configuration
│   └── urls.py              # Main URL configuration
└── data.json                # JSON database file
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
   # Install dependencies
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
   
   # Create environment file
   echo "DJANGO_SECRET_KEY=your-secret-key-here" > .env
   echo "DEBUG=True" >> .env
   
   # Run migrations (if needed)
   python manage.py migrate
   
   # Start Django server
   python manage.py runserver
   ```

### Environment Variables

Create a `.env` file in the `myproject/` directory:

```env
DJANGO_SECRET_KEY=your-super-secret-key-here
DEBUG=True
```

## 📡 API Endpoints

### Actions API
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
- Network error handling with user-friendly messages
- Loading states and error boundaries

### Backend
- Comprehensive exception handling
- Proper HTTP status codes
- Detailed error responses for debugging