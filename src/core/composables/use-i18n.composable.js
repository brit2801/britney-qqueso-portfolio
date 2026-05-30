import { ref, computed } from 'vue';

/**
 * use-i18n.composable.js
 * Reactive composable for English ↔ Spanish language switching.
 * Shared singleton state so all components stay in sync.
 */

const currentLang = ref('es');

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
    heroPrefix: 'Building software and',
    heroHighlight: 'data-driven solutions',
    heroSuffix: 'with analytics, ML and applied AI.',
    heroRole: 'Software Engineering Student',
    heroSub: 'Analytics · Machine Learning · Applied AI',
    heroDesc: 'I build software and data-driven solutions focused on solving real-world problems.',
    downloadCv: 'Download CV',
    viewProjects: 'View Projects',
    badge1: 'Python',
    badge2: 'SQL',
    badge3: 'Power BI',
    badge4: 'Pandas',
    badge5: 'Scikit-learn',
    badge6: 'FastAPI',

    // About
    aboutLabel: 'About',
    aboutTitle: 'About',
    aboutHighlight: 'Me',
    aboutP1: "I'm a <strong>Software Engineering</strong> student at <strong>Universidad Peruana de Ciencias Aplicadas (UPC)</strong>, ranked in the <strong>top tenth of my class</strong>. I am interested in developing solutions that combine software, data, and artificial intelligence, with a foundation in Python, databases, application development, and algorithmic thinking.",
    aboutP2: "Through academic and personal projects, I have worked on software development, data analysis, machine learning, APIs, and web/mobile systems. I like building well-structured solutions, documenting the process, and applying good practices so the work is clear, maintainable, and easy to improve.",
    aboutP3: 'My current focus is on software development, Machine Learning, and applied AI, especially projects that use data and technology to solve real operational problems.',

    // Education
    eduLabel: 'Education',
    eduTitle: 'Academic',
    eduHighlight: 'Background',
    eduDegree: 'Software Engineering',
    eduInstitution: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
    eduPeriod: 'Mar. 2023 — Present',
    eduNote: 'Top tenth. Coursework and projects focused on software development, databases, algorithms, architecture, testing and data-driven systems.',

    // Skills
    skillsLabel: 'Skills',
    skillsTitle: 'Technical',
    skillsHighlight: 'Skills',
    skillsSubtitle: "Tools and technologies from my software, analytics, ML and data projects.",
    skillLanguages: 'Languages',
    skillFrameworks: 'Frameworks',
    skillSoftware: 'Software Development',
    skillDatabases: 'Databases',
    skillDataMl: 'Data Analytics & ML',
    skillMLOps: 'MLOps & APIs',
    skillCloud: 'Cloud & Hosting',
    skillTesting: 'Testing & Quality',
    skillSoft: 'Soft Skills',
    softResponsibility: 'Responsibility',
    softProactivity: 'Fast learning',
    softTeamwork: 'Teamwork',
    softAdaptability: 'Adaptability',

    // Projects
    projectsLabel: 'Projects',
    projectsTitle: 'Featured',
    projectsHighlight: 'Projects',
    projectsSubtitle: 'Selected academic and personal projects from the CV, focused on software, data analysis and ML.',
    viewAllProjects: 'View more projects',
    backToHome: 'Back to home',
    allProjectsTitle: 'All',
    allProjectsHighlight: 'Projects',

    // Project descriptions
    projectProblem: 'Problem',
    projectSource: 'GitHub',
    projectDemo: 'View Demo',
    miningShort: 'End-to-end analytical pipeline in Python to simulate, process and analyze operational mining equipment data for predictive maintenance.',
    miningFull: 'Personal end-to-end analytical pipeline in Python to simulate, process and analyze operational data from mining equipment. It builds risk variables from temperature, vibration, operating hours, load and failure history, compares classification models, exposes a basic FastAPI endpoint, logs metrics with MLflow and includes technical documentation.',
    miningProblem: 'Operational mining data needs to be simulated, processed and modeled to estimate failure risk in equipment.',
    agrotechShort: 'Intelligent farm management solution with decoupled Web, Mobile and API modules, focused on scalability, maintainability and critical flow validation.',
    agrotechFull: 'Academic project for intelligent farm management with decoupled Web, Mobile and API modules. I collaborated on the validation of critical flows such as authentication, user management and roles through unit tests, integration tests and BDD scenarios with Gherkin/Cucumber.',
    agrotechProblem: 'Farm management workflows require scalable modules and reliable validation of authentication, user and role flows.',
    mecanetShort: 'Web platform for operational control of machinery, assets and preventive maintenance using DDD, layered architecture, CQRS and Bounded Contexts.',
    mecanetFull: 'Academic project for machinery, asset and preventive maintenance control. I collaborated on applying Domain-Driven Design, layered architecture, CQRS and Bounded Contexts to organize domain logic and improve traceability.',
    mecanetProblem: 'Machinery and maintenance operations need clearer domain organization and traceability.',
    sudokuShort: 'Python implementation and comparison of Brute Force and Backtracking algorithms for Sudoku-solving performance analysis.',
    sudokuFull: 'Academic algorithm analysis project. I participated in implementing Brute Force and Backtracking in Python, comparing response times, computational complexity and efficiency.',
    sudokuProblem: 'Sudoku algorithms need to be compared by response time, computational complexity and efficiency.',

    // Certifications
    certLabel: 'Certifications',
    certTitle: 'Certifications',
    certHighlight: 'and Courses',
    viewAllCerts: 'View all certificates',
    showLess: 'Show less',

    // Contact
    contactGetInTouch: 'Get in touch:',
    role: 'Software Engineering Student · Analytics, ML & Applied AI',

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
    heroPrefix: 'Construyo software y',
    heroHighlight: 'soluciones basadas en datos',
    heroSuffix: 'con analítica, ML e IA aplicada.',
    heroRole: 'Estudiante de Ingeniería de Software',
    heroSub: 'Analytics · Machine Learning · IA aplicada',
    heroDesc: 'Construyo software y soluciones basadas en datos enfocadas en resolver problemas reales.',
    downloadCv: 'Descargar CV',
    viewProjects: 'Ver Proyectos',
    badge1: 'Python',
    badge2: 'SQL',
    badge3: 'Power BI',
    badge4: 'Pandas',
    badge5: 'Scikit-learn',
    badge6: 'FastAPI',

    // About
    aboutLabel: 'Sobre mí',
    aboutTitle: 'Sobre',
    aboutHighlight: 'Mí',
    aboutP1: 'Soy estudiante de <strong>Ingeniería de Software</strong> en la <strong>Universidad Peruana de Ciencias Aplicadas (UPC)</strong>, y pertenezco al <strong>décimo superior</strong>. Me interesa desarrollar soluciones que combinen software, datos e inteligencia artificial, con una base en Python, bases de datos, desarrollo de aplicaciones y lógica algorítmica.',
    aboutP2: 'A través de proyectos académicos y personales, he trabajado en desarrollo de software, análisis de datos, machine learning, APIs y sistemas web/móviles. Me gusta construir soluciones bien estructuradas, documentar el proceso y aplicar buenas prácticas para que el trabajo sea claro, mantenible y fácil de mejorar.',
    aboutP3: 'Actualmente estoy enfocada en desarrollo de software, Machine Learning e IA aplicada, especialmente en proyectos que utilicen datos y tecnología para resolver problemas operativos reales.',

    // Education
    eduLabel: 'Educación',
    eduTitle: 'Formación',
    eduHighlight: 'Académica',
    eduDegree: 'Ingeniería de Software',
    eduInstitution: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
    eduPeriod: 'Mar. 2023 — Presente',
    eduNote: 'Décimo superior. Formación y proyectos enfocados en desarrollo de software, bases de datos, algoritmos, arquitectura, testing y sistemas basados en datos.',

    // Skills
    skillsLabel: 'Habilidades',
    skillsTitle: 'Habilidades',
    skillsHighlight: 'Técnicas',
    skillsSubtitle: 'Herramientas y tecnologías usadas en proyectos de software, analítica, ML y datos.',
    skillLanguages: 'Lenguajes',
    skillFrameworks: 'Frameworks',
    skillSoftware: 'Desarrollo de Software',
    skillDatabases: 'Bases de Datos',
    skillDataMl: 'Data Analytics y ML',
    skillMLOps: 'MLOps y APIs',
    skillCloud: 'Nube y Hosting',
    skillTesting: 'Testing y Calidad',
    skillSoft: 'Habilidades Blandas',
    softResponsibility: 'Responsabilidad',
    softProactivity: 'Aprendizaje rápido',
    softTeamwork: 'Trabajo en equipo',
    softAdaptability: 'Adaptabilidad',

    // Projects
    projectsLabel: 'Proyectos',
    projectsTitle: 'Proyectos',
    projectsHighlight: 'Destacados',
    projectsSubtitle: 'Proyectos académicos y personales del CV, enfocados en software, análisis de datos y ML.',
    viewAllProjects: 'Ver mas proyectos',
    backToHome: 'Volver al inicio',
    allProjectsTitle: 'Todos los',
    allProjectsHighlight: 'Proyectos',

    // Project descriptions
    projectProblem: 'Problema',
    projectSource: 'GitHub',
    projectDemo: 'Ver demo',
    miningShort: 'Pipeline analítico end-to-end en Python para simular, procesar y analizar datos operativos de equipos mineros orientados a mantenimiento predictivo.',
    miningFull: 'Proyecto personal con un flujo analítico end-to-end en Python para simular, procesar y analizar datos operativos de equipos mineros. Genera variables de riesgo por temperatura, vibración, horas de operación, carga e historial de fallas; compara modelos de clasificación; expone una API básica con FastAPI; registra métricas con MLflow e incluye documentación técnica.',
    miningProblem: 'Los datos operativos de equipos mineros deben procesarse y modelarse para estimar riesgo de falla.',
    agrotechShort: 'Solución inteligente de gestión agrícola con módulos Web, Mobile y API desacoplados, enfocada en escalabilidad, mantenibilidad y validación de flujos críticos.',
    agrotechFull: 'Proyecto académico de gestión inteligente de granjas con módulos Web, Mobile y API desacoplados. Colaboré en la validación de flujos críticos como autenticación, gestión de usuarios y roles mediante pruebas unitarias, integración y escenarios BDD con Gherkin/Cucumber.',
    agrotechProblem: 'La gestión agrícola requiere módulos escalables y validación confiable de autenticación, usuarios y roles.',
    mecanetShort: 'Plataforma web para control operativo de maquinaria, activos y mantenimiento preventivo aplicando DDD, arquitectura por capas, CQRS y Bounded Contexts.',
    mecanetFull: 'Proyecto académico para el control de maquinaria, activos y mantenimiento preventivo. Colaboré en la aplicación de Domain-Driven Design, arquitectura por capas, CQRS y Bounded Contexts para organizar la lógica del dominio y mejorar la trazabilidad.',
    mecanetProblem: 'Las operaciones de maquinaria y mantenimiento necesitan mejor organización de dominio y trazabilidad.',
    sudokuShort: 'Implementación en Python y comparación de algoritmos de Fuerza Bruta y Backtracking para analizar rendimiento resolviendo Sudoku.',
    sudokuFull: 'Proyecto académico de análisis de algoritmos. Participé en la implementación en Python de Fuerza Bruta y Backtracking, comparando tiempos de respuesta, complejidad computacional y eficiencia.',
    sudokuProblem: 'Los algoritmos de Sudoku deben compararse por tiempo de respuesta, complejidad computacional y eficiencia.',

    // Certifications
    certLabel: 'Certificaciones',
    certTitle: 'Certificaciones',
    certHighlight: 'y Cursos',
    viewAllCerts: 'Ver todos los certificados',
    showLess: 'Ver menos',

    // Contact
    contactGetInTouch: 'Contáctame:',
    role: 'Estudiante de Ingeniería de Software · Analytics, ML e IA aplicada',

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
