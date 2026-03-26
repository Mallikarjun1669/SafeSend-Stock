# 🚀 SafeSend Stock - Frontend

A modern, professional stock trading platform built with **React**, **Vite**, and **Redux Toolkit**. This frontend application provides a complete user interface for buying/selling stocks, managing portfolios, KYC verification, and admin dashboard features.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Installation & Setup](#installation--setup)
6. [Environment Configuration](#environment-configuration)
7. [Running the Application](#running-the-application)
8. [API Integration](#api-integration)
9. [Pages & Components](#pages--components)
10. [Styling Architecture](#styling-architecture)
11. [State Management](#state-management)
12. [Authentication Flow](#authentication-flow)
13. [User Features](#user-features)
14. [Admin Features](#admin-features)
15. [Component Overview](#component-overview)
16. [Key Implementation Details](#key-implementation-details)
17. [Build & Deployment](#build--deployment)
18. [Project Demo Structure](#project-demo-structure)

---

## 📊 Project Overview

**SafeSend Stock** is a comprehensive web-based stock trading platform with the following capabilities:

- **User Authentication**: Registration and login with JWT token-based auth
- **KYC Verification**: Complete Know-Your-Customer document submission and status tracking
- **Stock Trading**: Real-time buy/sell interface with live price charts
- **Portfolio Management**: View holdings, track market values, and execute trades
- **Watchlist**: Manage favorite stocks for quick access
- **Company Directory**: Browse and explore available companies and stocks
- **Dashboard**: Portfolio overview with recent trades and price charts
- **Admin Panel**: KYC verification and user management capabilities

**Target Users**: Retail investors, traders, and platform administrators

**Design Philosophy**: Professional stock market aesthetic with dark blue theme, white contrast panels, and intuitive navigation

---

## 🛠 Tech Stack

### Core Technologies
- **React** `19.2.0` - UI framework for building interactive components
- **Vite** `8.0.0-beta.13` - Modern build tool with Lightning-fast HMR
- **React Router DOM** `7.13.1` - Client-side routing and navigation
- **Redux Toolkit** `2.11.2` - State management
- **React Redux** `9.2.0` - React bindings for Redux

### API & Data
- **Axios** `1.13.6` - HTTP client with interceptors for authentication

### UI & Styling
- **Bootstrap** `5.3.8` - Responsive component library
- **Lightweight Charts** `5.1.0` - Professional stock price charting
- **Recharts** `3.8.0` - React charting library for dashboard analytics
- **Custom CSS** - Modular CSS files with CSS variables for theming

### Development Tools
- **ESLint** `9.39.1` - Code quality and linting
- **TypeScript Types** - React type definitions included

---

## 📂 Project Structure

```
stock-frontend/
├── src/
│   ├── api/
│   │   └── axiosInstance.js          # Axios HTTP client with JWT interceptors
│   ├── components/
│   │   ├── Navbar.jsx                # Navigation bar with role-based links
│   │   ├── ProtectedRoute.jsx        # Route guard for authenticated pages
│   │   └── LivePriceChart.jsx        # Real-time stock price chart component
│   ├── pages/
│   │   ├── LoginRegisterPage.jsx     # Auth page (login & registration)
│   │   ├── DashboardPage.jsx         # Portfolio dashboard with overview
│   │   ├── Companies.jsx             # Browse & manage companies/stocks
│   │   ├── KycPage.jsx               # KYC profile & document uploads
│   │   ├── Portfolio.jsx             # User's stock holdings
│   │   ├── Watchlist.jsx             # Favorite stocks management
│   │   ├── Trade.jsx                 # Buy/Sell trading interface
│   │   ├── Trades.jsx                # View trade history
│   │   └── admin/
│   │       ├── AdminKyc.jsx          # Approve/reject KYC documents
│   │       └── AdminUsers.jsx        # User management (make admin)
│   ├── store/
│   │   ├── store.js                  # Redux store configuration
│   │   └── authSlice.js              # Auth state management
│   ├── styles/
│   │   ├── theme.css                 # Global theme variables & colors
│   │   ├── dashboard.css             # Dashboard page styles
│   │   ├── companies.css             # Companies page styles
│   │   ├── kyc.css                   # KYC page styles
│   │   ├── portfolio.css             # Portfolio page styles
│   │   ├── watchlist.css             # Watchlist page styles
│   │   ├── trade.css                 # Trade page styles
│   │   ├── auth.css                  # Auth page styles
│   │   └── admin.css                 # Admin pages styles
│   ├── assets/
│   │   └── react.svg                 # React logo
│   ├── App.jsx                       # Main app component with routing
│   ├── App.css                       # App-level styles
│   ├── main.jsx                      # React app entry point
│   └── index.css                     # Global styles
├── public/
│   └── vite.svg                      # Vite logo
├── package.json                       # Dependencies & scripts
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint rules
├── index.html                        # HTML entry point
├── STYLING_COMPLETE.md               # Styling documentation
└── README.md                         # Original Vite template README
```

---

## ✨ Core Features

### 1. **User Authentication**
- Registration with email & password
- Login with JWT token management
- Automatic token refresh on API responses
- Secure logout with state clearing

### 2. **KYC (Know-Your-Customer) Verification**
- Profile information form (Full Name, DOB, Address)
- Multi-document upload (National ID, Pancard, Proof of Address)
- Status tracking (Not Started → Submitted → Approved/Rejected)
- Admin review interface with approval/rejection workflow
- Document management with file type validation

### 3. **Stock Trading**
- **Buy/Sell Interface**: Real-time quote display with quantity input
- **Trade Execution**: Purchase or sell stocks with immediate order processing
- **Smart Dropdown**: Search-based stock selection with autocomplete
- **Trade History**: View all past transactions with timestamps & quantities

### 4. **Portfolio Management**
- View all current holdings with market values
- Real-time quantity and value calculations
- Trading from portfolio page
- Performance tracking per stock

### 5. **Watchlist**
- Add/remove stocks from personal watchlist
- Quick access to favorite stocks
- Search and filter capabilities
- Persistent watchlist storage

### 6. **Dashboard Overview**
- Portfolio summary with total market value
- Recent trades display
- Live price charts using Lightweight Charts
- Key metrics and performance indicators

### 7. **Company Directory**
- Browse all available companies
- View company stock listings
- Display current price and shares outstanding
- Admin stock management (create/update)

### 8. **Admin Dashboard**
- KYC verification queue
- Approve/reject user profiles with notes
- Document review and acceptance
- User promotion to admin role

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** `16+` and **npm** or **yarn**
- **Backend API** running at `http://localhost:5006` or configured in `.env`

### Step 1: Clone & Install Dependencies

```bash
cd stock-frontend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Or use the default (`http://localhost:5006`).

### Step 3: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

---

## ⚙️ Environment Configuration

### Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_API_BASE_URL` | `http://localhost:5006` | Backend API URL |

### .env File Example

```env
VITE_API_BASE_URL=http://localhost:5006
```

> **Note**: Change `VITE_API_BASE_URL` to match your backend server URL. This is used by Axios for all API calls.

---

## 🚀 Running the Application

### Development Mode (with Hot Module Reload)

```bash
npm run dev
```

Opens at `http://localhost:5173` with live reloading.

### Production Build

```bash
npm run build
```

Creates optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build for testing before deployment.

### Code Quality

```bash
npm run lint
```

Runs ESLint to check code quality and identify issues.

---

## 🔌 API Integration

### Axios Instance Configuration

Located in `src/api/axiosInstance.js`:

- **Base URL**: Configured from `VITE_API_BASE_URL` environment variable
- **Request Interceptor**: Automatically attaches JWT token to all requests
- **Response Interceptor**: Handles 401 errors by clearing expired tokens
- **Default Headers**: `Content-Type: application/json`

### Authentication Flow

1. User logs in → Backend returns JWT token
2. Token stored in `localStorage` as `"token"`
3. All API requests automatically include `Authorization: Bearer {token}`
4. Expired token (401 response) triggers logout

### Core API Endpoints

#### **Authentication**
```
POST   /api/auth/register      # User registration
POST   /api/auth/login         # User login
POST   /api/auth/logout        # User logout
```

#### **KYC Management**
```
GET    /api/kyc/me             # Get user's KYC profile
PUT    /api/kyc/profile        # Update KYC profile info
POST   /api/kyc/documents      # Upload document (multipart)
GET    /api/kyc/documents      # Get all user's documents
POST   /api/kyc/submit         # Submit KYC for review
```

#### **Trading**
```
GET    /api/trades/me          # Get user's trade history
POST   /api/trades             # Create new trade (buy/sell)
```

#### **Portfolio**
```
GET    /api/portfolio/me       # Get user's holdings & market value
```

#### **Companies & Stocks**
```
GET    /api/companies          # List all companies
GET    /api/companies/{id}/stocks     # Get company's stocks
POST   /api/companies          # [Admin] Create company
PUT    /api/companies/{name}   # [Admin] Update company stock
```

#### **Watchlist**
```
GET    /api/watchlist          # Get user's watchlist
POST   /api/watchlist          # Add stock to watchlist
DELETE /api/watchlist/{symbol} # Remove from watchlist
```

#### **Admin KYC**
```
GET    /api/admin/kyc?status=&take=        # List KYC profiles
GET    /api/admin/kyc/{profileId}          # Get profile details
POST   /api/admin/kyc/{profileId}/approve  # Approve KYC
POST   /api/admin/kyc/{profileId}/reject   # Reject KYC
GET    /api/admin/kyc/documents/{docId}/download  # Download doc
```

#### **Admin Users**
```
POST   /api/admin/users/{email}/make-admin # Promote user to admin
```

---

## 📄 Pages & Components

### Pages (in `src/pages/`)

#### **LoginRegisterPage.jsx**
- Tab interface for login and registration
- Email/password authentication
- Form validation
- Error handling and user feedback
- Redirects to dashboard on success

#### **DashboardPage.jsx**
- Portfolio summary with total market value
- LivePriceChart component for recent price trends
- Recent trades table showing last 10 transactions
- Key metrics cards

#### **Companies.jsx**
- List all available companies
- Select company to view stocks
- Display stock details (price, shares outstanding)
- Inline trade panel for buying stocks
- [Admin] Create new company form
- [Admin] Update stock price and shares

#### **KycPage.jsx**
- Edit profile: Full Name, Date of Birth, Address, City, Country
- Document upload: National ID, Pancard, Proof of Address
- Document status tracking (Pending, Accepted, Rejected)
- Submit profile for admin review
- Display upload status and validation

#### **Portfolio.jsx**
- View all current holdings
- Display quantity, current price, and total value per stock
- Trade inline from holdings
- Buy/Sell buttons for each position
- Total portfolio statistics

#### **Watchlist.jsx**
- Grid layout of watchlist items
- Search functionality to add stocks
- Autocomplete dropdown for company selection
- Remove stocks from watchlist
- Empty state message

#### **Trade.jsx**
- Buy/Sell toggle interface
- Company/stock search with dropdown
- Quantity input with spinner
- Real-time quote display
- Execute trade button
- Recent trades table below form
- Responsive form layout

#### **Trades.jsx**
- Complete trade history table
- Columns: Date, Symbol, Side (Buy/Sell), Quantity, Price, Total
- Pagination (load more) functionality
- Filter by date range (optional)
- Error handling with detailed messages

#### **AdminKyc.jsx**
- KYC verification queue
- Filter by status (Pending, Submitted, etc.)
- Click to view profile details and documents
- Approve/Reject buttons with optional notes
- Document acceptance/rejection with reason
- Download document capability

#### **AdminUsers.jsx**
- Search users by email
- Promote user to Admin role
- Confirmation before promotion
- Status messages

### Components (in `src/components/`)

#### **Navbar.jsx**
- Responsive Bootstrap navbar
- Navigation links: Dashboard, Companies, Portfolio, Watchlist, Trades
- [Admin] Admin dropdown menu
- User greeting with logout button
- Responsive hamburger menu for mobile
- Role-based link visibility

#### **ProtectedRoute.jsx**
- Wrapper component for authenticated routes
- Checks if user token exists in Redux store
- Redirects unauthenticated users to login
- Enables route protection across app

#### **LivePriceChart.jsx**
- Lightweight Charts library integration
- Displays candlestick price chart
- Real-time data updates
- Responsive container
- Customizable timeframe

---

## 🎨 Styling Architecture

### Design System

**Theme**: Dark blue professional stock market aesthetic
- **Primary Background**: Dark blue gradient (#1a2a4b → #0f1b2e)
- **Panel Background**: White (#ffffff) for contrast
- **Accent Colors**: 
  - Purple (#7c5cff) for highlights
  - Green (#22c55e) for positive/buy actions
  - Blue (#3b82f6) for information
  - Red (#ef4444) for negative/sell actions

### CSS Architecture

Located in `src/styles/`:

#### **theme.css** (Global Variables)
- 25+ CSS custom properties for consistency
- Color palette, shadows, typography
- Spacing variables (gap, margin, padding standards)
- Transitions and animations
- Mobile breakpoints (768px)

#### **Page-Specific CSS Files**
Each page has its own CSS file for maintainability:
- `dashboard.css` - Dashboard cards, tables, stats
- `companies.css` - Company list, stock tables, forms
- `kyc.css` - Profile forms, document upload, status badges
- `portfolio.css` - Holdings tables, statistics
- `watchlist.css` - Card grid, search interface
- `trade.css` - Trade form, dropdown positioning, quote display
- `auth.css` - Login/register form styling
- `admin.css` - Admin panels and management interfaces

#### **Container Pattern**
All page containers follow consistent pattern:
```css
.page-container {
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, var(--app-bg) 0%, var(--app-bg-secondary) 100%);
  display: flex;
  flex-direction: column;
}
```

### Responsive Design

- **Mobile First**: Base styles for mobile devices
- **Tablet/Desktop**: Media query at 768px breakpoint
- **Flexible Layouts**: Flexbox and CSS Grid for responsiveness
- **Bootstrap Integration**: Used for form controls and utilities

### CSS Variables Available

```css
/* Colors */
--app-bg                    /* Dark blue primary */
--app-bg-secondary          /* Dark blue secondary */
--panel-bg                  /* White panels */
--text                      /* Dark text */
--text-light                /* Light gray text */
--accent-purple             /* #7c5cff */
--accent-green              /* #22c55e */
--accent-blue               /* #3b82f6 */
--accent-red                /* #ef4444 */

/* Shadows */
--shadow                    /* Standard shadow */
--shadow-sm                 /* Small shadow */
--shadow-lg                 /* Large shadow */

/* Other */
--border-radius             /* Component border radius */
--transition                /* Animation duration */
```

---

## 🔄 State Management

### Redux Store

Located in `src/store/`:

#### **store.js**
- Redux store configuration using Redux Toolkit
- Combines auth slice reducer
- Provides store to React app via Redux Provider

#### **authSlice.js**
Key Features:
- **State Shape**: `{ token, user, roles, loading, error }`
- **JWT Decoding**: Extracts claims from token without library
- **Role Extraction**: Supports multiple role claim formats (handles ASP.NET standard claims)
- **Persistence**: Retrieves token from localStorage on app load
- **Actions**:
  - `loginStart()` - Sets loading = true
  - `loginSuccess(payload)` - Stores token and parses roles
  - `loginFailure(error)` - Stores error message
  - `logout()` - Clears token and auth state

### Redux Usage in Components

```javascript
// Example: Get auth state
const token = useSelector(s => s.auth.token);
const roles = useSelector(s => s.auth.roles);
const isAdmin = roles.includes("Admin");

// Example: Dispatch actions
const dispatch = useDispatch();
dispatch(loginSuccess(token));
dispatch(logout());
```

---

## 🔐 Authentication Flow

### 1. **Registration**
```
User fills form → POST /api/auth/register → Login prompt
```

### 2. **Login**
```
Email + Password → POST /api/auth/login → Backend returns JWT
→ Store JWT in localStorage
→ Decode JWT to extract roles
→ Dispatch loginSuccess(token)
→ Redirect to /dashboard
```

### 3. **Protected Routes**
```
User navigates to protected page
→ ProtectedRoute checks token in Redux store
→ If no token → Redirect to /login
→ If token exists → Render page
```

### 4. **API Requests**
```
All requests → Axios interceptor adds Authorization header
→ If 401 response → Clear token
→ Dispatch logout()
→ Redirect to /login
```

### 5. **Logout**
```
User clicks logout
→ Dispatch logout() (clears Redux state)
→ Clear localStorage token
→ Redirect to /login
```

---

## 👥 User Features

### Registration & Login
- Create account with email and password
- Login with credentials
- Token-based session management
- Automatic redirect to dashboard

### KYC Verification
- **Step 1**: Complete profile information
  - Full Name, Date of Birth, Address
  - City, Country (2-letter code)
  - Save and edit profile

- **Step 2**: Upload required documents
  - National ID
  - Pancard
  - Proof of Address
  - File type validation (jpg, png, pdf)
  - Max file size: 10MB

- **Step 3**: Submit for review
  - Status: Not Started → Submitted → Approved/Rejected
  - View rejection reasons if rejected
  - Resubmit after corrections

### Trading
- **Buy Stocks**
  - Search for company/stock
  - Enter quantity
  - Execute purchase
  - Real-time order confirmation

- **Sell Stocks**
  - Select from existing holdings
  - Enter quantity to sell
  - Execute sale
  - Proceeds credited to account

### Portfolio Management
- View all current holdings
- See current price per share
- Total value per stock (quantity × price)
- Total portfolio value
- Execute trades from holdings

### Watchlist Management
- Add stocks to personal watchlist
- Quick access to favorites
- Remove stocks anytime
- Search to add new stocks

### Dashboard
- Portfolio overview and summary
- Recent 10 trades display
- Live price charts
- Key performance metrics

---

## 🛡️ Admin Features

### Admin Access
- Users with "Admin" role see admin menu
- Admin menu dropdown in navbar
- Special admin pages under `/admin/*`

### KYC Verification Queue
- View all pending KYC profiles
- Filter by status (Pending, Submitted, Approved, Rejected)
- Click profile to view details
- Review uploaded documents

### KYC Approval/Rejection
- View each document (National ID, Pancard, Proof of Address)
- Accept or reject individual documents with optional reason
- Approve or reject entire profile with overall note
- Download documents for review
- Update decision comments

### User Management
- Search users by email
- Promote user to Admin role
- Grant admin privileges
- Confirmation before changes

---

## 🧩 Component Overview

### Component Hierarchy

```
App
├── Routes
│   ├── /login → LoginRegisterPage
│   └── Protected Routes (wrapped in Shell)
│       ├── /dashboard → Shell
│       │   └── DashboardPage
│       │       └── LivePriceChart
│       ├── /companies → Shell
│       │   └── Companies
│       ├── /kyc → Shell
│       │   └── KycPage
│       ├── /portfolio → Shell
│       │   └── Portfolio
│       ├── /watchlist → Shell
│       │   └── Watchlist
│       ├── /trade → Trade (has Navbar inside)
│       ├── /trades → Trades (has Navbar inside)
│       ├── /admin/kyc → Shell
│       │   └── AdminKyc
│       └── /admin/users → Shell
│           └── AdminUsers
└── Components
    ├── Navbar (shown in Shell or inside Trade/Trades)
    ├── ProtectedRoute (guards authenticated pages)
    └── LivePriceChart (dashboard chart)
```

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Axios API Call (with JWT)
    ↓
Backend API Response
    ↓
Update Component State (useState)
    ↓
Update Redux Store (if auth-related)
    ↓
Re-render Component
```

---

## 🔧 Key Implementation Details

### 1. **JWT Token Management**
- Stored in `localStorage` under key `"token"`
- Automatically sent in `Authorization: Bearer {token}` header
- Extracted and decoded to get user roles
- Expires handled by backend (401 response triggers logout)

### 2. **Error Handling**
- Try-catch blocks in all async operations
- Detailed error messages from backend (Problem response format)
- User-friendly error alerts in UI
- Console logging for debugging

### 3. **Form Handling**
- Controlled components using `useState`
- Form validation before submission
- File uploads with `FormData` for multipart requests
- Clear success/error messages

### 4. **Search & Filter**
- Companies search with dropdown
- Watchlist search with autocomplete
- Real-time filtering as user types
- Click outside to close dropdowns

### 5. **Responsive Design**
- Mobile-first approach
- Hamburger menu for navigation on mobile
- Responsive tables (scroll on mobile)
- Grid layouts adapt to screen size

### 6. **Trade Dropdown**
- Inline positioning (not portal)
- Absolute positioning relative to input
- Dropdown appears directly below input
- Close on click outside
- Search as you type functionality

### 7. **Admin Gating**
- Check `roles` array for "Admin" in Redux state
- Show admin links only if user is admin
- Admin pages only accessible to admins
- ProtectedRoute validates authentication

---

## 🏗️ Build & Deployment

### Build Configuration

**Build Tool**: Vite
**Output**: `dist/` folder
**Environment Variables**: Read from `.env` at build time

### Build Commands

```bash
# Development build (with source maps)
npm run dev

# Production build (optimized)
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Deployment Steps

1. **Create `.env` file** with `VITE_API_BASE_URL` pointing to production backend

2. **Build the app**:
   ```bash
   npm run build
   ```

3. **Upload `dist/` folder** to web hosting:
   - AWS S3 + CloudFront
   - Netlify (auto-deployment from git)
   - Vercel
   - Traditional web server

4. **Configure CORS** on backend API to accept frontend domain

5. **Test production build**:
   ```bash
   npm run preview
   ```

### Performance Optimizations
- Vite's fast bundling and module resolution
- React Fast Refresh for instant HMR
- Code splitting per route (lazy loading)
- CSS minification in production
- Asset compression

---

## 🎬 Project Demo Structure

### Demo Flow (Recommended Order)

#### **1. User Authentication (2 min)**
- Navigate to login page
- Show registration form
- Create test account or login
- Demonstrate token storage in localStorage
- Explain JWT role parsing

#### **2. KYC Verification (3 min)**
- Navigate to KYC page
- Show profile form (Full Name, DOB, Address)
- Upload documents (National ID, Pancard, Proof of Address)
- Demonstrate status tracking
- Explain backend validation

#### **3. Dashboard Overview (2 min)**
- Show portfolio summary
- Display recent trades
- Show live price chart
- Explain dashboard components
- Discuss key metrics

#### **4. Companies Directory (2 min)**
- Browse available companies
- Show stock listings
- Display prices and quantities
- Explain company structure
- Show admin create/update forms (if admin user)

#### **5. Trading Interface (3 min)**
- Navigate to Trade page
- Search for stock (show dropdown)
- Enter quantity and execute buy order
- Show order confirmation
- Explain trade execution flow

#### **6. Portfolio Management (2 min)**
- View current holdings
- Show quantities and market values
- Trade directly from holdings
- Demonstrate sell functionality
- Explain portfolio calculations

#### **7. Watchlist (2 min)**
- Add stocks to watchlist
- Show watchlist grid layout
- Remove items
- Explain quick access benefits

#### **8. Trade History (1 min)**
- View all past trades
- Show trade details (symbol, side, quantity, price)
- Demonstrate pagination
- Explain trade filtering

#### **9. Admin Panel (2 min)** [if admin user]
- Navigate to Admin → KYC Verification
- View pending KYC profiles
- Show document review interface
- Demonstrate approve/reject workflow
- Show Admin → Users management

#### **10. Responsive Design (1 min)**
- Resize browser to show mobile layout
- Demonstrate hamburger menu
- Show responsive tables and forms
- Explain mobile-first design approach

#### **11. Styling & Theme (1 min)**
- Show dark blue theme with white panels
- Explain CSS variable system
- Demonstrate color scheme
- Show professional stock market aesthetic

---

## 📋 File Reference Guide

| File | Purpose |
|------|---------|
| `src/api/axiosInstance.js` | HTTP client with JWT interceptors |
| `src/components/Navbar.jsx` | Top navigation bar |
| `src/components/ProtectedRoute.jsx` | Route authentication guard |
| `src/components/LivePriceChart.jsx` | Stock price chart component |
| `src/pages/LoginRegisterPage.jsx` | Auth page |
| `src/pages/DashboardPage.jsx` | Portfolio overview |
| `src/pages/Companies.jsx` | Company directory |
| `src/pages/KycPage.jsx` | KYC form and documents |
| `src/pages/Portfolio.jsx` | Holdings management |
| `src/pages/Watchlist.jsx` | Favorite stocks |
| `src/pages/Trade.jsx` | Buy/sell interface |
| `src/pages/Trades.jsx` | Trade history |
| `src/pages/admin/AdminKyc.jsx` | KYC verification |
| `src/pages/admin/AdminUsers.jsx` | User management |
| `src/store/store.js` | Redux store config |
| `src/store/authSlice.js` | Auth state management |
| `src/styles/theme.css` | Global CSS variables |
| `src/styles/*.css` | Page-specific styling |
| `src/App.jsx` | Main app & routing |
| `package.json` | Dependencies & scripts |
| `vite.config.js` | Build configuration |

---

## 🎯 Key Highlights for Demo

### **Architecture & Best Practices**
- ✅ Component-based React architecture
- ✅ Redux Toolkit for state management
- ✅ Protected routes with authentication guard
- ✅ Modular CSS with variables for theming
- ✅ Axios interceptors for token management
- ✅ Error handling and user feedback
- ✅ Responsive mobile-first design

### **Features Implementation**
- ✅ JWT authentication with role-based access
- ✅ Multi-step KYC verification
- ✅ Real-time trading interface
- ✅ Portfolio with market calculations
- ✅ Live price charting
- ✅ Admin approval workflows
- ✅ Document management

### **User Experience**
- ✅ Dark blue professional theme
- ✅ Intuitive navigation
- ✅ Real-time data updates
- ✅ Comprehensive error messages
- ✅ Mobile-responsive design
- ✅ Smooth transitions and animations

### **Code Quality**
- ✅ ESLint configured
- ✅ Consistent naming conventions
- ✅ Well-structured components
- ✅ DRY (Don't Repeat Yourself) principles
- ✅ Clear separation of concerns

---

## 🚦 Getting Started Checklist

- [ ] Install dependencies: `npm install`
- [ ] Create `.env` file with `VITE_API_BASE_URL`
- [ ] Start dev server: `npm run dev`
- [ ] Open `http://localhost:5173`
- [ ] Register a test account
- [ ] Complete KYC verification
- [ ] Test trading functionality
- [ ] Create an admin user (via backend)
- [ ] Test admin features
- [ ] Build production: `npm run build`

---

## 📞 Support & Documentation

- **Backend**: Ensure backend API is running on configured URL
- **Environment**: Set correct `VITE_API_BASE_URL` in `.env`
- **Debugging**: Check browser console and network tab
- **Styling**: Edit CSS files in `src/styles/`
- **Components**: Modify files in `src/components/` and `src/pages/`

---

## 🎉 Conclusion

**SafeSend Stock** is a fully functional stock trading platform with professional UI, comprehensive features, and production-ready architecture. The frontend demonstrates modern React patterns, state management best practices, and responsive design principles.

Perfect for demonstrating your skills in:
- React & Vite development
- Redux state management
- REST API integration
- Authentication & authorization
- Responsive UI design
- Component architecture
- CSS variables and theming

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Production Ready ✅
