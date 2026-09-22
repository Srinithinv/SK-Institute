const db = require('./db');

const newCourses = [
  // Full Stack Development
  { title: "React.js Advanced", duration: "20 Hrs", enrolled: "12k+", price: "₹3,499", rating: "4.8", category: "Full Stack Development", image_url: "/courses/fs-1.jpg" },
  { title: "HTML & CSS Mastery", duration: "15 Hrs", enrolled: "25k+", price: "₹1,999", rating: "4.7", category: "Full Stack Development", image_url: "/courses/fs-2.jpg" },
  { title: "TypeScript Deep Dive", duration: "10 Hrs", enrolled: "8k+", price: "₹2,499", rating: "4.9", category: "Full Stack Development", image_url: "/courses/fs-3.jpg" },
  { title: "Node.js Backend Architecture", duration: "25 Hrs", enrolled: "15k+", price: "₹4,999", rating: "4.8", category: "Full Stack Development", image_url: "/courses/fs-4.jpg" },
  
  // DevOps
  { title: "Docker & Kubernetes", duration: "30 Hrs", enrolled: "18k+", price: "₹5,499", rating: "4.9", category: "DevOps", image_url: "/courses/do-1.jpg" },
  { title: "AWS Certified Solutions Architect", duration: "40 Hrs", enrolled: "30k+", price: "₹6,999", rating: "4.7", category: "DevOps", image_url: "/courses/do-3.jpg" },
  { title: "CI/CD Pipelines Mastery", duration: "15 Hrs", enrolled: "10k+", price: "₹3,999", rating: "4.6", category: "DevOps", image_url: "/courses/do-3.jpg" },
  { title: "Linux Administration", duration: "20 Hrs", enrolled: "22k+", price: "₹2,999", rating: "4.8", category: "DevOps", image_url: "/courses/do-4.jpg" },
  
  // Data Science & Analytics
  { title: "Data Science", duration: "30 Hrs", enrolled: "10k+", price: "₹4,499", rating: "4.7", category: "Data Science & Analytics", image_url: "/courses/ds-1.jpg" },
  { title: "Data Analytics", duration: "20 Hrs", enrolled: "15k+", price: "₹3,499", rating: "4.6", category: "Data Science & Analytics", image_url: "/courses/ds-2.jpg" },
  { title: "Advanced Data Analytics", duration: "25 Hrs", enrolled: "8k+", price: "₹4,999", rating: "4.8", category: "Data Science & Analytics", image_url: "/courses/ds-3.jpg" },
  { title: "Business Analytics", duration: "18 Hrs", enrolled: "12k+", price: "₹3,999", rating: "4.7", category: "Data Science & Analytics", image_url: "/courses/ds-4.jpg" },
  { title: "Data Visualization", duration: "15 Hrs", enrolled: "20k+", price: "₹2,999", rating: "4.8", category: "Data Science & Analytics", image_url: "/courses/ds-5.jpg" },
  { title: "Python for Data Science", duration: "22 Hrs", enrolled: "35k+", price: "₹3,499", rating: "4.9", category: "Data Science & Analytics", image_url: "/courses/ds-6.jpg" },
  { title: "SQL for Data Analytics", duration: "15 Hrs", enrolled: "25k+", price: "₹2,499", rating: "4.7", category: "Data Science & Analytics", image_url: "/courses/ds-7.jpg" },
  { title: "Big Data Analytics", duration: "35 Hrs", enrolled: "5k+", price: "₹5,999", rating: "4.6", category: "Data Science & Analytics", image_url: "/courses/ds-8.jpg" }
];

async function seed() {
  try {
    for (let c of newCourses) {
      // First check if it exists
      const res = await db.query('SELECT id FROM content_courses WHERE title = $1', [c.title]);
      if (res.rows.length === 0) {
        await db.query(`
          INSERT INTO content_courses (title, description, duration, level, price, icon, image_url, category)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          c.title,
          'Master ' + c.title + ' with comprehensive hands-on training.',
          c.duration,
          'Intermediate',
          c.price,
          'Star',
          c.image_url,
          c.category
        ]);
        console.log('Inserted ' + c.title);
      } else {
        // Update category and image if it already exists
        await db.query('UPDATE content_courses SET category = $1, image_url = $2 WHERE title = $3', [c.category, c.image_url, c.title]);
        console.log('Updated ' + c.title);
      }
    }
    console.log('Done seeding new courses.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
