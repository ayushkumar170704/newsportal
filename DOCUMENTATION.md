# News Portal - A Beginner's Guide

## Understanding the Basics

### What is this News Portal?
Our News Portal is like a digital newspaper that shows news from different categories (like sports, politics, etc.). Users can:
- Read news in English or Hindi
- Create their own account
- Switch to a comfortable reading mode
- Browse different news categories

### Technologies We're Using
Let's break down the main technologies:

1. **Frontend** (What users see):
   - HTML: Creates the structure of our pages
   - CSS: Makes everything look nice and pretty
   - JavaScript: Makes the website interactive

2. **Backend** (Behind the scenes):
   - Node.js: Runs our server
   - Express.js: Helps manage our server routes
   - MongoDB: Stores our user data

3. **External Services**:
   - GNews API: Provides us with real news articles

## How Everything Works Together

### 1. Database Setup (MongoDB)

#### What is MongoDB?
Think of MongoDB as a digital filing cabinet where we store all our user information. It's like having a bunch of folders (collections) with documents inside them.

#### How We Connect to MongoDB
```javascript
// This is how we connect to our MongoDB database
mongoose.connect('mongodb://localhost:27017/newsportal')
```
This is like plugging in a cable between our application and the database. We use something called "mongoose" which makes it easier to work with MongoDB.

#### Storing User Information
When someone creates an account, we need to store their information. Here's how we organize it:

```javascript
// This is like creating a form template for user information
const userSchema = {
    name: String,          // User's name
    email: String,         // User's email
    password: String,      // User's password (safely encrypted)
    lastLogin: Date        // When they last used the app
}
```

### 2. User Authentication (Login System)

#### What is Authentication?
Authentication is like having a security guard at a building. It makes sure that:
1. Only registered users can log in
2. Passwords are kept safe
3. Users can only access their own information

#### The Registration Process
When a new user signs up:
1. They fill out the registration form
2. We check if their email is already registered
3. We secure their password (like putting it in a safe)
4. We create their account
5. We give them a special access pass (JWT token)

Here's a simple explanation of the process:
```javascript
// When someone tries to register:
1. Check if all information is provided
2. Make sure the email isn't already used
3. Secure the password
4. Create new user account
5. Give them their access pass (token)
```

#### The Login Process
When a user logs in:
1. They enter their email and password
2. We check if their email exists
3. We verify their password
4. If everything matches, we give them a new access pass (token)

### 3. Security Measures

#### Password Protection
We don't store actual passwords. Instead:
1. We scramble the password (hash it) before saving
2. When users log in, we compare the scrambled versions
3. Even we can't see the actual passwords

Think of it like turning a word into a unique fingerprint - you can't get the word back from the fingerprint, but you can check if it matches.

#### Access Tokens (JWT)
JWT (JSON Web Token) is like a special ID card that:
1. Proves who the user is
2. Has an expiration date (24 hours)
3. Can't be faked or changed

### 4. Multilingual Support

#### How Language Selection Works
We support English and Hindi by:
1. Having two sets of text for everything
2. Letting users switch between languages
3. Remembering their language preference

Example of our translations:
```javascript
// We store text in both languages
English: "Welcome"
Hindi: "स्वागत है"
```

### 5. News Display System

#### Getting News Articles
1. We connect to the GNews API
2. Request news based on:
   - Selected category
   - Chosen language
   - What's most recent

#### Displaying News
1. We get the news articles
2. Format them nicely
3. Show them in either:
   - Featured news section
   - Latest news section

### 6. Read Mode Feature

#### What is Read Mode?
Read Mode makes articles easier to read by:
1. Using a larger font size
2. Adding more space between lines
3. Using a comfortable background color
4. Centering the content

## User Interface Features

### Reading Mode
The application includes an eye-friendly reading mode designed to enhance readability and reduce eye strain:

#### Implementation
- Toggle button in navigation bar with Font Awesome book reader icon
- CSS variables for consistent theming:
  ```css
  --background-color: #f5e6d3;
  --text-color: #2d2d2d;
  --primary-color: #5c4d3c;
  ```
