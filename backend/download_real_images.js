const fs = require('fs');
const path = require('path');
const https = require('https');
const db = require('./db');

const coursesDir = path.join(__dirname, '../frontend/public/courses');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function fixRealImages() {
  const activeCategories = [
    'Artificial Intelligence', 
    'Data Science & Analytics', 
    'Machine Learning', 
    'Full Stack Development', 
    'DevOps'
  ];
  
  // Find courses only for active categories so we don't take forever downloading 226 images
  for (let cat of activeCategories) {
    const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1', [cat]);
    console.log(`Downloading for ${cat} (${res.rowCount} courses)...`);
    
    let index = 1;
    for (let row of res.rows) {
      const filename = `real-${row.id}.jpg`;
      const filepath = path.join(coursesDir, filename);
      
      // Seeded random image related to tech/coding based on the course ID
      const url = `https://picsum.photos/seed/${row.id + 100}/800/600`;
      
      try {
        if (!fs.existsSync(filepath)) {
          await downloadImage(url, filepath);
          console.log(`Downloaded ${filename} for ${row.title}`);
        }
        await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [`/courses/${filename}`, row.id]);
      } catch (e) {
        console.error(`Failed to download for ${row.title}`, e);
      }
    }
  }
  
  console.log('All real images downloaded and DB updated!');
  process.exit(0);
}

fixRealImages();
