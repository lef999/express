const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to check working hours (Monday-Friday, 9 AM - 5 PM)
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = date.getHours(); // 0 to 23

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to the requested route
    } else {
        res.send("<h1>Sorry, the website is only available from Monday to Friday, 9 AM to 5 PM.</h1>");
    }
};

// Apply middleware
app.use(workingHoursMiddleware);

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'views', 'services.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
