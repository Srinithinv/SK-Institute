const db = require('./db');

async function seedML() {
  const courses = [
    { title: "Machine Learning", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-1.jpg" },
    { title: "Applied Machine Learning", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-3.jpg" },
    { title: "Advanced Machine Learning", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-1.jpg" },
    { title: "Deep Learning", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-3.jpg" },
    { title: "Natural Language Processing", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-1.jpg" },
    { title: "Computer Vision", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-3.jpg" },
    { title: "Machine Learning Engineering", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-1.jpg" },
    { title: "MLOps", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-3.jpg" },
    { title: "Time Series Forecasting", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-1.jpg" },
    { title: "Recommendation Systems", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-3.jpg" },
    { title: "Reinforcement Learning", duration: "12 Weeks", price: "₹15,000", img: "/courses/fs-1.jpg" }
  ];

  for (let c of courses) {
    const res = await db.query('SELECT id FROM content_courses WHERE title = $1', [c.title]);
    if (res.rowCount > 0) {
      // Update existing course to move it to Machine Learning category
      await db.query(
        'UPDATE content_courses SET category = $1, image_url = $2 WHERE title = $3',
        ['Machine Learning', c.img, c.title]
      );
      console.log(`Updated ${c.title}`);
    } else {
      // Insert new course
      await db.query(
        'INSERT INTO content_courses (title, category, image_url, duration, price) VALUES ($1, $2, $3, $4, $5)',
        [c.title, 'Machine Learning', c.img, c.duration, c.price]
      );
      console.log(`Inserted ${c.title}`);
    }
  }
  
  console.log('Done seeding Machine Learning category');
  process.exit(0);
}

seedML();
