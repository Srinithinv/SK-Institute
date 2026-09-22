require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'skinstitute',
});

const coursesUpdate = [
  {
    title: "Full Stack Development",
    category: "DEVELOPMENT",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Data Science & Analytics",
    category: "DATA & AI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Cloud Computing & DevOps",
    category: "CLOUD",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Java Enterprise Development",
    category: "DEVELOPMENT",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI & Machine Learning",
    category: "DATA & AI",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "MERN Stack Engineering",
    category: "DEVELOPMENT",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Cloud Security Engineering",
    category: "SECURITY",
    image: "https://images.unsplash.com/photo-1432888117320-22165089280f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Python Backend Development",
    category: "DEVELOPMENT",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800",
  }
];

async function run() {
  for (const c of coursesUpdate) {
    await pool.query(
      'UPDATE content_courses SET image_url=$1, category=$2 WHERE title=$3',
      [c.image, c.category, c.title]
    );
  }
  console.log('Courses updated with images and categories');
  process.exit();
}

run();
