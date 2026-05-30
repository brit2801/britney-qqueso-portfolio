/**
 * portfolio.model.js
 * Domain model for the portfolio bounded context.
 * Contains all static data entities used across views.
 */

export const profileData = {
  name: 'Britney Qqueso',
  fullName: 'Britney Delhy Qqueso Rodriguez',
  role: 'Software Engineering Student · Analytics, ML & Applied AI',
  location: 'Lima, Peru',
  email: 'britneyrodriguez2801@gmail.com',
  phone: '+51 949878644',
  cvUrl: 'assets/Britney_CV.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/britney-qqueso-rodriguez-7b9070348/',
    github: 'https://github.com/brit2801'
  }
};

export const projects = [
  {
    id: 'mining-analytics',
    name: 'Mining Analytics ML Pipeline',
    type: 'Machine Learning · Mining',
    problem: 'Operational mining data needs to be processed and analyzed to estimate failure risk in equipment.',
    impactNum: 'ML',
    impactCap: 'predictive maintenance risk scoring',
    iconColor: 'var(--cyan)',
    tags: ['Python', 'Pandas', 'NumPy', 'PySpark', 'Scikit-learn', 'FastAPI', 'MLflow', 'Matplotlib', 'Docker', 'GitHub'],
    demo: '',
    github: ''
  },
  {
    id: 'agrotech',
    name: 'AgroTech',
    type: 'Web · Mobile · API',
    problem: 'Farm operations require scalable modules for authentication, user management and role-based workflows.',
    impactNum: 'QA',
    impactCap: 'unit, integration and BDD coverage',
    iconColor: 'var(--teal)',
    tags: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Kotlin', 'MySQL', 'JUnit 5', 'Mockito', 'Cucumber'],
    demo: '',
    github: ''
  },
  {
    id: 'mecanet',
    name: 'Mecanet',
    type: 'Software Architecture',
    problem: 'Machinery, assets and preventive maintenance need better operational control and domain traceability.',
    impactNum: 'DDD',
    impactCap: 'layered architecture with CQRS',
    iconColor: 'var(--violet)',
    tags: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'DDD', 'CQRS', 'Relational Databases'],
    demo: '',
    github: ''
  },
  {
    id: 'sudoku-tech',
    name: 'Sudoku-Tech',
    type: 'Algorithms · Analysis',
    problem: 'Sudoku-solving strategies need to be compared by response time, complexity and efficiency.',
    impactNum: '2x',
    impactCap: 'brute force vs backtracking analysis',
    iconColor: 'var(--amber)',
    tags: ['Python', 'Algorithms', 'Data Structures', 'Complexity Analysis'],
    demo: '',
    github: ''
  }
];

export const certifications = [
  { name: 'Python for Data Science, AI & Development', issuer: 'Coursera', date: 'May 2026' },
  { name: 'Generative AI: Introduction and Applications', issuer: 'Coursera', date: 'April 2026' },
  { name: 'Scrum Master Certification', issuer: 'LearnQuest (Coursera)', date: 'April 2026' },
  { name: 'Python for Everybody', issuer: 'University of Michigan (Coursera)', date: 'November 2025' },
  { name: 'Databases for Data Scientists', issuer: 'University of Colorado Boulder (Coursera)', date: 'August 2025' },
  { name: 'Good with Words: Writing and Editing', issuer: 'University of Michigan (Coursera)', date: 'August 2025' },
  { name: 'Generative AI Fundamentals', issuer: 'IBM (Coursera)', date: 'April 2025' }
];
