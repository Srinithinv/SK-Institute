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

async function fetchRelevantImages() {
  const activeCategories = [
    'Artificial Intelligence', 
    'Data Science & Analytics', 
    'Machine Learning', 
    'Full Stack Development', 
    'DevOps'
  ];
  
  for (let cat of activeCategories) {
    const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1', [cat]);
    console.log(`Downloading relevant images for ${cat} (${res.rowCount} courses)...`);
    
    for (let row of res.rows) {
      const filename = `relevant-${row.id}.jpg`;
      const filepath = path.join(coursesDir, filename);
      
      // We will use loremflickr with highly relevant tags: technology, software, code, data
      // Using lock ensures it's deterministic but unique for each course ID
      // This will pull actual technology-related photography
      let keywords = 'technology,software,coding';
      if (cat.includes('Data') || cat.includes('Machine')) keywords = 'data,analytics,technology';
      if (cat.includes('Intelligence')) keywords = 'ai,technology,robotics';
      
      const url = `https://loremflickr.com/800/600/${keywords}/all?lock=${row.id + 500}`;
      
      try {
        if (!fs.existsSync(filepath)) {
          await downloadImage(url, filepath);
          console.log(`Downloaded highly relevant image ${filename} for ${row.title}`);
        }
        await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [`/courses/${filename}`, row.id]);
      } catch (e) {
        console.error(`Failed to download for ${row.title}`, e);
      }
    }
  }
  
  console.log('All incredibly relevant real images downloaded and DB updated!');
  process.exit(0);
}

fetchRelevantImages();
