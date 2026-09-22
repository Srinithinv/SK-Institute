require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'skinstitute',
});

const videos = [
  { title: 'System Design Interview Prep', video_url: 'https://www.youtube.com/embed/bBTPZ9NdSk8', thumbnail_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800', category: 'SYSTEM DESIGN' },
  { title: 'Python for Beginners', video_url: 'https://www.youtube.com/embed/kqtD5dpn9C8', thumbnail_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=800', category: 'PYTHON' },
  { title: 'AWS Certified Cloud Practitioner', video_url: 'https://www.youtube.com/embed/SOTamWNgDKc', thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', category: 'CLOUD' },
  { title: 'Machine Learning Full Course', video_url: 'https://www.youtube.com/embed/GwIo3gDZCVQ', thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', category: 'DATA & AI' }
];

async function run() {
  try {
    for (const v of videos) {
      await pool.query(
        'INSERT INTO content_videos (title, video_url, thumbnail_url, category) VALUES ($1, $2, $3, $4)',
        [v.title, v.video_url, v.thumbnail_url, v.category]
      );
    }
    console.log('Successfully added 4 more videos');
  } catch (err) {
    console.error('Error inserting videos:', err);
  } finally {
    process.exit(0);
  }
}

run();
