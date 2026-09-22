const pool = require('./db');

const catalog = {
  "Artificial Intelligence": [
    "Artificial Intelligence",
    "Generative AI",
    "AI Engineering",
    "Generative AI with LLMs",
    "Prompt Engineering",
    "AI Agents & Agentic AI",
    "Large Language Models",
    "Natural Language Processing",
    "Computer Vision",
    "Deep Learning",
    "Applied AI with Python"
  ],
  "Data Science & Analytics": [
    "Data Science",
    "Data Analytics",
    "Advanced Data Analytics",
    "Business Analytics",
    "Data Visualization",
    "Python for Data Science",
    "SQL for Data Analytics",
    "Power BI",
    "Tableau",
    "Excel for Data Analytics",
    "Statistics for Data Science",
    "Big Data Analytics"
  ],
  "Machine Learning": [
    "Machine Learning",
    "Applied Machine Learning",
    "Advanced Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Machine Learning Engineering",
    "MLOps",
    "Time Series Forecasting",
    "Recommendation Systems",
    "Reinforcement Learning"
  ],
  "Full Stack Development": [
    "MERN Stack Development",
    "MEAN Stack Development",
    "Java Full Stack Development",
    "Python Full Stack Development",
    ".NET Full Stack Development",
    "Java + React Full Stack",
    "Python + React Full Stack"
  ],
  "Web Development": [
    "HTML & CSS",
    "JavaScript",
    "React JS",
    "Angular",
    "Vue JS",
    "Next.js",
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "FastAPI",
    ".NET Development"
  ],
  "Java Technologies": [
    "Core Java",
    "Advanced Java",
    "Java Full Stack",
    "Spring Framework",
    "Spring Boot",
    "Spring MVC",
    "Hibernate",
    "Microservices with Java",
    "Java + React"
  ],
  "Python Technologies": [
    "Python Programming",
    "Advanced Python",
    "Python Full Stack",
    "Python for Data Science",
    "Python for AI & ML",
    "Django",
    "Flask",
    "FastAPI",
    "Python Automation"
  ],
  "Cloud Computing": [
    "Cloud Computing",
    "AWS",
    "Microsoft Azure",
    "Google Cloud",
    "AWS Solutions Architect",
    "Azure Administrator",
    "Cloud Architecture",
    "Cloud Infrastructure",
    "Cloud Security"
  ],
  "DevOps": [
    "DevOps",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Git & GitHub",
    "CI/CD",
    "Terraform",
    "Ansible",
    "AWS DevOps",
    "Azure DevOps"
  ],
  "Cybersecurity": [
    "Cybersecurity",
    "Cybersecurity Fundamentals",
    "Ethical Hacking",
    "Network Security",
    "Web Application Security",
    "Penetration Testing",
    "Digital Forensics",
    "SOC Analyst",
    "Cloud Security",
    "Cybersecurity with Python"
  ],
  "Software Testing": [
    "Software Testing",
    "Manual Testing",
    "Automation Testing",
    "Selenium",
    "API Testing",
    "Performance Testing",
    "Mobile App Testing",
    "Playwright",
    "Cypress",
    "Java + Selenium"
  ],
  "Database Technologies": [
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Oracle SQL",
    "Database Administration",
    "PL/SQL",
    "Database Design"
  ],
  "Mobile App Development": [
    "Android Development",
    "Android with Kotlin",
    "Flutter",
    "React Native",
    "Cross-Platform App Development",
    "Firebase Development"
  ],
  "UI/UX & Design": [
    "UI/UX Design",
    "Figma",
    "UX Research",
    "Product Design",
    "Graphic Design",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Motion Graphics"
  ],
  "Digital Marketing": [
    "Digital Marketing",
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Google Ads",
    "Meta Ads",
    "Content Marketing",
    "Email Marketing",
    "Affiliate Marketing",
    "Marketing Analytics"
  ],
  "Business & Management": [
    "Business Analytics",
    "Project Management",
    "Product Management",
    "Business Intelligence",
    "Human Resource Management",
    "Operations Management",
    "Financial Management",
    "Entrepreneurship"
  ],
  "Finance & Accounting": [
    "Tally Prime",
    "GST & Taxation",
    "Advanced Excel",
    "Financial Accounting",
    "SAP FICO",
    "Financial Modeling",
    "Financial Analysis",
    "Investment Analysis"
  ],
  "SAP & ERP": [
    "SAP FICO",
    "SAP MM",
    "SAP SD",
    "SAP ABAP",
    "SAP HANA",
    "ERP Fundamentals"
  ],
  "IoT & Embedded Systems": [
    "Internet of Things (IoT)",
    "IoT with Arduino",
    "IoT with Raspberry Pi",
    "Embedded Systems",
    "Embedded C",
    "Robotics",
    "Industrial Automation",
    "PLC & SCADA"
  ],
  "Engineering & Core Technical": [
    "AutoCAD",
    "AutoCAD Civil",
    "AutoCAD Electrical",
    "SolidWorks",
    "CATIA",
    "Creo",
    "ANSYS",
    "Revit Architecture",
    "Revit MEP",
    "STAAD.Pro",
    "ETABS",
    "MATLAB",
    "Simulink",
    "PCB Design",
    "CNC Programming"
  ],
  "Career Development": [
    "Spoken English",
    "Business English",
    "Communication Skills",
    "Personality Development",
    "Interview Preparation",
    "Group Discussion Training",
    "Resume Building",
    "LinkedIn Profile Building",
    "Quantitative Aptitude",
    "Logical Reasoning",
    "Campus Placement Training",
    "Corporate Readiness Program"
  ],
  "Academic & Student Programs": [
    "Final Year Project Training",
    "Mini Project Development",
    "Major Project Development",
    "Internship Programs",
    "Project Guidance",
    "Research Project Guidance",
    "IEEE Project Development",
    "Paper Publication Guidance",
    "Technical Workshops",
    "Hackathon Preparation",
    "Coding Bootcamp",
    "Placement Bootcamp"
  ]
};

async function seedCatalog() {
  const client = await pool.connect();
  try {
    console.log("Starting massive catalog seed...");
    
    // We will append. But just in case, we log how many currently exist.
    const beforeCount = await client.query("SELECT COUNT(*) FROM content_courses");
    console.log(`Existing courses: ${beforeCount.rows[0].count}`);

    // Insert all courses
    let count = 0;
    for (const [category, courses] of Object.entries(catalog)) {
      for (const courseTitle of courses) {
        // Mock generic data for each course
        const desc = `Master ${courseTitle} with our comprehensive, industry-aligned program. Perfect for beginners and professionals alike.`;
        const duration = "12 Weeks";
        const level = "All Levels";
        const price = "₹15,000";
        const icon = "BookOpen";
        const image_url = `https://images.unsplash.com/photo-${1500000000000 + count}?auto=format&fit=crop&q=80&w=800`;

        await client.query(`
          INSERT INTO content_courses (title, description, duration, level, price, icon, image_url, category)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [courseTitle, desc, duration, level, price, icon, image_url, category]);
        
        count++;
      }
    }
    
    console.log(`Successfully seeded ${count} new courses across ${Object.keys(catalog).length} categories.`);
  } catch (err) {
    console.error("Error seeding catalog:", err);
  } finally {
    client.release();
    pool.end();
  }
}

seedCatalog();
