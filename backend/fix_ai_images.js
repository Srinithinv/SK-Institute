const db = require('./db');

async function fixAiImages() {
  const category = 'Artificial Intelligence';
  const res = await db.query('SELECT id, title FROM content_courses WHERE category = $1 ORDER BY id', [category]);
  
  console.log(`Found ${res.rowCount} courses for AI`);
  
  // We have ai-1.jpg through ai-11.jpg
  // Let's assign them sequentially
  let i = 1;
  for (let row of res.rows) {
    const imgName = `ai-${i}.jpg`;
    console.log(`Updating ${row.title} to use /courses/${imgName}`);
    await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [`/courses/${imgName}`, row.id]);
    
    i++;
    if (i > 11) i = 1; // loop just in case there are more than 11
  }
  
  console.log('Done!');
  process.exit(0);
}

fixAiImages();
