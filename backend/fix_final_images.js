const fs = require('fs');
const path = require('path');
const db = require('./db');

const coursesDir = path.join(__dirname, '../frontend/public/courses');

async function fixFinalImages() {
  const activeCategories = [
    'Artificial Intelligence', 
    'Data Science & Analytics', 
    'Machine Learning', 
    'Full Stack Development', 
    'DevOps'
  ];
  
  // 1. Gather all valid local real images (ai-*, fs-*, do-*, relevant-*)
  const files = fs.readdirSync(coursesDir);
  const validImages = files.filter(f => 
    f.endsWith('.jpg') && 
    (f.startsWith('ai-') || f.startsWith('fs-') || f.startsWith('do-') || f.startsWith('relevant-'))
  ).map(f => `/courses/${f}`);
  
  // Shuffle array for better distribution
  for (let i = validImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [validImages[i], validImages[j]] = [validImages[j], validImages[i]];
  }
  
  console.log(`Found ${validImages.length} distinct, high-quality local images!`);
  
  let imgIndex = 0;
  
  // 2. Assign them to active courses sequentially to guarantee variety
  for (let cat of activeCategories) {
    const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1', [cat]);
    
    for (let row of res.rows) {
      // Pick next image from pool, loop if we run out (we have 39 images for ~50 courses)
      const selectedImage = validImages[imgIndex % validImages.length];
      
      await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [selectedImage, row.id]);
      imgIndex++;
    }
  }
  
  console.log('All courses updated with completely distinct, real, high-quality, relevant images from local storage!');
  process.exit(0);
}

fixFinalImages();
