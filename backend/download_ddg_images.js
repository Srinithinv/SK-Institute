const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const db = require('./db');

const coursesDir = path.join(__dirname, '../frontend/public/courses');

async function downloadRelevantImages() {
  const activeCategories = [
    'Artificial Intelligence', 
    'Data Science & Analytics', 
    'Machine Learning', 
    'Full Stack Development', 
    'DevOps'
  ];
  
  for (let cat of activeCategories) {
    const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1', [cat]);
    console.log(`Downloading relevant DDG images for ${cat} (${res.rowCount} courses)...`);
    
    for (let row of res.rows) {
      const filename = `rel-ddg-${row.id}.jpg`;
      const filepath = path.join(coursesDir, filename);
      
      const query = `"${row.title}" programming technology course`;
      
      try {
        if (!fs.existsSync(filepath)) {
          // Spawn python script synchronously
          const result = execSync(`python download_one.py "${query}" "${filepath}"`).toString().trim();
          if (result.includes("SUCCESS")) {
            console.log(`Downloaded highly relevant image ${filename} for ${row.title}`);
          } else {
            console.log(`Failed to download for ${row.title}: ${result}`);
            continue;
          }
        }
        await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [`/courses/${filename}`, row.id]);
      } catch (e) {
        console.error(`Error processing ${row.title}`, e.message);
      }
    }
  }
  
  console.log('All incredibly relevant real images downloaded via DuckDuckGo and DB updated!');
  process.exit(0);
}

downloadRelevantImages();
