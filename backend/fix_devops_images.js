const fs = require('fs');
const path = require('path');
const https = require('https');
const db = require('./db');

const unsplashIds = [
  '1558494949-ef010cbdcc31',
  '1504384308090-c894fdcc538d',
  '1519389953810-c10a52736c34',
  '1550751827-4bd374c3f58b',
  '1451187580459-43490279c0fa',
  '1526374965328-7f61d4dc18c5',
  '1501504905252-473c47e087f8',
  '1544197150-b99a580fb731',
  '1563206767541-404fbada7027',
  '1542831371-29b0f74f9713',
  '1618401471353-b98afee0b2eb',
  '1607799279861-4ddb44e0586e',
  '1551288049-bebda4e38f71',
  '1629654297299-c8506221ca97'
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

async function fixDevOpsImages() {
  const category = 'DevOps';
  const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1 ORDER BY id', [category]);
  console.log(`Found ${res.rowCount} courses for DevOps`);
  
  const coursesDir = path.join(__dirname, '../frontend/public/courses');
  if (!fs.existsSync(coursesDir)) {
    fs.mkdirSync(coursesDir, { recursive: true });
  }
  
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows[i];
    const imageId = unsplashIds[i % unsplashIds.length];
    const imgName = `devops_${i + 1}_${Date.now()}.jpg`;
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
  
  console.log('Done fixing DevOps images!');
  process.exit(0);
}

fixDevOpsImages();
