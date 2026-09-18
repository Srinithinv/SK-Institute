export type CourseCategory = 'DEVELOPMENT' | 'DATA & AI' | 'CLOUD & DEVOPS';

export interface CourseModule {
  module: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  category: CourseCategory;
  duration: string;
  technologies: string[];
  image: string;
  fullDetails: string;
  syllabus: CourseModule[];
  outcome: string;
  price: string;
}

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Full Stack Development',
    shortDescription: 'Master end-to-end web application development with modern JavaScript frameworks.',
    category: 'DEVELOPMENT',
    duration: '6 Months',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'This intensive program is designed to take you from foundational concepts to advanced, industry-ready engineering. You will build real-world applications and learn the best practices used by top tech companies. The demand for skilled professionals in this domain is skyrocketing. By mastering these technologies, you position yourself for high-growth career opportunities.',
    syllabus: [
      { module: 'Module 1: Frontend Fundamentals', topics: ['HTML5 & CSS3 Architecture', 'Modern JavaScript (ES6+)', 'DOM Manipulation & Events', 'Responsive Web Design'] },
      { module: 'Module 2: Advanced React', topics: ['React Hooks & State Management', 'Routing & Data Fetching', 'Performance Optimization', 'Next.js Introduction'] },
      { module: 'Module 3: Backend Engineering', topics: ['Node.js & Express API Design', 'RESTful API Architecture', 'Authentication & Authorization', 'Middleware & Error Handling'] },
      { module: 'Module 4: Databases & Deployment', topics: ['SQL & PostgreSQL', 'Prisma ORM', 'Docker Containerization', 'AWS & Vercel Deployment'] }
    ],
    outcome: 'Build and deploy scalable, production-ready full-stack applications. Gain the skills required to secure a Junior to Mid-level Full Stack Developer role.',
    price: '₹ 49,999'
  },
  {
    id: 'c2',
    title: 'Data Science & Analytics',
    shortDescription: 'Extract actionable insights from raw data using advanced statistical modeling.',
    category: 'DATA & AI',
    duration: '5 Months',
    technologies: ['Python', 'Pandas', 'TensorFlow', 'SQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'Data is the new oil, but without refinement, it has no value. This course teaches you how to transform raw data into powerful business insights using Python and modern data science libraries. You will work on real datasets to solve complex predictive modeling problems.',
    syllabus: [
      { module: 'Module 1: Python for Data Science', topics: ['Python Fundamentals', 'NumPy & Numerical Computing', 'Pandas & Data Manipulation', 'Data Cleaning Techniques'] },
      { module: 'Module 2: Exploratory Data Analysis', topics: ['Matplotlib & Seaborn', 'Statistical Analysis', 'Hypothesis Testing', 'Data Storytelling'] },
      { module: 'Module 3: Machine Learning Basics', topics: ['Supervised Learning Algorithms', 'Unsupervised Learning', 'Model Evaluation & Tuning', 'Scikit-Learn Implementation'] },
      { module: 'Module 4: Deep Learning & AI', topics: ['Neural Networks', 'TensorFlow & Keras Basics', 'Natural Language Processing', 'Deploying ML Models'] }
    ],
    outcome: 'Analyze complex datasets, build predictive models, and extract business value from data. Prepared for Data Analyst and Data Scientist roles.',
    price: '₹ 54,999'
  },
  {
    id: 'c3',
    title: 'Cloud Computing & DevOps',
    shortDescription: 'Build scalable infrastructure and automate deployment pipelines.',
    category: 'CLOUD & DEVOPS',
    duration: '4 Months',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'Learn how to bridge the gap between development and operations. This course focuses on building scalable, highly available cloud infrastructures on AWS and automating software delivery pipelines using industry-standard DevOps tools.',
    syllabus: [
      { module: 'Module 1: Cloud Fundamentals (AWS)', topics: ['EC2, S3 & VPC Basics', 'IAM & Security', 'Serverless Computing (Lambda)', 'Cloud Architecture Patterns'] },
      { module: 'Module 2: Containerization', topics: ['Docker Fundamentals', 'Creating Dockerfiles', 'Docker Compose', 'Container Security'] },
      { module: 'Module 3: Orchestration', topics: ['Kubernetes Architecture', 'Deployments & Services', 'Helm Charts', 'Managing State in K8s'] },
      { module: 'Module 4: CI/CD Pipelines', topics: ['Git & GitHub Actions', 'Jenkins Automation', 'Infrastructure as Code (Terraform)', 'Monitoring & Logging'] }
    ],
    outcome: 'Design scalable cloud architectures, automate software deployments, and manage containerized applications. Ready for Cloud/DevOps Engineer roles.',
    price: '₹ 45,999'
  },
  {
    id: 'c4',
    title: 'Java Enterprise Development',
    shortDescription: 'Develop robust, scalable enterprise applications using the Spring ecosystem.',
    category: 'DEVELOPMENT',
    duration: '6 Months',
    technologies: ['Java', 'Spring Boot', 'Hibernate', 'Microservices'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'Java remains the backbone of enterprise software. This course provides deep training in Java 17+, the Spring framework ecosystem, and modern microservices architecture, preparing you for roles in large-scale corporate environments.',
    syllabus: [
      { module: 'Module 1: Advanced Core Java', topics: ['OOP Principles', 'Collections Framework', 'Java 8+ Features (Streams, Lambdas)', 'Multithreading & Concurrency'] },
      { module: 'Module 2: Spring Framework', topics: ['Spring Core & Dependency Injection', 'Spring Boot Auto-configuration', 'Spring MVC', 'REST API Development'] },
      { module: 'Module 3: Data Access & ORM', topics: ['JDBC & Connection Pooling', 'Hibernate & JPA', 'Spring Data JPA', 'Transaction Management'] },
      { module: 'Module 4: Microservices & Cloud', topics: ['Microservices Architecture', 'Spring Cloud & API Gateway', 'Service Discovery (Eureka)', 'Message Brokers (Kafka/RabbitMQ)'] }
    ],
    outcome: 'Architect and build robust, high-performance enterprise applications and microservices using Java and Spring Boot.',
    price: '₹ 49,999'
  },
  {
    id: 'c5',
    title: 'AI & Machine Learning',
    shortDescription: 'Design intelligent systems capable of learning and adapting to complex datasets.',
    category: 'DATA & AI',
    duration: '6 Months',
    technologies: ['PyTorch', 'Scikit-Learn', 'Neural Networks'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'Dive deep into the algorithms that power modern AI. This rigorous program covers everything from classical machine learning to advanced deep learning architectures used in computer vision and natural language processing.',
    syllabus: [
      { module: 'Module 1: ML Foundations', topics: ['Linear Algebra & Calculus for ML', 'Probability & Statistics', 'Regression & Classification', 'Feature Engineering'] },
      { module: 'Module 2: Advanced Machine Learning', topics: ['Support Vector Machines', 'Decision Trees & Random Forests', 'Ensemble Methods', 'Clustering Algorithms'] },
      { module: 'Module 3: Deep Learning (PyTorch)', topics: ['Artificial Neural Networks', 'Backpropagation', 'Optimizers & Loss Functions', 'PyTorch Basics'] },
      { module: 'Module 4: Applied AI', topics: ['Convolutional Neural Networks (CNNs)', 'Recurrent Neural Networks (RNNs)', 'Transformers & LLMs', 'Model Deployment (ONNX/TorchServe)'] }
    ],
    outcome: 'Build, train, and deploy advanced machine learning and deep learning models to solve complex real-world problems.',
    price: '₹ 59,999'
  },
  {
    id: 'c6',
    title: 'MERN Stack Engineering',
    shortDescription: 'Build dynamic single-page applications completely in JavaScript.',
    category: 'DEVELOPMENT',
    duration: '4 Months',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'Become a master of the JavaScript ecosystem. The MERN stack allows you to build entire web applications using a single programming language. This course focuses on building fast, modern, and data-driven web apps.',
    syllabus: [
      { module: 'Module 1: JavaScript & React', topics: ['Advanced JavaScript Concepts', 'React Fundamentals', 'Context API & Redux', 'Component Lifecycle'] },
      { module: 'Module 2: Node.js Backend', topics: ['Asynchronous Node.js', 'Express Framework', 'REST API Design', 'JWT Authentication'] },
      { module: 'Module 3: MongoDB Database', topics: ['NoSQL Concepts', 'Mongoose ODM', 'Aggregation Framework', 'Data Modeling'] },
      { module: 'Module 4: Full Stack Integration', topics: ['Connecting React to Express', 'Handling File Uploads', 'WebSockets for Real-time', 'Deploying MERN Apps'] }
    ],
    outcome: 'Develop comprehensive full-stack applications using the MERN stack and confidently handle both frontend and backend development.',
    price: '₹ 39,999'
  },
  {
    id: 'c7',
    title: 'Cloud Security Engineering',
    shortDescription: 'Secure modern cloud architectures against evolving cyber threats.',
    category: 'CLOUD & DEVOPS',
    duration: '4 Months',
    technologies: ['AWS Security', 'Zero Trust', 'Pen Testing'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'Security is paramount in the cloud era. This specialized course trains you to architect secure cloud environments, identify vulnerabilities, and implement robust defenses against modern cyber attacks.',
    syllabus: [
      { module: 'Module 1: Cloud Security Fundamentals', topics: ['Shared Responsibility Model', 'Identity & Access Management (IAM)', 'Network Security (VPC/Firewalls)', 'Data Encryption (KMS)'] },
      { module: 'Module 2: Offensive Security', topics: ['Vulnerability Scanning', 'Penetration Testing Basics', 'Common Cloud Misconfigurations', 'Exploiting Web Apps'] },
      { module: 'Module 3: Defensive Security', topics: ['Intrusion Detection Systems', 'Web Application Firewalls (WAF)', 'Zero Trust Architecture', 'Incident Response'] },
      { module: 'Module 4: DevSecOps', topics: ['Security in CI/CD', 'Static/Dynamic Analysis (SAST/DAST)', 'Container Security', 'Compliance & Auditing'] }
    ],
    outcome: 'Protect cloud infrastructure from vulnerabilities, implement DevSecOps practices, and respond effectively to security incidents.',
    price: '₹ 45,999'
  },
  {
    id: 'c8',
    title: 'Python Backend Development',
    shortDescription: 'Create fast and secure backend APIs using modern Python frameworks.',
    category: 'DEVELOPMENT',
    duration: '3 Months',
    technologies: ['Python', 'Django', 'FastAPI', 'Redis'],
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=1200',
    fullDetails: 'Python is renowned for its speed of development. Learn how to build highly scalable and performant backend services using Django for monolithic applications and FastAPI for high-speed microservices.',
    syllabus: [
      { module: 'Module 1: Advanced Python', topics: ['Python Internals', 'Generators & Decorators', 'Object-Oriented Programming', 'Asynchronous Programming (asyncio)'] },
      { module: 'Module 2: Django Framework', topics: ['Django Architecture (MTV)', 'Django ORM & Models', 'Django REST Framework', 'Authentication & Permissions'] },
      { module: 'Module 3: Modern FastAPI', topics: ['FastAPI Routing & Pydantic', 'Dependency Injection', 'Async Database Access', 'WebSockets'] },
      { module: 'Module 4: Optimization & Caching', topics: ['PostgreSQL Optimization', 'Caching with Redis', 'Background Tasks (Celery)', 'API Rate Limiting'] }
    ],
    outcome: 'Design and deploy high-performance backend systems, APIs, and microservices using modern Python frameworks.',
    price: '₹ 34,999'
  }
];
