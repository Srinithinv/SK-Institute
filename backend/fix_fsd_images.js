const fs = require('fs');
const path = require('path');
const https = require('https');
const db = require('./db');

const unsplashIds = [
  '1498050108023-c5249f4df085',
  '1555066931-4365d14bab8c',
  '1517694712202-14dd9538aa97',
  '1504639725590-34d0984388bd',
  '1461749280684-dccba630e2f6',
  '1516116216624-53e697fedbea',
  '1542831371-29b0f74f9713',
  '1488590528505-98d2b5aba04b',
  '1555099962-4199c345e5dd',
  '1605379399642-870262d3d051',
  '1507721999472-8ed4321c5140'
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }

      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

async function fixFsdImages() {
  const category = 'Full Stack Development';
  const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1 ORDER BY id', [category]);
  console.log(`Found ${res.rowCount} courses for FSD`);
  
  const coursesDir = path.join(__dirname, '../frontend/public/courses');
  if (!fs.existsSync(coursesDir)) {
    fs.mkdirSync(coursesDir, { recursive: true });
  }
  
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows[i];
    const imageId = unsplashIds[i % unsplashIds.length];
    const imgName = `fsd_${i + 1}_${Date.now()}.jpg`;
    const filepath = path.join(coursesDir, imgName);
    
    console.log(`Downloading image for ${row.title}...`);
    const url = `https://images.unsplash.com/photo-${imageId}?w=800&h=500&fit=crop&q=80`;
    
    try {
      await downloadImage(url, filepath);
      const fileStats = fs.statSync(filepath);
      if (fileStats.size < 1000) {
          console.warn(`WARNING: File is too small (${fileStats.size} bytes). Might be broken.`);
      }
      console.log(`Updating ${row.title} to use /courses/${imgName}`);
      await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [`/courses/${imgName}`, row.id]);
    } catch (err) {
      console.error(`Failed to download or update image for ${row.title}:`, err);
    }
  }
  
  console.log('Done fixing FSD images!');
  process.exit(0);
}

fixFsdImages();
