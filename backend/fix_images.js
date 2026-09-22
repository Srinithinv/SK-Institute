const fs = require('fs');
const path = require('path');
const db = require('./db');

const coursesDir = path.join(__dirname, '../frontend/public/courses');
const templateImg = path.join(coursesDir, 'fs-1.jpg');
const templateImg2 = path.join(coursesDir, 'fs-3.jpg');

// Generate local files for Data Science so images aren't missing
for (let i = 1; i <= 8; i++) {
  const dest = path.join(coursesDir, `ds-${i}.jpg`);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(i % 2 === 0 ? templateImg2 : templateImg, dest);
  }
}

async function fixDB() {
  const aiCourses = [
    { title: "Artificial Intelligence", img: "/courses/ai-1.jpg" },
    { title: "Generative AI", img: "/courses/ai-2.jpg" },
    { title: "AI Engineering", img: "/courses/ai-3.jpg" },
    { title: "Generative AI with LLMs", img: "/courses/ai-4.jpg" },
    { title: "Prompt Engineering", img: "/courses/ai-5.jpg" },
    { title: "AI Agents & Agentic AI", img: "/courses/ai-6.jpg" },
    { title: "Large Language Models", img: "/courses/ai-7.jpg" },
    { title: "Natural Language Processing", img: "/courses/ai-8.jpg" },
    { title: "Computer Vision", img: "/courses/ai-9.jpg" },
    { title: "Deep Learning", img: "/courses/ai-10.jpg" },
    { title: "Applied AI with Python", img: "/courses/ai-11.jpg" }
  ];

  for (let c of aiCourses) {
    await db.query('UPDATE content_courses SET image_url = $1 WHERE title = $2', [c.img, c.title]);
  }
  
  // Also ensure category is exactly "Artificial Intelligence" instead of "DATA & AI"
  await db.query(`UPDATE content_courses SET category = 'Artificial Intelligence' WHERE title IN (
    'Artificial Intelligence', 'Generative AI', 'AI Engineering', 'Generative AI with LLMs', 
    'Prompt Engineering', 'AI Agents & Agentic AI', 'Large Language Models', 'Natural Language Processing', 
    'Computer Vision', 'Deep Learning', 'Applied AI with Python'
  )`);
  
  console.log('Fixed DB image URLs and Categories');
  process.exit(0);
}

fixDB();
