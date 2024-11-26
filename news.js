const GNEWS_API_BASE_URL = 'https://gnews.io/api/v4';
const GNEWS_API_KEY = "d7010885156e449d6892c75a4884a42f";

async function handleApiError(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
    }
    return response;
}

async function fetchNews(category = '') {
    try {
        const endpoint = `${GNEWS_API_BASE_URL}/top-headlines?${new URLSearchParams({
            category: category || 'general',
            lang: 'en',
            apikey: GNEWS_API_KEY,
            max: 10
        })}`;

        const response = await fetch(endpoint);
        await handleApiError(response);
        const data = await response.json();
        
        if (!data.articles || !Array.isArray(data.articles)) {
            throw new Error('Invalid response format');
        }

        return data.articles;
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage('Error loading news');
        return [];
    }
}

function showMessage(message, type = 'error') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

const showErrorMessage = (msg) => showMessage(msg, 'error');
const showSuccessMessage = (msg) => showMessage(msg, 'success');

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (token && user) {
        authButtons.innerHTML = `
            <span class="user-email">${user.email}</span>
            <button onclick="logout()">Logout</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button onclick="openModal('login')">Login</button>
            <button onclick="openModal('signup')">Sign Up</button>
        `;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI();
    showSuccessMessage('Successfully logged out!');
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[name="username"]').value;
    const password = this.querySelector('input[name="password"]').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Login failed');

        localStorage.setItem('token', data.token);
        currentUser = { email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        closeModal('login');
        updateAuthUI();
        showSuccessMessage('Successfully logged in!');
    } catch (error) {
        showErrorMessage(error.message);
    }
});

document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[name="email"]').value;
    const password = this.querySelector('input[name="password"]').value;
    const name = this.querySelector('input[name="name"]').value;

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Signup failed');

        localStorage.setItem('token', data.token);
        currentUser = { email, name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        closeModal('signup');
        updateAuthUI();
        showSuccessMessage('Successfully signed up!');
    } catch (error) {
        showErrorMessage(error.message);
    }
});

function openModal(type) {
    document.getElementById(`${type}Modal`).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(type) {
    document.getElementById(`${type}Modal`).classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchModal(type) {
    const currentType = type === 'login' ? 'signup' : 'login';
    closeModal(currentType);
    setTimeout(() => openModal(type), 100);
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function shareArticle(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url,
            text: 'Check out this interesting news article!'
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(url).then(() => {
            showSuccessMessage('Link copied to clipboard!');
        }).catch(() => {
            showErrorMessage('Failed to copy link');
        });
    }
}

function createNewsCard(article) {
    const articleId = btoa(article.url);
    return `
        <div class="news-card">
            <img src="${article.image || 'https://via.placeholder.com/300x200'}" alt="${article.title}">
            <div class="news-content">
                <span class="category">${article.source.name}</span>
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <div class="news-footer">
                    <span class="date">${new Date(article.publishedAt).toLocaleDateString()}</span>
                    <div class="actions">
                        <button onclick="shareArticle('${article.title.replace(/'/g, "\\'")}', '${article.url}')" class="share-btn">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <a href="${article.url}" target="_blank" class="read-more">Read Full Article</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createNewsItem(article) {
    return `
        <div class="news-item">
            <h4>${article.title}</h4>
            <p>${article.description || ''}</p>
            <div class="news-footer">
                <span class="date">${new Date(article.publishedAt).toLocaleDateString()}</span>
                <div class="actions">
                    <button onclick="shareArticle('${article.title.replace(/'/g, "\\'")}', '${article.url}')" class="share-btn">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <a href="${article.url}" target="_blank">Read More</a>
                </div>
            </div>
        </div>
    `;
}

async function populateNews() {
    const featuredNews = document.querySelector('.news-grid');
    const latestNews = document.querySelector('.news-list');
    
    featuredNews.innerHTML = '<div class="loading">Loading...</div>';
    latestNews.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const featuredArticles = await fetchNews('technology');
        if (featuredArticles.length > 0) {
            featuredNews.innerHTML = featuredArticles
                .slice(0, 3)
                .map(createNewsCard)
                .join('');
        } else {
            featuredNews.innerHTML = '<div class="error">No featured news available</div>';
        }
        
        const latestArticles = await fetchNews('general');
        if (latestArticles.length > 0) {
            latestNews.innerHTML = latestArticles
                .slice(0, 5)
                .map(createNewsItem)
                .join('');
        } else {
            latestNews.innerHTML = '<div class="error">No latest news available</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        featuredNews.innerHTML = '<div class="error">Failed to load featured news</div>';
        latestNews.innerHTML = '<div class="error">Failed to load latest news</div>';
    }
}

// Category navigation
const categoryMap = {
    'home': 'general',
    'politics': 'politics',
    'technology': 'technology',
    'sports': 'sports',
    'entertainment': 'entertainment'
};

document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Update active state
        document.querySelector('.nav-items a.active')?.classList.remove('active');
        e.target.classList.add('active');
        
        const category = e.target.textContent.toLowerCase();
        const mappedCategory = categoryMap[category] || 'general';
        
        const newsGrid = document.querySelector('.news-grid');
        newsGrid.innerHTML = '<div class="loading">Loading news...</div>';
        
        try {
            const articles = await fetchNews(mappedCategory);
            if (articles.length > 0) {
                newsGrid.innerHTML = articles
                    .slice(0, 6)
                    .map(createNewsCard)
                    .join('');
            } else {
                newsGrid.innerHTML = '<div class="error">No news available</div>';
            }
        } catch (error) {
            console.error('Error:', error);
            newsGrid.innerHTML = '<div class="error">Failed to load news</div>';
        }
    });
});

// Reading mode functionality
function toggleReadMode() {
    const body = document.body;
    body.classList.toggle('read-mode');
    const isReadMode = body.classList.contains('read-mode');
    localStorage.setItem('readMode', isReadMode);
    updateReadModeIcon();
}

function updateReadModeIcon() {
    const icon = document.querySelector('#readModeToggle i');
    if (icon) {
        const isReadMode = document.body.classList.contains('read-mode');
        icon.className = isReadMode ? 'fas fa-sun' : 'fas fa-book-reader';
    }
}

// Initialize reading mode from localStorage
function initializeReadMode() {
    const isReadMode = localStorage.getItem('readMode') === 'true';
    if (isReadMode) {
        document.body.classList.add('read-mode');
        updateReadModeIcon();
    }
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    populateNews();
    initializeReadMode();
});
