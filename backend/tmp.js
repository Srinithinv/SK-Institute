const db = require('./db');
async function fix() {
  await db.query('UPDATE content_courses SET image_url = $1 WHERE title = $2', ['/courses/fsd_2_1790004944576.jpg', 'Node.js Backend Architecture']);
  console.log('Fixed last FSD image!');
  process.exit(0);
}
fix();
