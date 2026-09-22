const db = require('./db');

const categoriesData = [
  {
    category: "Artificial Intelligence",
    courses: [
      "Artificial Intelligence", "Generative AI", "AI Engineering", "Generative AI with LLMs",
      "Prompt Engineering", "AI Agents & Agentic AI", "Large Language Models", "Natural Language Processing",
      "Computer Vision", "Deep Learning", "Applied AI with Python"
    ]
  },
  {
    category: "Data Science & Analytics",
    courses: [
      "Data Science", "Data Analytics", "Advanced Data Analytics", "Business Analytics",
      "Data Visualization", "Python for Data Science", "SQL for Data Analytics", "Power BI",
      "Tableau", "Excel for Data Analytics", "Statistics for Data Science", "Big Data Analytics"
    ]
  },
  {
    category: "Machine Learning",
    courses: [
      "Machine Learning", "Applied Machine Learning", "Advanced Machine Learning", "Deep Learning",
      "Natural Language Processing", "Computer Vision", "Machine Learning Engineering", "MLOps",
      "Time Series Forecasting", "Recommendation Systems", "Reinforcement Learning"
    ]
  },
  {
    category: "Full Stack Development",
    courses: [
      "MERN Stack Development", "MEAN Stack Development", "Java Full Stack Development",
      "Python Full Stack Development", ".NET Full Stack Development", "Java + React Full Stack",
      "Python + React Full Stack"
    ]
  },
  {
    category: "Web Development",
    courses: [
      "HTML & CSS", "JavaScript", "React JS", "Angular", "Vue JS", "Next.js", "Node.js",
      "Express.js", "Django", "Flask", "FastAPI", ".NET Development"
    ]
  },
  {
    category: "Java Technologies",
    courses: [
      "Core Java", "Advanced Java", "Java Full Stack", "Spring Framework", "Spring Boot",
      "Spring MVC", "Hibernate", "Microservices with Java", "Java + React"
    ]
  },
  {
    category: "Python Technologies",
    courses: [
      "Python Programming", "Advanced Python", "Python Full Stack", "Python for Data Science",
      "Python for AI & ML", "Django", "Flask", "FastAPI", "Python Automation"
    ]
  },
  {
    category: "Cloud Computing",
    courses: [
      "Cloud Computing", "AWS", "Microsoft Azure", "Google Cloud", "AWS Solutions Architect",
      "Azure Administrator", "Cloud Architecture", "Cloud Infrastructure", "Cloud Security"
    ]
  },
  {
    category: "DevOps",
    courses: [
      "DevOps", "Docker", "Kubernetes", "Jenkins", "Git & GitHub", "CI/CD", "Terraform",
      "Ansible", "AWS DevOps", "Azure DevOps"
    ]
  },
  {
    category: "Cybersecurity",
    courses: [
      "Cybersecurity", "Cybersecurity Fundamentals", "Ethical Hacking", "Network Security",
      "Web Application Security", "Penetration Testing", "Digital Forensics", "SOC Analyst",
      "Cloud Security", "Cybersecurity with Python"
    ]
  },
  {
    category: "Software Testing",
    courses: [
      "Software Testing", "Manual Testing", "Automation Testing", "Selenium", "API Testing",
      "Performance Testing", "Mobile App Testing", "Playwright", "Cypress", "Java + Selenium"
    ]
  },
  {
    category: "Database Technologies",
    courses: [
      "SQL", "MySQL", "PostgreSQL", "MongoDB", "Oracle SQL", "Database Administration",
      "PL/SQL", "Database Design"
    ]
  },
  {
    category: "Mobile App Development",
    courses: [
      "Android Development", "Android with Kotlin", "Flutter", "React Native",
      "Cross-Platform App Development", "Firebase Development"
    ]
  },
  {
    category: "UI/UX & Design",
    courses: [
      "UI/UX Design", "Figma", "UX Research", "Product Design", "Graphic Design",
      "Adobe Photoshop", "Adobe Illustrator", "Motion Graphics"
    ]
  },
  {
    category: "Digital Marketing",
    courses: [
      "Digital Marketing", "Search Engine Optimization (SEO)", "Social Media Marketing",
      "Google Ads", "Meta Ads", "Content Marketing", "Email Marketing",
      "Affiliate Marketing", "Marketing Analytics"
    ]
  },
  {
    category: "Business & Management",
    courses: [
      "Business Analytics", "Project Management", "Product Management", "Business Intelligence",
      "Human Resource Management", "Operations Management", "Financial Management", "Entrepreneurship"
    ]
  },
  {
    category: "Finance & Accounting",
    courses: [
      "Tally Prime", "GST & Taxation", "Advanced Excel", "Financial Accounting", "SAP FICO",
      "Financial Modeling", "Financial Analysis", "Investment Analysis"
    ]
  },
  {
    category: "SAP & ERP",
    courses: [
      "SAP FICO", "SAP MM", "SAP SD", "SAP ABAP", "SAP HANA", "ERP Fundamentals"
    ]
  },
  {
    category: "IoT & Embedded Systems",
    courses: [
      "Internet of Things (IoT)", "IoT with Arduino", "IoT with Raspberry Pi",
      "Embedded Systems", "Embedded C", "Robotics", "Industrial Automation", "PLC & SCADA"
    ]
  }
];

async function seedAllCategories() {
  let inserted = 0;
  for (const cat of categoriesData) {
    console.log(`Processing category: ${cat.category}...`);
    for (const title of cat.courses) {
      try {
        const existing = await db.query('SELECT id FROM content_courses WHERE title = $1 AND category = $2', [title, cat.category]);
        if (existing.rows.length === 0) {
          // Use a default placeholder image for new ones; they can be updated later.
          // Wait, if it exists in another category with an image, maybe we can copy it? Let's just use ai-1.jpg as placeholder
          let imgUrl = '/courses/ai-1.jpg';
          
          await db.query(
            `INSERT INTO content_courses (title, description, category, image_url) 
             VALUES ($1, $2, $3, $4)`,
            [title, `Comprehensive course on ${title}.`, cat.category, imgUrl]
          );
          inserted++;
        }
      } catch (err) {
        console.error(`Failed to insert ${title}:`, err);
      }
    }
  }

  console.log(`Seeding complete. Inserted ${inserted} new courses.`);
  process.exit(0);
}

seedAllCategories();
