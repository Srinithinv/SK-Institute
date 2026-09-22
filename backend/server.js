const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'super_secret_jwt_key_123'; // In production, use env variable

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ----------------------
// Auth Routes
// ----------------------
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ----------------------
// Leads Routes
// ----------------------
app.post('/api/leads', async (req, res) => {
  const { firstName, lastName, email, phone, course, source } = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2); // Simple unique ID
  const createdAt = new Date().toISOString();

  const sql = `INSERT INTO leads (id, "firstName", "lastName", email, phone, course, source, "createdAt") 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  
  try {
    await db.query(sql, [id, firstName, lastName, email, phone, course, source, createdAt]);
    res.status(201).json({ id, message: 'Lead created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

app.get('/api/leads', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM leads ORDER BY "createdAt" DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// CMS Routes
// ----------------------

// 1. About
app.get('/api/content/about', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM content_about LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/content/about', authenticateToken, async (req, res) => {
  const { title, description, mission, vision, stats_students, stats_courses, stats_awards } = req.body;
  try {
    await db.query(`
      UPDATE content_about 
      SET title = $1, description = $2, mission = $3, vision = $4, stats_students = $5, stats_courses = $6, stats_awards = $7
    `, [title, description, mission, vision, stats_students, stats_courses, stats_awards]);
    res.json({ message: 'About updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Founder
app.get('/api/content/founder', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM content_founder LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/content/founder', authenticateToken, async (req, res) => {
  const { name, title, bio, image_url } = req.body;
  try {
    await db.query(`
      UPDATE content_founder 
      SET name = $1, title = $2, bio = $3, image_url = $4
    `, [name, title, bio, image_url]);
    res.json({ message: 'Founder updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Courses
app.get('/api/content/courses', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM content_courses ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/content/courses', authenticateToken, async (req, res) => {
  const { title, description, duration, level, price, icon, image_url, category } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO content_courses (title, description, duration, level, price, icon, image_url, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `, [title, description, duration, level, price, icon, image_url, category]);
    res.status(201).json({ id: result.rows[0].id, message: 'Course created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/content/courses/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, level, price, icon, image_url, category } = req.body;
  try {
    await db.query(`
      UPDATE content_courses SET title=$1, description=$2, duration=$3, level=$4, price=$5, icon=$6, image_url=$7, category=$8 WHERE id=$9
    `, [title, description, duration, level, price, icon, image_url, category, id]);
    res.json({ message: 'Course updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/content/courses/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM content_courses WHERE id=$1', [req.params.id]);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Videos
app.get('/api/content/videos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM content_videos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/content/videos', authenticateToken, async (req, res) => {
  const { title, video_url, thumbnail_url, category } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO content_videos (title, video_url, thumbnail_url, category)
      VALUES ($1, $2, $3, $4) RETURNING id
    `, [title, video_url, thumbnail_url, category]);
    res.status(201).json({ id: result.rows[0].id, message: 'Video created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/content/videos/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, video_url, thumbnail_url, category } = req.body;
  try {
    await db.query(`
      UPDATE content_videos SET title=$1, video_url=$2, thumbnail_url=$3, category=$4 WHERE id=$5
    `, [title, video_url, thumbnail_url, category, id]);
    res.json({ message: 'Video updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/content/videos/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM content_videos WHERE id=$1', [req.params.id]);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Testimonials
app.get('/api/content/testimonials', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM content_testimonials ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/content/testimonials', authenticateToken, async (req, res) => {
  const { student_name, role, text, rating, image_url } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO content_testimonials (student_name, role, text, rating, image_url)
      VALUES ($1, $2, $3, $4, $5) RETURNING id
    `, [student_name, role, text, rating, image_url]);
    res.status(201).json({ id: result.rows[0].id, message: 'Testimonial created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/content/testimonials/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { student_name, role, text, rating, image_url } = req.body;
  try {
    await db.query(`
      UPDATE content_testimonials SET student_name=$1, role=$2, text=$3, rating=$4, image_url=$5 WHERE id=$6
    `, [student_name, role, text, rating, image_url, id]);
    res.json({ message: 'Testimonial updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/content/testimonials/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM content_testimonials WHERE id=$1', [req.params.id]);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Video Testimonials
app.get('/api/content/video-testimonials', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM content_video_testimonials ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/content/video-testimonials', authenticateToken, async (req, res) => {
  const { student_name, video_url, thumbnail_url } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO content_video_testimonials (student_name, video_url, thumbnail_url)
      VALUES ($1, $2, $3) RETURNING id
    `, [student_name, video_url, thumbnail_url]);
    res.status(201).json({ id: result.rows[0].id, message: 'Video testimonial created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/content/video-testimonials/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { student_name, video_url, thumbnail_url } = req.body;
  try {
    await db.query(`
      UPDATE content_video_testimonials SET student_name=$1, video_url=$2, thumbnail_url=$3 WHERE id=$4
    `, [student_name, video_url, thumbnail_url, id]);
    res.json({ message: 'Video testimonial updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/content/video-testimonials/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM content_video_testimonials WHERE id=$1', [req.params.id]);
    res.json({ message: 'Video testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
