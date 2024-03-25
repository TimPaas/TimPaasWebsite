const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to validate token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

// Route for login
app.post('/login', (req, res) => {
    // Verify credentials
    // Generate token
    const accessToken = jwt.sign({ username: 'user' }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ token: accessToken });
});

// Protected resource
app.get('/protected/resource', authenticateToken, (req, res) => {
    // Access granted, send resource
    res.json({ message: 'Access granted!' });
});

app.get('/', (req, res) => {
    res.send("Hallo wereld!");
});

app.post('/form', (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    res.json({ email: email });
});

app.listen(port, () => console.log(`Data API listening on port ${port}!`));
