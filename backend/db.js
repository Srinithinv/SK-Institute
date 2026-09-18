const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Create Leads table
    db.run(`CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      course TEXT NOT NULL,
      source TEXT NOT NULL,
      status TEXT DEFAULT 'New',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create Users table (for Admins)
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`, (err) => {
      if (!err) {
        seedAdminUser();
      }
    });
  });
}

function seedAdminUser() {
  // Check if admin user exists
  db.get("SELECT * FROM users WHERE email = ?", ['admin@skinstitute.com'], (err, row) => {
    if (err) return console.error(err.message);
    if (!row) {
      // Create default admin user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('admin123', salt);
      
      db.run("INSERT INTO users (email, password) VALUES (?, ?)", ['admin@skinstitute.com', hash], (err) => {
        if (err) console.error('Error seeding admin user:', err.message);
        else console.log('Default admin user created: admin@skinstitute.com / admin123');
      });
    }
  });
}

module.exports = db;
