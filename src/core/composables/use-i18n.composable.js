import { ref, computed } from 'vue';

/**
 * use-i18n.composable.js
 * Reactive composable for English ↔ Spanish language switching.
 * Shared singleton state so all components stay in sync.
 */

const currentLang = ref('en');

const translations = {
  en: {
    // Nav
    navAbout: 'About',
    navEducation: 'Education',
    navProjects: 'Projects',
    navSkills: 'Skills',
    navCertifications: 'Certifications',
    navContact: 'Contact',

    // Hero
    greeting: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' },
    heroPrefix: 'Software Engineer focused on',
    heroHighlight: 'code quality',
    heroSuffix: 'and continuous improvement.',
    heroDesc: '7th-semester Software Engineering student in the Top 10% at UPC. Proactive, results-driven, with a keen interest in Data Science & AI.',
    downloadCv: 'Download CV',
    viewProjects: 'View Projects',
    badge1: 'Top 10% — UPC',
    badge2: '4 Technical Projects',
    badge3: 'Open to Work',

    // About
    aboutLabel: 'About',
    aboutTitle: 'About',
    aboutHighlight: 'Me',
    aboutP1: "I'm a 7th-semester <strong>Software Engineering</strong> student at <strong>Universidad Peruana de Ciencias Aplicadas (UPC)</strong>, ranked in the <strong>Top 10%</strong> of my class. I stand out for my sense of responsibility, proactivity, and ability to integrate into multidisciplinary teams.",
    aboutP2: "Throughout my academic career I've built several <strong>university-level projects</strong> that have allowed me to gain hands-on experience with multiple tools, languages, and frameworks — from backend architectures with Spring Boot to mobile applications with Flutter.",
    aboutP3: 'Always focused on <strong>code quality</strong> and <strong>continuous improvement</strong>, I strive to deliver high-impact results. I have a strong interest in <strong>Data Science & AI</strong>.',

    // Education
    eduLabel: 'Education',
    eduTitle: 'Academic',
    eduHighlight: 'Background',
    eduDegree: 'Software Engineering',
    eduInstitution: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
    eduPeriod: '2022 — Present · 7th Semester',
    eduNote: 'Top 10% of class — Academic excellence distinction. Focus on software architecture, algorithms, databases, and QA.',

    // Skills
    skillsLabel: 'Skills',
    skillsTitle: 'Technical',
    skillsHighlight: 'Skills',
    skillsSubtitle: "Tools and technologies I've worked with across my projects.",
    skillLanguages: 'Languages',
    skillFrameworks: 'Frameworks',
    skillDatabases: 'Databases',
    skillIDEs: 'IDEs & Tools',
    skillCloud: 'Cloud & Hosting',
    skillSoft: 'Soft Skills',
    softResponsibility: 'Responsibility',
    softProactivity: 'Proactivity',
    softTeamwork: 'Teamwork',
    softAdaptability: 'Adaptability',

    // Projects
    projectsLabel: 'Projects',
    projectsTitle: 'Featured',
    projectsHighlight: 'Projects',
    projectsSubtitle: 'Each project was an opportunity to learn new technologies and solve real-world problems.',
    viewAllProjects: 'View all projects',
    backToHome: 'Back to home',
    allProjectsTitle: 'All',
    allProjectsHighlight: 'Projects',

    // Project descriptions
    mecanetShort: 'Web platform for preventive maintenance management of industrial equipment, designed with Domain-Driven Design (DDD) and layered architecture. Implements CQRS patterns, Anti-Corruption Layer (ACL), and Bounded Contexts for scalability and efficient maintenance.',
    mecanetFull: 'Web platform for preventive maintenance management of industrial equipment and personnel, designed with Domain-Driven Design (DDD) and layered architecture. Implements CQRS patterns for operation segregation, Anti-Corruption Layer (ACL) to protect domain logic, and a Bounded Contexts structure that ensures scalability. Digitized the process of task assignment and maintenance reports, reducing manual errors.',
    agrotechShort: 'Intelligent farm management system with decoupled architecture (Web, Mobile & API). Full QA cycle: Unit & Integration Testing with JUnit 5/Mockito, BDD with Gherkin/Cucumber scenarios, and E2E testing with TestBed for critical flows.',
    agrotechFull: 'Intelligent farm management system with decoupled architecture (Web, Mobile & API). Built a scalable architecture for agricultural resource monitoring and implemented efficiency algorithms for real-time decision making. Full QA cycle: Unit & Integration Testing with JUnit 5/Mockito, BDD with Gherkin/Cucumber scenarios, and E2E testing with TestBed for critical flows like authentication and role management.',
    sudokuShort: 'Web-based computational testing interface for comparative analysis of Sudoku-solving algorithms. Evaluates performance between Brute Force and Backtracking, analyzing response times and algorithmic complexity under different stress levels.',
    sudokuFull: 'Web-based computational testing interface for comparative analysis of Sudoku-solving algorithms. Programmed and benchmarked performance between Brute Force and Backtracking. Conducted computational complexity analysis to determine processing efficiency by difficulty level, evaluating response times under different stress and data entropy conditions.',
    utimeShort: 'Mobile application ecosystem for Android and iOS focused on real-time appointment booking and administrative management for beauty salons.',
    utimeFull: 'Mobile application ecosystem for Android and iOS focused on real-time appointment booking and administrative management for beauty salons. Built an intuitive end-user interface and an admin panel for business owners. Integration of payment gateways, organization through design patterns, and local persistence with SQLite.',

    // Certifications
    certLabel: 'Certifications',
    certTitle: 'Professional',
    certHighlight: 'Certifications',
    viewAllCerts: 'View all certifications',
    showLess: 'Show less',

    // Contact
    contactGetInTouch: 'Get in touch:',
    role: 'Software Engineering Student & Developer',

    // Footer
    footerDesigned: 'Designed & built by',

    // Theme
    lightMode: 'Light',
    darkMode: 'Dark',
  },
  es: {
    // Nav
    navAbout: 'Sobre mí',
    navEducation: 'Educación',
    navProjects: 'Proyectos',
    navSkills: 'Habilidades',
    navCertifications: 'Certificaciones',
    navContact: 'Contacto',

    // Hero
    greeting: { morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas noches' },
    heroPrefix: 'Ingeniera de Software enfocada en',
    heroHighlight: 'calidad de código',
    heroSuffix: 'y mejora continua.',
    heroDesc: 'Estudiante de 7mo ciclo de Ingeniería de Software en el Top 10% en la UPC. Proactiva, orientada a resultados, con gran interés en Ciencia de Datos e IA.',
    downloadCv: 'Descargar CV',
    viewProjects: 'Ver Proyectos',
    badge1: 'Top 10% — UPC',
    badge2: '4 Proyectos Técnicos',
    badge3: 'Disponible para trabajar',

    // About
    aboutLabel: 'Sobre mí',
    aboutTitle: 'Sobre',
    aboutHighlight: 'Mí',
    aboutP1: 'Soy estudiante de 7mo ciclo de <strong>Ingeniería de Software</strong> en la <strong>Universidad Peruana de Ciencias Aplicadas (UPC)</strong>, ubicada en el <strong>Top 10%</strong> de mi promoción. Me destaco por mi sentido de responsabilidad, proactividad y capacidad para integrarme en equipos multidisciplinarios.',
    aboutP2: 'A lo largo de mi carrera académica he desarrollado varios <strong>proyectos universitarios</strong> que me han permitido adquirir experiencia práctica con múltiples herramientas, lenguajes y frameworks — desde arquitecturas backend con Spring Boot hasta aplicaciones móviles con Flutter.',
    aboutP3: 'Siempre enfocada en la <strong>calidad del código</strong> y la <strong>mejora continua</strong>, busco entregar resultados de alto impacto. Tengo un fuerte interés en <strong>Ciencia de Datos e IA</strong>.',

    // Education
    eduLabel: 'Educación',
    eduTitle: 'Formación',
    eduHighlight: 'Académica',
    eduDegree: 'Ingeniería de Software',
    eduInstitution: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
    eduPeriod: '2022 — Presente · 7mo Ciclo',
    eduNote: 'Top 10% de la promoción — Distinción por excelencia académica. Enfoque en arquitectura de software, algoritmos, bases de datos y QA.',

    // Skills
    skillsLabel: 'Habilidades',
    skillsTitle: 'Habilidades',
    skillsHighlight: 'Técnicas',
    skillsSubtitle: 'Herramientas y tecnologías con las que he trabajado en mis proyectos.',
    skillLanguages: 'Lenguajes',
    skillFrameworks: 'Frameworks',
    skillDatabases: 'Bases de Datos',
    skillIDEs: 'IDEs y Herramientas',
    skillCloud: 'Nube y Hosting',
    skillSoft: 'Habilidades Blandas',
    softResponsibility: 'Responsabilidad',
    softProactivity: 'Proactividad',
    softTeamwork: 'Trabajo en equipo',
    softAdaptability: 'Adaptabilidad',

    // Projects
    projectsLabel: 'Proyectos',
    projectsTitle: 'Proyectos',
    projectsHighlight: 'Destacados',
    projectsSubtitle: 'Cada proyecto fue una oportunidad para aprender nuevas tecnologías y resolver problemas del mundo real.',
    viewAllProjects: 'Ver todos los proyectos',
    backToHome: 'Volver al inicio',
    allProjectsTitle: 'Todos los',
    allProjectsHighlight: 'Proyectos',

    // Project descriptions
    mecanetShort: 'Plataforma web para gestión de mantenimiento preventivo de equipos industriales, diseñada con Domain-Driven Design (DDD) y arquitectura por capas. Implementa patrones CQRS, Anti-Corruption Layer (ACL) y Bounded Contexts para escalabilidad.',
    mecanetFull: 'Plataforma web para gestión de mantenimiento preventivo de equipos industriales y personal, diseñada con Domain-Driven Design (DDD) y arquitectura por capas. Implementa patrones CQRS para segregación de operaciones, Anti-Corruption Layer (ACL) para proteger la lógica de dominio, y estructura de Bounded Contexts que asegura escalabilidad. Digitalizó el proceso de asignación de tareas y reportes de mantenimiento.',
    agrotechShort: 'Sistema inteligente de gestión agrícola con arquitectura desacoplada (Web, Móvil y API). Ciclo completo de QA: Testing Unitario e Integración con JUnit 5/Mockito, BDD con escenarios Gherkin/Cucumber, y testing E2E con TestBed.',
    agrotechFull: 'Sistema inteligente de gestión agrícola con arquitectura desacoplada (Web, Móvil y API). Arquitectura escalable para monitoreo de recursos agrícolas y algoritmos de eficiencia para toma de decisiones en tiempo real. Ciclo completo de QA: Testing Unitario e Integración con JUnit 5/Mockito, BDD con escenarios Gherkin/Cucumber, y testing E2E con TestBed.',
    sudokuShort: 'Interfaz web de pruebas computacionales para análisis comparativo de algoritmos de resolución de Sudoku. Evalúa rendimiento entre Fuerza Bruta y Backtracking, analizando tiempos de respuesta y complejidad algorítmica.',
    sudokuFull: 'Interfaz web de pruebas computacionales para análisis comparativo de algoritmos de resolución de Sudoku. Programó y evaluó rendimiento entre Fuerza Bruta y Backtracking. Análisis de complejidad computacional para determinar eficiencia de procesamiento por nivel de dificultad.',
    utimeShort: 'Ecosistema de aplicaciones móviles para Android e iOS enfocado en reserva de citas en tiempo real y gestión administrativa de salones de belleza.',
    utimeFull: 'Ecosistema de aplicaciones móviles para Android e iOS enfocado en reserva de citas en tiempo real y gestión administrativa de salones de belleza. Interfaz intuitiva para usuario final y panel administrativo para propietarios. Integración de pasarelas de pago, patrones de diseño y persistencia local con SQLite.',

    // Certifications
    certLabel: 'Certificaciones',
    certTitle: 'Certificaciones',
    certHighlight: 'Profesionales',
    viewAllCerts: 'Ver todas las certificaciones',
    showLess: 'Ver menos',

    // Contact
    contactGetInTouch: 'Contáctame:',
    role: 'Estudiante de Ingeniería de Software y Desarrolladora',

    // Footer
    footerDesigned: 'Diseñado y desarrollado por',

    // Theme
    lightMode: 'Claro',
    darkMode: 'Oscuro',
  }
};

export function useI18n() {
  const t = computed(() => translations[currentLang.value]);
  const lang = computed(() => currentLang.value);

  function toggleLang() {
    currentLang.value = currentLang.value === 'en' ? 'es' : 'en';
  }

  function setLang(code) {
    currentLang.value = code;
  }

  return { t, lang, toggleLang, setLang };
}
