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
  { title: "React Masterclass", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800", category: "React" },
  { title: "Node.js Basics", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail_url: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800", category: "Node" },
];

const testimonials = [
  { student_name: "John Doe", role: "Frontend Developer at Google", text: "This institute changed my life! The courses are practical and the instructors are amazing.", rating: 5, image_url: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" },
  { student_name: "Jane Smith", role: "Data Scientist at Amazon", text: "The AI and Machine Learning track was incredibly rigorous. I highly recommend it.", rating: 5, image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { student_name: "Raj Patel", role: "Software Engineer at Microsoft", text: "I learned more here in 3 months than in 4 years of college.", rating: 5, image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
];

const videoTestimonials = [
  { student_name: "Alice Johnson", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
  { student_name: "Michael Brown", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
];

async function run() {
  try {
    // Seed videos
    const vidCount = await pool.query('SELECT COUNT(*) FROM content_videos');
    if (parseInt(vidCount.rows[0].count) === 0) {
      for (const v of videos) {
        await pool.query('INSERT INTO content_videos (title, video_url, thumbnail_url, category) VALUES ($1, $2, $3, $4)', [v.title, v.video_url, v.thumbnail_url, v.category]);
      }
      console.log('Seeded videos');
    }

    // Seed testimonials
    const textTestCount = await pool.query('SELECT COUNT(*) FROM content_testimonials');
    if (parseInt(textTestCount.rows[0].count) === 0) {
      for (const t of testimonials) {
        await pool.query('INSERT INTO content_testimonials (student_name, role, text, rating, image_url) VALUES ($1, $2, $3, $4, $5)', [t.student_name, t.role, t.text, t.rating, t.image_url]);
      }
      console.log('Seeded text testimonials');
    }

    // Seed video testimonials
    const videoTestCount = await pool.query('SELECT COUNT(*) FROM content_video_testimonials');
    if (parseInt(videoTestCount.rows[0].count) === 0) {
      for (const vt of videoTestimonials) {
        await pool.query('INSERT INTO content_video_testimonials (student_name, video_url, thumbnail_url) VALUES ($1, $2, $3)', [vt.student_name, vt.video_url, vt.thumbnail_url]);
      }
      console.log('Seeded video testimonials');
    }
  } catch (error) {
    console.error('Error seeding DB:', error);
  } finally {
    process.exit();
  }
}

run();
