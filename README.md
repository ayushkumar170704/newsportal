# 📰 NewsPortal -

A modern, responsive news portal built with vanilla JavaScript, featuring real-time news updates, user authentication, and an eye-friendly reading mode.

## 🌟 Features

- **Real-time News Updates**
  - Integration with GNews API
  - Category-based news filtering
  - Featured and latest news sections
  - Dynamic news card layout

- **User Authentication**
  - Secure JWT-based authentication
  - User signup and login
  - Token-based session management
  - Secure password handling

- **Enhanced Reading Experience**
  - Eye-friendly reading mode
  - Responsive design
  - Share functionality
  - Dynamic content loading

- **Modern UI/UX**
  - Clean, minimalist design
  - Smooth transitions
  - Loading states
  - Error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- GNews API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/newsportal.git
cd newsportal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GNEWS_API_KEY=your_gnews_api_key
```

4. Start the server:
```bash
npm start
```

5. Open `news.html` in your browser

## 🛠️ Technologies Used

### Frontend
- Vanilla JavaScript
- HTML5/CSS3
- Font Awesome Icons
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### APIs
- GNews API for news content
- Custom REST API for authentication

## 📦 Project Structure

```
newsportal/
├── server.js          # Express server setup
├── news.html         # Main HTML file
├── news.js          # Frontend JavaScript
├── news.css         # Styles
├── .env             # Environment variables
└── README.md        # Documentation
```

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Secure HTTP headers
- Input validation
- XSS protection

## 🎨 UI Features

- Responsive design
- Dark/Light mode toggle
- Loading states
- Error messages
- Share functionality
- Category navigation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔄 API Endpoints

### Authentication
- POST `/api/signup` - User registration
- POST `/api/login` - User login

### News
- GET `/api/news` - Fetch news articles
- GET `/api/news/:category` - Category-based news

## 🚧 Future Enhancements

1. Password reset functionality
2. Social media login
3. User preferences
4. Advanced news filtering
5. Offline support
6. Push notifications

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- GNews API for news content
- Font Awesome for icons
- MongoDB for database
- Express.js community
