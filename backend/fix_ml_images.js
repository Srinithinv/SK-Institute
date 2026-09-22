const db = require('./db');
const fs = require('fs');
const path = require('path');

async function fixMlImages() {
  const category = 'Machine Learning';
  const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1 ORDER BY id', [category]);
  
  console.log(`Found ${res.rowCount} courses for ML`);
  
  const coursesDir = path.join(__dirname, '../frontend/public/courses');
  const files = fs.readdirSync(coursesDir);
  const mlImages = files.filter(f => f.startsWith('ml_') && f.endsWith('.jpg')).sort();
  
  console.log(`Found ${mlImages.length} generated ml_*.jpg images`);
  
  let i = 0;
  for (let row of res.rows) {
    const imgName = mlImages[i % mlImages.length];
    console.log(`Updating ${row.title} to use /courses/${imgName}`);
    await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [`/courses/${imgName}`, row.id]);
    i++;
  }
  
  console.log('Done!');
  process.exit(0);
}

fixMlImages();
