const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'skinstitute',
  password: 'sriadi',
  port: 5432,
});

async function exportData() {
  try {
    const data = {};
    
    // Fetch all tables
    const coursesRes = await pool.query('SELECT * FROM content_courses');
    data.courses = coursesRes.rows;
    
    const videosRes = await pool.query('SELECT * FROM content_videos');
    data.videos = videosRes.rows;
    
    const testimonialsRes = await pool.query('SELECT * FROM content_testimonials');
    data.testimonials = testimonialsRes.rows;
    
    const videoTestimonialsRes = await pool.query('SELECT * FROM content_video_testimonials');
    data['video-testimonials'] = videoTestimonialsRes.rows;
    
    const aboutRes = await pool.query('SELECT * FROM content_about LIMIT 1');
    data.about = aboutRes.rows[0] || {};
    
    const founderRes = await pool.query('SELECT * FROM content_founder LIMIT 1');
    data.founder = founderRes.rows[0] || {};
    
    const dir = path.join(__dirname, '../frontend/src/data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    
    fs.writeFileSync(path.join(dir, 'db.json'), JSON.stringify(data, null, 2));
    console.log('Data exported successfully to frontend/src/data/db.json');
    
  } catch (err) {
    console.error('Error exporting data:', err);
  } finally {
    pool.end();
  }
}

exportData();
