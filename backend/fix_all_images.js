const db = require('./db');

async function fixAllImages() {
  try {
    // We have known good local images that exist: /courses/fs-1.jpg, /courses/fs-3.jpg
    // Let's update any course that has an unsplash URL (which the adblocker blocks)
    // to use these local images instead.
    
    const res = await db.query("SELECT id, image_url FROM content_courses WHERE image_url LIKE '%unsplash%'");
    
    console.log(`Found ${res.rowCount} courses with unsplash URLs. Fixing them now...`);
    
    let index = 0;
    for (let row of res.rows) {
      const localImage = index % 2 === 0 ? '/courses/fs-1.jpg' : '/courses/fs-3.jpg';
      await db.query("UPDATE content_courses SET image_url = $1 WHERE id = $2", [localImage, row.id]);
      index++;
    }
    
    console.log('All broken Unsplash images have been completely removed and replaced with working local images!');
    process.exit(0);
  } catch (error) {
    console.error("Error fixing images:", error);
    process.exit(1);
  }
}

fixAllImages();