- Typography optimizations:
  - Georgia font for better readability
  - Increased line height (1.8)
  - Optimized font sizes
- Local storage persistence for user preference

#### Usage
Users can toggle reading mode by:
1. Clicking the book reader icon in the navigation bar
2. The preference is automatically saved
3. Reading mode state persists across sessions

#### Technical Details
- CSS class `.read-mode` applied to body element
- Font Awesome 6.4.0 for icons
- LocalStorage key: 'readMode' (boolean)

## Common Questions and Solutions

### "Why do I need to log in?"
Logging in helps us:
1. Keep your preferences saved
2. Protect your information
3. Provide a personalized experience

### "How is my password kept safe?"
Your password is protected by:
1. Never storing the actual password
2. Using strong encryption
3. Secure transmission (HTTPS)

### "What happens if I forget my password?"
We have a password reset process:
1. Click "Forgot Password"
2. Enter your email
3. Get a reset link
4. Create a new password

## Deployment Guide

### Free Deployment Options

#### Backend Deployment (Render)
1. Create a free account on [Render](https://render.com)
2. Create a new Web Service:
   - Connect your GitHub repository
   - Select the branch to deploy
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Choose free instance type

3. Set up environment variables in Render:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GNEWS_API_KEY=your_gnews_api_key
   ```

4. Database Setup:
   - Create a free MongoDB database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Use the connection string in your Render environment variables

#### Frontend Deployment (GitHub Pages)
1. Create a new repository on GitHub
2. Modify the frontend code to use the Render backend URL:
   ```javascript
   // Update API_BASE_URL in news.js
   const API_BASE_URL = 'https://your-render-app.onrender.com';
   ```

3. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Select branch to deploy
   - Set folder to root (/)

#### Alternative Free Hosting Options
1. **Netlify**:
   - Similar to GitHub Pages but with more features
   - Automatic builds from Git
   - Free SSL certificates

2. **Railway**:
   - Alternative to Render
   - Offers free tier for backend hosting
   - Easy MongoDB integration

3. **Vercel**:
   - Great for frontend deployment
   - Automatic builds and deployments
   - Free SSL certificates

### Deployment Steps

1. **Prepare Your Application**:
   ```bash
   # Update package.json
   npm init -y
   npm install compression helmet cors
   ```

2. **Optimize for Production**:
   - Enable GZIP compression
   - Add security headers
   - Configure CORS properly

3. **Set Up CI/CD**:
   - Create `.github/workflows/deploy.yml` for automated deployment
   - Configure build and test steps

4. **Monitor Your Application**:
   - Use free tier of [UptimeRobot](https://uptimerobot.com) for monitoring
   - Set up basic error logging

### Post-Deployment Checklist
- [ ] Test all API endpoints
- [ ] Verify database connections
- [ ] Check CORS configuration
- [ ] Test user authentication
- [ ] Verify environment variables
- [ ] Test multilingual support
- [ ] Check reading mode functionality

## Setting Up the Project

### Step 1: Installation
1. Install Node.js from nodejs.org
2. Install MongoDB from mongodb.com
3. Download the project files

### Step 2: Configuration
Create a `.env` file with:
```env
MONGODB_URI=mongodb://localhost:27017/newsportal
JWT_SECRET=your_secret_key
PORT=5000
```

### Step 3: Running the Project
1. Open terminal in project folder
2. Run `npm install`
3. Run `npm start`
4. Open browser to `http://localhost:5000`

## Troubleshooting Common Issues

### Can't Connect to Database?
1. Check if MongoDB is running
2. Verify database URL
3. Check network connection

### Login Not Working?
1. Verify email and password
2. Clear browser cache
3. Check if server is running

### News Not Loading?
1. Check internet connection
2. Verify API key
3. Try refreshing the page

## System Architecture

### Overview
NewsPortal is built on a modern web stack using:
- Frontend: Vanilla JavaScript
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- News API: GNews

### Key Components
1. **Frontend Layer**
   - Static HTML/CSS/JS
   - Client-side routing
   - Local storage management
   - API integration

2. **Backend Layer**
   - RESTful API endpoints
   - Authentication middleware
   - Error handling
   - API proxy services

3. **Data Layer**
   - MongoDB collections
   - JWT token management
   - News data caching

## Frontend Components

### HTML Structure
```html
news.html
├── Header
│   ├── Navigation
│   └── Auth buttons
├── Main Content
│   ├── Featured News
│   ├── Latest News
│   └── Category News
└── Footer
```

### JavaScript Modules
1. **Authentication Module**
   - User registration
   - Login/logout
   - Token management
   - Session handling

2. **News Module**
   - News fetching
   - Category filtering
   - Share functionality
   - Reading mode

3. **UI Module**
   - Dynamic rendering
   - Error handling
   - Loading states
   - Responsive design

## Backend Services

### Express Server
- Route handling
- Middleware configuration
- Error management
- API integration

### Authentication Service
```javascript
// JWT token generation
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};
```

### News Service
- GNews API integration
- Category mapping
- Error handling
- Response formatting

## Database Schema

### User Collection
```javascript
{
    name: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
}
```

## API Documentation

### Authentication Endpoints

#### POST /api/signup
```javascript
Request:
{
    "name": "string",
    "email": "string",
    "password": "string"
}

Response:
{
    "token": "string",
    "user": {
        "id": "string",
        "name": "string",
        "email": "string"
    }
}
```

#### POST /api/login
```javascript
Request:
{
    "email": "string",
    "password": "string"
}

Response:
{
    "token": "string",
    "user": {
        "id": "string",
        "name": "string",
        "email": "string"
    }
}
```

### News Endpoints

#### GET /api/news
```javascript
Response:
{
    "articles": [
        {
            "title": "string",
            "description": "string",
            "url": "string",
            "image": "string",
            "publishedAt": "string",
            "source": {
                "name": "string",
                "url": "string"
            }
        }
    ]
}
```

## Authentication Flow

1. **Registration Flow**
   ```mermaid
   graph LR
   A[User Input] --> B[Validation]
   B --> C[Hash Password]
   C --> D[Save to DB]
   D --> E[Generate JWT]
   E --> F[Return Token]
   ```

2. **Login Flow**
   ```mermaid
   graph LR
   A[User Input] --> B[Validate Credentials]
   B --> C[Check Password]
   C --> D[Generate JWT]
   D --> E[Return Token]
   ```

## Deployment Guide

### Prerequisites
1. Node.js environment
2. MongoDB instance
3. GNews API key

### Environment Setup
```bash
# .env file
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
GNEWS_API_KEY=your_gnews_api_key
```

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Deployment

#### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Configure environment variables
4. Deploy

#### Frontend (GitHub Pages)
1. Update API endpoints
2. Enable GitHub Pages
3. Configure custom domain (optional)

### MongoDB Atlas Setup
1. Create cluster
2. Configure network access
3. Create database user
4. Get connection string

## Security Considerations

### JWT Implementation
- Token expiration
- Secure storage
- HTTPS only
- XSS protection

### Password Security
- Bcrypt hashing
- Salt rounds configuration
- Minimum requirements

### API Security
- Rate limiting
- CORS configuration
- Input validation
- Error sanitization

## Performance Optimization

### Frontend
1. Code splitting
2. Asset optimization
3. Caching strategy
4. Lazy loading

### Backend
1. Database indexing
2. Response compression
3. Cache implementation
4. Error handling

## Testing Guide

### Unit Tests
```bash
# Run tests
npm test

# Coverage report
npm run test:coverage
```

### API Tests
Use Postman or similar tools to test endpoints:
1. Authentication flow
2. News retrieval
3. Error handling
4. Edge cases

## Troubleshooting

### Common Issues

1. **MongoDB Connection**
   ```bash
   # Check MongoDB status
   mongod --version
   ```

2. **JWT Errors**
   - Verify secret key
   - Check token expiration
   - Validate payload

3. **API Issues**
   - Verify API key
   - Check rate limits
   - Validate endpoints

## Maintenance

### Regular Tasks
1. Update dependencies
2. Monitor error logs
3. Database backups
4. Security updates

### Monitoring
1. Server health
2. API response times
3. Error rates
4. User metrics
