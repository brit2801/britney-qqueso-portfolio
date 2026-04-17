/**
 * portfolio.model.js
 * Domain model for the portfolio bounded context.
 * Contains all static data entities used across views.
 */

export const profileData = {
  name: 'Britney Qqueso',
  fullName: 'Britney Qqueso Rodriguez',
  role: 'Software Engineering Student & Developer',
  email: 'britneyrodriguez2801@gmail.com',
  phone: '+51949878644',
  cvUrl: 'assets/Britney_CV.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/britney-qqueso-rodriguez-7b9070348/',
    github: 'https://github.com/brit2801'
  }
};

export const projects = [
  {
    id: 'mecanet',
    name: 'MECANET',
    iconColor: 'var(--cyan)',
    tags: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'MySQL', 'JetBrains']
  },
  {
    id: 'agrotech',
    name: 'AgroTech',
    iconColor: 'var(--teal)',
    tags: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Kotlin', 'MySQL', 'Cucumber']
  },
  {
    id: 'sudoku-tech',
    name: 'Sudoku-Tech',
    iconColor: 'var(--amber)',
    tags: ['Python']
  },
  {
    id: 'utime',
    name: 'UTime',
    iconColor: 'var(--green)',
    tags: ['Dart', 'Flutter', 'Android Studio', 'Kotlin', 'Java', 'SQLite', 'Firebase']
  }
];

export const certifications = [
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: 2024 },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: 2024 },
  { name: 'Python for Data Science', issuer: 'Coursera', year: 2024 },
  { name: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', year: 2024 },
  { name: 'Git & GitHub Fundamentals', issuer: 'Platzi', year: 2023 },
  { name: 'Agile Development with Scrum', issuer: 'Coursera', year: 2023 },
  { name: 'AWS Cloud Practitioner Essentials', issuer: 'AWS Training', year: 2023 },
  { name: 'Introduction to SQL', issuer: 'DataCamp', year: 2023 },
  { name: 'Flutter Development Bootcamp', issuer: 'Udemy', year: 2023 },
  { name: 'Object-Oriented Programming in Java', issuer: 'Coursera', year: 2022 }
];
