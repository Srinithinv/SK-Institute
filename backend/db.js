require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'skinstitute',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

async function initializeDatabase() {
  try {
    const client = await pool.connect();
    
    // Create Leads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(255) PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        course VARCHAR(255) NOT NULL,
        source VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'New',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Users table (for Admins)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    client.release();
    console.log('PostgreSQL Database connected and initialized.');
    
    seedAdminUser();
  } catch (err) {
    console.error('Error initializing PostgreSQL database:', err.message);
    console.error('Did you forget to start PostgreSQL or create the "skinstitute" database?');
  }
}

async function seedAdminUser() {
  try {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", ['admin@skinstitute.com']);
    
    if (res.rows.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('admin123', salt);
      
      await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", ['admin@skinstitute.com', hash]);
      console.log('Default admin user created: admin@skinstitute.com / admin123');
    }
  } catch (err) {
    console.error('Error seeding admin user:', err.message);
  }
}

initializeDatabase();

module.exports = pool;
