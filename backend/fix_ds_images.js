const db = require('./db');
const fs = require('fs');
const path = require('path');

async function fixDsImages() {
  const category = 'Data Science & Analytics';
  const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1 ORDER BY id', [category]);
  
  const coursesDir = path.join(__dirname, '../frontend/public/courses');
  const files = fs.readdirSync(coursesDir);
  
  // Get ONLY the known good images (fs-*, do-*, and maybe ai-*)
  const validImages = [
    '/courses/fs-1.jpg', '/courses/fs-2.jpg', '/courses/fs-3.jpg', '/courses/fs-4.jpg',
    '/courses/do-1.jpg', '/courses/do-3.jpg', '/courses/do-4.jpg',
    '/courses/ai-9.jpg', '/courses/ai-10.jpg', '/courses/ai-11.jpg',
    '/courses/ai-1.jpg', '/courses/ai-2.jpg', '/courses/ai-3.jpg', '/courses/ai-4.jpg'
  ];
  
  console.log(`Found ${res.rowCount} courses for DS`);
  
  let i = 0;
  for (let row of res.rows) {
    const imgName = validImages[i % validImages.length];
    console.log(`Updating ${row.title} to use ${imgName}`);
    await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [imgName, row.id]);
    i++;
  }
  
  console.log('Done!');
  process.exit(0);
}

fixDsImages();
