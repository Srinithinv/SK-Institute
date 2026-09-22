const db = require('./db');

const newTestimonials = [
  {
    student_name: 'David Chen',
    role: 'Frontend Developer at Meta',
    text: 'Thodakkam completely transformed my career trajectory. The rigorous curriculum and incredible community support helped me land my dream role within 6 months of graduating.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    student_name: 'Priya Sharma',
    role: 'Product Designer at Spotify',
    text: 'The UX/UI design courses are top-notch. I went from having zero design experience to building a portfolio that got me multiple job offers. The instructors are phenomenal.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    student_name: 'Marcus Johnson',
    role: 'Backend Engineer at Stripe',
    text: 'What sets Thodakkam apart is the focus on real-world projects. I built a payment gateway clone that became the main talking point in all my technical interviews.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
  },
  {
    student_name: 'Elena Rodriguez',
    role: 'Data Analyst at Netflix',
    text: 'I loved the practical approach to SQL and Python. The mock interviews and resume reviews were the cherry on top. An amazing platform for anyone looking to upskill quickly.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
  },
  {
    student_name: 'Rahul Desai',
    role: 'Full Stack Dev at Startup Inc',
    text: 'The best investment I have made in my career. The mentors are accessible, and the curriculum is constantly updated with the latest industry trends and frameworks.',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
  }
];

async function insertTestimonials() {
  try {
    console.log('Inserting new text testimonials...');
    for (const t of newTestimonials) {
      await db.query(
        'INSERT INTO content_testimonials (student_name, role, text, rating, image_url) VALUES ($1, $2, $3, $4, $5)',
        [t.student_name, t.role, t.text, t.rating, t.image_url]
      );
      console.log(`Inserted ${t.student_name}`);
    }
    console.log('All testimonials inserted successfully.');
  } catch (err) {
    console.error('Error inserting testimonials:', err);
  } finally {
    process.exit();
  }
}

insertTestimonials();
