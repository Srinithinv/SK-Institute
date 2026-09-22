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

    // --- CMS TABLES ---

    // About section
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_about (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        mission TEXT NOT NULL,
        vision TEXT NOT NULL,
        stats_students VARCHAR(50),
        stats_courses VARCHAR(50),
        stats_awards VARCHAR(50)
      )
    `);

    // Founder section
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_founder (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        image_url TEXT
      )
    `);

    // Courses / Services
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        duration VARCHAR(100),
        level VARCHAR(100),
        price VARCHAR(100),
        icon VARCHAR(100)
      )
    `);
    // Add columns if they don't exist
    await client.query(`ALTER TABLE content_courses ADD COLUMN IF NOT EXISTS image_url TEXT;`);
    await client.query(`ALTER TABLE content_courses ADD COLUMN IF NOT EXISTS category VARCHAR(100);`);

    // Live Class Videos
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        video_url TEXT NOT NULL,
        thumbnail_url TEXT,
        category VARCHAR(100)
      )
    `);

    // Text Testimonials
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_testimonials (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        text TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        image_url TEXT
      )
    `);

    // Video Testimonials
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_video_testimonials (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        video_url TEXT NOT NULL,
        thumbnail_url TEXT
      )
    `);

    // Seed singleton tables if empty
    const aboutRes = await client.query("SELECT COUNT(*) FROM content_about");
    if (parseInt(aboutRes.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO content_about (title, description, mission, vision, stats_students, stats_courses, stats_awards)
        VALUES (
          'Welcome to SK Institute',
          'We provide world-class education with practical insights.',
          'To empower students globally.',
          'To be the leading educational platform.',
          '1000+', '50+', '10+'
        )
      `);
    }

    const founderRes = await client.query("SELECT COUNT(*) FROM content_founder");
    if (parseInt(founderRes.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO content_founder (name, title, bio, image_url)
        VALUES (
          'Sriadi',
          'Founder & Lead Instructor',
          'A passionate educator with 10+ years of experience.',
          ''
        )
      `);
    }

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
