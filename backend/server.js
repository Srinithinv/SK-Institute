const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'super_secret_jwt_key_123'; // In production, use env variable

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ----------------------
// Auth Routes
// ----------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, email: user.email });
  });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ----------------------
// Leads Routes
// ----------------------
app.post('/api/leads', (req, res) => {
  const { firstName, lastName, email, phone, course, source } = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2); // Simple unique ID
  const createdAt = new Date().toISOString();

  const sql = `INSERT INTO leads (id, firstName, lastName, email, phone, course, source, createdAt) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [id, firstName, lastName, email, phone, course, source, createdAt], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create lead' });
    }
    res.status(201).json({ id, message: 'Lead created successfully' });
  });
});

app.get('/api/leads', authenticateToken, (req, res) => {
  db.all("SELECT * FROM leads ORDER BY createdAt DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
