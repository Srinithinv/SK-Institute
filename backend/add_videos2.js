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
  { student_name: 'Sarah Williams', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800' },
  { student_name: 'David Chen', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800' },
  { student_name: 'Emily Davis', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' },
  { student_name: 'James Wilson', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800' }
];

async function run() {
  try {
    for (const v of videos) {
      await pool.query(
        'INSERT INTO content_video_testimonials (student_name, video_url, thumbnail_url) VALUES ($1, $2, $3)',
        [v.student_name, v.video_url, v.thumbnail_url]
      );
    }
    console.log('Added 4 more video testimonials');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
