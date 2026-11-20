/**
 * ============================================================================
 *  PORTFOLIO CONTENT — single source of truth
 * ============================================================================
 *  Every piece of text, link and list on the site comes from this file.
 *  Edit it and the UI updates; no component changes are needed.
 *
 *  Rules of thumb:
 *   • Empty string ('') for a URL / email / phone hides that element.
 *   • Only add real, public GitHub / live URLs.
 *   • Only add verified testimonials (the section is hidden while empty).
 *   • This file must stay pure data (no imports of images/components) because
 *     vite.config.ts also reads it to generate SEO tags and sitemap.xml.
 * ============================================================================
 */
import type { PortfolioConfig, ProjectImage } from '../types/portfolio';

/** Shorthand for a 1280px-wide project screenshot stored at /public/images/projects/<slug>-<n>.webp */
const shot = (slug: string, n: number, height: number, alt: string): ProjectImage => ({
  src: `/images/projects/${slug}-${n}.webp`,
  alt,
  width: 1280,
  height,
});

export const portfolio: PortfolioConfig = {
  personal: {
    name: 'Sagar Patel',
    shortName: 'SP',
    title: 'Software Developer | Java, Spring Boot & Microservices | Flutter',
    location: 'Indore, Madhya Pradesh, India',
    availability: 'Open to full-time roles & freelance projects',
  },

  navigation: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'opensource', label: 'Open Source' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ],

  // Empty URLs are hidden automatically.
  socials: [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/Sagar9098' },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/sagar-patel-6453832b5' },
  ],

  hero: {
    greeting: "Hi, I'm",
    headline:
      'Building Scalable Backend Systems, Modern Web Applications & Cross-Platform Mobile Experiences.',
    intro:
      'Software developer with 2.5+ years of experience — building secure REST APIs and microservices with Java and Spring Boot, and production Flutter apps for Android, iOS and Web.',
    ctas: {
      projects: 'View Projects',
      resume: 'Download Resume',
      contact: 'Contact Me',
    },
    orbitCenterLabel: 'Full Stack',
    innerRingCount: 4,
    orbit: ['Java', 'Spring Boot', 'Microservices', 'Flutter', 'Dart', 'MySQL', 'REST APIs', 'JWT', 'Docker', 'Firebase', 'React'],
  },

  about: {
    eyebrow: 'About',
    title: 'Engineering across backend, web and mobile',
    description: 'A developer who cares about clean architecture and shipping reliable software.',
    paragraphs: [
      'I am a software developer with 2.5+ years of professional experience — including hands-on backend development in Java and Spring Boot and 2.5 years building cross-platform mobile apps with Flutter and Dart.',
      'On the JobX24 job portal I personally built the RESTful APIs, service-layer business logic, JPA/Hibernate persistence on MySQL and JWT-based authentication for both candidate and employer modules — alongside the Flutter app that consumes them.',
      'My current focus is Java / Spring Boot backend development and microservices. I care about layered, maintainable code (Controller → Service → Repository), secure APIs, testing, and automated CI/CD. I also publish open-source Flutter packages on pub.dev.',
    ],
    highlights: [
      {
        icon: 'server',
        title: 'Java & Spring Boot',
        description: 'RESTful APIs, Spring Data JPA / Hibernate, JWT authentication and Maven builds.',
      },
      {
        icon: 'workflow',
        title: 'Microservices',
        description: 'Independent Spring Boot services communicating over REST, built and deployed separately.',
      },
      {
        icon: 'smartphone',
        title: 'Flutter & Dart',
        description: 'Cross-platform Android, iOS and Web apps with BLoC, Cubit, GetX and Provider.',
      },
      {
        icon: 'layers',
        title: 'Clean Architecture',
        description: 'Controller → Service → Repository layering, MVVM and Clean Architecture.',
      },
      {
        icon: 'database',
        title: 'Databases',
        description: 'MySQL with JPA / Hibernate, MongoDB, SQLite; Hive and SharedPreferences on mobile.',
      },
      {
        icon: 'shield',
        title: 'Secure APIs',
        description: 'JWT-based authentication and role-based authorization for API endpoints.',
      },
      {
        icon: 'test',
        title: 'Testing & Debugging',
        description: 'API testing with Postman; unit and widget tests with Mockito.',
      },
      {
        icon: 'rocket',
        title: 'CI/CD & Releases',
        description: 'GitHub Actions pipelines, Play Store and App Store releases.',
      },
    ],
  },

  // Review this list and remove anything you would not be comfortable
  // discussing in an interview. `primary: true` marks core, everyday tools —
  // it is NOT a proficiency score.
  skills: {
    eyebrow: 'Skills',
    title: 'Technical toolkit',
    description: 'Technologies I use to design, build, test and ship software.',
    primaryLegend: 'Primary stack',
    categories: [
      {
        id: 'backend',
        title: 'Backend',
        icon: 'server',
        description: 'APIs, services, persistence and security.',
        skills: [
          { name: 'Java', primary: true },
          { name: 'Spring Boot', primary: true },
          { name: 'Microservices', primary: true },
          { name: 'REST APIs', primary: true },
          { name: 'Spring MVC' },
          { name: 'Spring Data JPA' },
          { name: 'Hibernate' },
          { name: 'JWT Authentication' },
          { name: 'Maven' },
          { name: 'MySQL' },
          { name: 'MongoDB' },
          { name: 'Kotlin (basic)' },
        ],
      },
      {
        id: 'frontend',
        title: 'Frontend',
        icon: 'layout',
        description: 'Responsive, typed user interfaces.',
        skills: [
          { name: 'React', primary: true },
          { name: 'TypeScript', primary: true },
          { name: 'JavaScript' },
          { name: 'HTML5' },
          { name: 'CSS3' },
          { name: 'Tailwind CSS' },
        ],
      },
      {
        id: 'mobile',
        title: 'Mobile',
        icon: 'smartphone',
        description: 'Cross-platform apps for Android and iOS.',
        skills: [
          { name: 'Flutter', primary: true },
          { name: 'Dart', primary: true },
          { name: 'BLoC' },
          { name: 'Cubit' },
          { name: 'GetX' },
          { name: 'Provider' },
          { name: 'Firebase' },
          { name: 'Hive' },
          { name: 'SQLite' },
          { name: 'Android' },
          { name: 'iOS' },
        ],
      },
      {
        id: 'tools',
        title: 'Tools & Testing',
        icon: 'wrench',
        description: 'Version control, infrastructure and quality.',
        skills: [
          { name: 'Git', primary: true },
          { name: 'GitHub' },
          { name: 'GitHub Actions' },
          { name: 'Postman' },
          { name: 'Docker' },
          { name: 'AWS' },
          { name: 'Redis' },
          { name: 'JUnit' },
          { name: 'Mockito' },
          { name: 'IntelliJ IDEA' },
        ],
      },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    title: 'Professional experience',
    entries: [
      {
        id: 'cserve',
        company: 'Cserve Technologies',
        role: 'Software Developer',
        employmentType: 'Java / Spring Boot Backend & Flutter Development',
        location: 'Indore, India',
        startDate: '2025-07-01',
        // endDate: omitted → shown as "Present"
        summary:
          'Independently own end-to-end delivery of production apps — from requirement gathering and technical design through backend APIs, mobile development, deployment and post-release support.',
        responsibilities: [
          'Developed and maintained RESTful APIs in Java and Spring Boot for the JobX24 job portal, covering candidate- and employer-side functionality.',
          'Implemented service-layer business logic for candidate profile management, job postings and employer workflows.',
          'Designed database entities and repositories with Spring Data JPA / Hibernate on MySQL.',
          'Implemented JWT-based authentication and authorization to secure candidate and employer API endpoints.',
          'Tested and debugged REST APIs with Postman; built and managed the backend project with Maven.',
          'Built the JobX24 Flutter app and other production apps for Android, iOS and Web using BLoC, GetX and Clean Architecture.',
          'Wrote unit and widget tests with Mockito and set up GitHub Actions CI/CD to automate build, test and release workflows.',
          'Improved performance with caching, lazy loading and Dart isolates; owned Play Store and App Store releases.',
        ],
        technologies: [
          'Java',
          'Spring Boot',
          'Spring Data JPA',
          'Hibernate',
          'MySQL',
          'JWT',
          'Maven',
          'Postman',
          'Flutter',
          'Dart',
          'BLoC',
          'GetX',
          'WebSocket',
          'Mockito',
          'GitHub Actions',
        ],
      },
      {
        id: 'bellway-infotech',
        company: 'Bellway Infotech',
        companyUrl: 'https://bellwayinfotech.com/',
        role: 'Flutter Developer',
        location: 'Indore, India',
        startDate: '2024-02-01',
        endDate: '2025-03-31',
        responsibilities: [
          'Developed cross-platform Flutter apps using Provider and GetX for real-time business workflows.',
          'Integrated REST APIs, Firebase services, local storage (Hive, SharedPreferences) and third-party SDKs.',
          'Built a multi-role POS app for vendors, admins, employees and cutters with role-based access control.',
          'Implemented authentication, wishlist and inquiry/contact modules.',
          'Diagnosed and resolved performance bottlenecks and UI bugs, improving app stability and responsiveness.',
        ],
        technologies: ['Flutter', 'Dart', 'Provider', 'GetX', 'REST APIs', 'Firebase', 'Hive'],
      },
    ],
  },

  education: {
    eyebrow: 'Education',
    title: 'Academic background',
    entries: [
      {
        id: 'mca-medicaps',
        degree: 'Master of Computer Applications (MCA)',
        institution: 'Medicaps University',
        institutionUrl: 'https://www.medicaps.ac.in/',
        location: 'Indore, India',
        startYear: 2022,
        endYear: 2024,
        logo: { src: '/images/education/medicaps-university.webp', alt: 'Medicaps University logo' },
      },
      {
        id: 'bcom-pcg-khandwa',
        degree: 'Bachelor of Commerce (B.Com)',
        field: 'Computer Application',
        institution: 'PCG College Khandwa',
        affiliation: 'Devi Ahilya Vishwavidyalaya (DAVV)',
        location: 'Khandwa, India',
        startYear: 2019,
        endYear: 2022,
        // PCG College has no logo online — the affiliating university's (DAVV) emblem is used.
        logo: { src: '/images/education/davv.webp', alt: 'Devi Ahilya Vishwavidyalaya emblem' },
      },
    ],
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Selected work',
    description: 'Applications I have built or contributed to across mobile, web and backend.',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'backend', label: 'Backend' },
      { id: 'fullstack', label: 'Full Stack' },
      { id: 'web', label: 'Web' },
      { id: 'mobile', label: 'Mobile' },
    ],
    categoryLabels: {
      backend: 'Backend',
      fullstack: 'Full Stack',
      web: 'Web',
      mobile: 'Mobile',
    },
    emptyState: {
      title: 'Projects coming soon',
      description: 'New projects in this category are being prepared and will be added here shortly.',
    },
    /*
     * To add a project (e.g. a Java / Spring Boot backend project), append an
     * object below. Example:
     *
     * {
     *   slug: 'order-service',
     *   title: 'Order Service API',
     *   category: 'backend',
     *   typeLabel: 'Backend Service',
     *   summary: 'One-line overview shown on the card.',
     *   description: 'Longer description shown in the details dialog.',
     *   features: ['JWT authentication', 'Paginated REST endpoints'],
     *   technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL'],
     *   image: { src: '/images/projects/order-service.webp', alt: 'Order Service API docs', width: 1200, height: 750 },
     *   githubUrl: 'https://github.com/<you>/<repo>',
     *   liveUrl: '',
     * },
     */
    items: [
      {
        slug: 'jobx24',
        title: 'JobX24 — Job Search & Recruitment Platform',
        category: 'fullstack',
        typeLabel: 'Spring Boot API + Flutter App',
        summary:
          'Job portal with a Java / Spring Boot REST backend and a Flutter app — candidate & employer modules, JWT auth and real-time chat.',
        description:
          'A recruitment platform with candidate and employer modules. I built both the Java / Spring Boot backend (REST APIs, business logic, persistence and security) and the Flutter application that consumes it.',
        solution:
          'Backend: REST controllers for job postings, applications and profile management; service-layer business logic; Spring Data JPA / Hibernate persistence on MySQL; JWT-based authentication and authorization; APIs tested with Postman and built with Maven. Frontend: a candidate- and employer-facing Flutter app integrated with the APIs, real-time chat over WebSockets, and response caching plus lazy loading of job listings.',
        features: [
          'REST APIs for job postings, applications & profiles',
          'Service-layer business logic (Controller → Service → Repository)',
          'Spring Data JPA / Hibernate persistence on MySQL',
          'JWT authentication & role-based access for candidates and employers',
          'Flutter app for candidates and employers',
          'Real-time candidate–employer chat (WebSockets)',
          'Job search, filtering, resume upload & push notifications',
          '~30% faster app load via API optimisation, caching and lazy loading',
        ],
        technologies: [
          'Java',
          'Spring Boot',
          'Spring Data JPA',
          'Hibernate',
          'MySQL',
          'JWT',
          'Maven',
          'Postman',
          'Flutter',
          'Dart',
          'BLoC',
          'WebSocket',
          'Firebase',
        ],
        role: 'Backend (Java / Spring Boot) & Flutter Developer',
        organization: 'Cserve Technologies',
      },
      // ---------------------------------------------------------------------
      // Projects delivered with Bellway Infotech (source: bellwayinfotech.com)
      // Fields marked "DUMMY" were not available on the site — replace them.
      // ---------------------------------------------------------------------
      {
        slug: 'devbhakti-spiritual-platform',
        title: 'DevBhakti Spiritual Platform',
        category: 'fullstack',
        typeLabel: 'Full Stack Web Platform',
        summary:
          'Spiritual platform connecting devotees with temples — ritual-item marketplace, live darshan streaming and digital contributions.',
        description:
          'A comprehensive spiritual ecosystem connecting devotees globally with sacred temples, an authentic ritual-items marketplace, and live streaming of holy darshans with seamless digital contribution workflows.',
        challenge:
          'The client needed a unified platform bridging temple traditions and modern devotees. Donation collection was fragmented, there was no central store for authentic prasad and sacred items, and live-stream feeds suffered latency and drop-offs during high-traffic festivals such as Navratri and Diwali.',
        solution:
          'A scalable web platform with secure payment gateways for temple contributions, low-latency real-time video streaming for live darshans, a multi-vendor marketplace for sacred items and pooja essentials, and an inventory dashboard for temple administrators to track stock and daily pooja bookings.',
        features: [
          'Secure online temple contributions',
          'Low-latency live darshan streaming',
          'Multi-vendor sacred-items marketplace',
          'Inventory & pooja-booking admin dashboard',
        ],
        technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'WebRTC', 'Razorpay API', 'AWS S3'],
        image: shot('devbhakti-spiritual-platform', 1, 714, 'DevBhakti sacred marketplace on a laptop'),
        gallery: [
          shot('devbhakti-spiritual-platform', 2, 714, 'DevBhakti platform screen'),
          shot('devbhakti-spiritual-platform', 3, 2293, 'DevBhakti full page view'),
        ],
        role: 'Full Stack Developer', // DUMMY — replace with your actual role
        organization: 'Bellway Infotech',
        client: 'DevBhakti Foundation',
        industry: 'Spiritual & E-Commerce',
        clientLocation: 'London, United Kingdom',
        duration: '16 weeks',
        clientReview: {
          quote:
            'DevBhakti has completely transformed how our devotees engage with sacred rituals from across the world. The live darshan streaming is crystal clear even during peak festive hours, and the digital contribution system is smooth and trustworthy. The team delivered the project right on schedule with exceptional attention to detail.',
          author: 'Mr. Siddharth',
          role: 'Managing Trustee, DevBhakti Foundation',
        },
        liveUrl: 'https://devbhakti.com',
      },
      {
        slug: 'reiac-luxe-premium-sneakers',
        title: 'REIAC LUXE E-Commerce Platform',
        category: 'fullstack',
        typeLabel: 'E-Commerce Platform',
        summary:
          'Luxury e-commerce platform for limited-edition sneakers, streetwear and accessories with high-concurrency checkout.',
        description:
          'A high-end e-commerce platform offering curated limited-edition sneakers, luxury streetwear and exclusive accessories with seamless browsing and secure checkout.',
        challenge:
          'Sales channels for limited-edition drops were fragmented, flash sales suffered high latency and cart abandonment, product detail could not be shown in high resolution, and there was no proper inventory system for SKU variations (size, colour).',
        solution:
          'A high-performance e-commerce platform on a JAMstack architecture with high-fidelity product configurators, checkout optimised for high concurrency during limited drops, automated stock synchronisation with physical retail locations, and a recommendation engine for cross-selling accessories.',
        features: [
          'High-concurrency checkout for limited drops',
          'High-fidelity product configurator',
          'Size / colour SKU inventory management',
          'Stock sync with physical stores',
          'Accessory recommendation engine',
        ],
        // NOTE: stack copied as published on bellwayinfotech.com — "HL7 FHIR" / "AWS KMS" look
        // like a copy-paste error on that site. Verify and edit.
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'HL7 FHIR', 'AWS KMS', 'Docker'],
        image: shot('reiac-luxe-premium-sneakers', 1, 796, 'REIAC LUXE storefront'),
        gallery: [
          shot('reiac-luxe-premium-sneakers', 2, 796, 'REIAC LUXE product screen'),
          shot('reiac-luxe-premium-sneakers', 3, 2293, 'REIAC LUXE full page view'),
        ],
        role: 'Full Stack Developer', // DUMMY — replace with your actual role
        organization: 'Bellway Infotech',
        client: 'REIAC Holdings Pvt. Ltd.',
        industry: 'Luxury Fashion & E-Tail',
        clientLocation: 'Zurich, Switzerland',
        duration: '20 weeks',
        clientReview: {
          quote:
            "REIAC LUXE has completely revolutionized our online sales. The platform's ability to handle high-traffic 'drops' without crashing is incredible. The visual fidelity of our sneakers online matches the in-store experience, and our conversion rate has soared. The team delivered a masterpiece on time.",
          author: '올리프라빈',
          role: 'CEO, REIAC Holdings Pvt. Ltd.',
        },
        liveUrl: 'https://reiac.bellwayinfotech.in/',
      },
      {
        slug: 'reiac-global-education',
        title: 'REIAC Consulting — Global Education & Visa Platform',
        category: 'fullstack',
        typeLabel: 'Full Stack Web Application',
        summary:
          'Consultancy platform for international students — university admissions, visa workflows and F-2-7 points calculation.',
        description:
          'An end-to-end digital consultancy platform for international students and institutional partners, streamlining global university admissions, visa application workflows and F-2-7 visa point calculations.',
        challenge:
          'A manual recruitment and visa consultancy struggled to track multi-stage document verification, handle student enquiries from South Korea and Bangladesh, and coordinate regional agents with university admission desks in real time.',
        solution:
          'A web application with a role-based admin dashboard, automated visa and university application tracking pipelines, multi-currency commission tracking for agents, and an interactive F-2-7 points calculator for student visa assessment.',
        features: [
          'Role-based admin dashboard',
          'Visa & admission application tracking',
          'Multi-currency agent commissions',
          'Interactive F-2-7 points calculator',
        ],
        technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS S3', 'REST APIs'],
        image: shot('reiac-global-education', 1, 796, 'REIAC Consulting education platform'),
        gallery: [
          shot('reiac-global-education', 2, 641, 'REIAC Consulting application dashboard'),
          shot('reiac-global-education', 3, 2293, 'REIAC Consulting full page view'),
        ],
        role: 'Full Stack Developer', // DUMMY — replace with your actual role
        organization: 'Bellway Infotech',
        client: 'REIAC Global',
        industry: 'EdTech & International Student Recruitment',
        clientLocation: 'Rotterdam & Singapore',
        duration: '18 weeks',
        clientReview: {
          quote:
            "REIAC's new digital platform has streamlined our entire student intake and visa application workflow. Our operational efficiency has doubled, and students can track their visa lodgement statuses in real-time without manual follow-ups.",
          author: 'Mr. Prabeen Koli',
          role: 'Operations Director, REIAC Global',
        },
        liveUrl: 'https://reiaconsultancy.com/',
      },
      {
        slug: 'sn-nutrition-store',
        title: 'SN Nutrition — Health & Wellness Store',
        category: 'fullstack',
        typeLabel: 'E-Commerce Platform',
        summary:
          'Health and wellness e-commerce store with category filtering, promotional bundles and low-stock inventory alerts.',
        description:
          'A health and wellness e-commerce platform offering nutritional supplements, collagen formulations, vitamins and specialised dietary products, with seamless checkout and automated inventory tracking.',
        challenge:
          'The client needed a high-performance store for the supplement market in Morocco with multi-category filtering (Hair, Skin & Nails, Digestion, Energy, Men & Women), multi-language and MAD currency support, promotional bundles, and real-time alerts to prevent stock-outs on bestsellers.',
        solution:
          'A fully responsive e-commerce web application with an optimised product discovery engine, secure payment gateways, dynamic cart discounts for promotional bundles, and an admin dashboard for daily orders, revenue and low-stock alerts.',
        features: [
          'Multi-category product discovery',
          'Promotional bundle discounts',
          'Secure payment integration',
          'Orders, revenue & low-stock admin dashboard',
        ],
        technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe', 'AWS S3'],
        image: shot('sn-nutrition-store', 1, 796, 'SN Nutrition storefront'),
        gallery: [
          shot('sn-nutrition-store', 2, 796, 'SN Nutrition product listing'),
          shot('sn-nutrition-store', 3, 2293, 'SN Nutrition full page view'),
        ],
        role: 'Full Stack Developer', // DUMMY — replace with your actual role
        organization: 'Bellway Infotech',
        client: 'SN Nutrition SARL',
        industry: 'Health, Wellness & E-Commerce',
        clientLocation: 'Munich, Germany',
        duration: '24 weeks',
        clientReview: {
          quote:
            "SN Nutrition's online store has significantly boosted our online sales and customer engagement. The smooth checkout process and clean category navigation make it extremely easy for our customers to find their favorite wellness supplements.",
          author: 'Fatima Zahra',
          role: 'Founder & Managing Director, SN Nutrition',
        },
        liveUrl: 'https://sn-nutrition.com',
      },
      {
        slug: 'farmstay-india',
        title: 'FarmStay India — Farmhouse & Villa Booking',
        category: 'fullstack',
        typeLabel: 'Booking Platform',
        summary:
          'Booking platform for farmhouses, villas and homestays across India with availability calendar and host dashboard.',
        description:
          'An online booking platform for discovering and reserving farmhouses, villas and homestays across India, focused on nature-centric getaways for weekend travellers and families.',
        challenge:
          'The client needed a marketplace connecting urban travellers with rural property owners who lacked online visibility — with search and filtering by city and stay type, a seamless booking flow with integrated payments, and verified listings to build trust.',
        solution:
          'A responsive web application and mobile interface with a property search engine, dynamic availability calendar, secure payment integration and detailed listing pages (gallery, amenities, host info), plus a host dashboard for property management and an admin panel for verification.',
        features: [
          'Search & filter by city and stay type',
          'Dynamic availability calendar',
          'Integrated online payments',
          'Host dashboard & admin verification panel',
        ],
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS S3', 'Razorpay / Stripe', 'Google Maps API', 'Tailwind CSS'],
        image: shot('farmstay-india', 1, 796, 'FarmStay India property search'),
        gallery: [
          shot('farmstay-india', 2, 796, 'FarmStay India host dashboard'),
          shot('farmstay-india', 3, 2293, 'FarmStay India full page view'),
        ],
        role: 'Full Stack Developer', // DUMMY — replace with your actual role
        organization: 'Bellway Infotech',
        client: 'FarmStayGo',
        industry: 'Farmhouse & Villa Booking',
        clientLocation: 'India', // DUMMY — not stated on the source site
        duration: '12 weeks', // DUMMY — not stated on the source site
        clientReview: {
          quote:
            "FarmStay India has revolutionized our business. We've seen a 300% increase in bookings since launching the platform. The team understood our vision perfectly, especially the need to highlight the 'comfort and memories' aspect of our properties. The site is fast, reliable, and easy for both guests and hosts to use.",
          author: 'Mr. Jaspreet',
          role: 'Founder & CEO, FarmStayGo',
        },
        liveUrl: 'https://farmstayindia.com',
      },
      {
        slug: 'avilable-store',
        title: 'Avilable — Mobile Accessories Store',
        category: 'fullstack',
        typeLabel: 'E-Commerce Platform',
        summary:
          'E-commerce store for mobile accessories and audio gear with mega-menu navigation, instant search and promotions.',
        description:
          'A feature-rich e-commerce platform for mobile accessories, ergonomic study stands, Bluetooth speakers and wireless audio devices, with fast search and secure checkout.',
        challenge:
          'The client needed a high-converting storefront with mega-menu navigation across categories (Mobiles, Accessories, Cases, Home & Living), promotional banner sliders for seasonal sales, and a frictionless cart and checkout to reduce abandonment.',
        solution:
          'A responsive e-commerce platform with dynamic product grids, instant search filters, promotional discount management and a streamlined cart, plus an admin dashboard for inventory and order management.',
        features: [
          'Mega-menu category navigation',
          'Instant search & filters',
          'Promotional discount management',
          'Inventory & order admin dashboard',
        ],
        technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Stripe / Razorpay', 'AWS'],
        image: shot('avilable-store', 1, 801, 'Avilable storefront'),
        gallery: [
          shot('avilable-store', 2, 801, 'Avilable product listing'),
          { src: '/images/projects/avilable-store-3.webp', alt: 'Avilable mobile view', width: 374, height: 838 },
        ],
        role: 'Full Stack Developer', // DUMMY — replace with your actual role
        organization: 'Bellway Infotech',
        client: 'Avilable Retail',
        industry: 'Consumer Electronics & E-Commerce',
        clientLocation: 'India', // DUMMY — not stated on the source site
        duration: '10 weeks', // DUMMY — not stated on the source site
        clientReview: {
          quote:
            'The Avilable web platform has exceeded our expectations. The UI is clean, lightning-fast, and our customers love the smooth shopping experience across mobile and desktop devices. Sales have grown significantly since launch.',
          author: 'Mr. Ajit',
          role: 'Co-Founder & CTO, Avilable Retail',
        },
        liveUrl: 'https://avilable.in',
      },
      // ---------------------------------------------------------------------
      // Projects from the resumes (Flutter + Java/Spring Boot versions)
      // ---------------------------------------------------------------------
      {
        slug: 'sampatti',
        title: 'Sampatti — Real Estate Marketplace',
        category: 'mobile',
        typeLabel: 'Freelance · Cross-Platform App (Android, iOS & Web)',
        summary:
          'Real estate marketplace to browse, buy and sell properties, with advanced search, Google Maps and wishlists.',
        description:
          'A real estate marketplace enabling users to browse, buy and sell properties, delivered with a responsive UI across Android, iOS and Web.',
        features: [
          'Property listings & detailed property pages',
          'Advanced search and filtering',
          'Google Maps integration',
          'Authentication',
          'Wishlist',
          'Inquiry / contact module',
        ],
        // NOTE: the original brief described Sampatti as React + Java / Spring Boot;
        // both resumes list Flutter. Edit if the web version used a different stack.
        technologies: ['Flutter', 'Dart', 'REST APIs', 'Google Maps', 'Firebase'],
        role: 'Freelance Flutter Developer',
        organization: 'Freelance',
        githubUrl: 'https://github.com/Sagar9098/sampatti_',
      },
      {
        slug: 'sampatti-home-services',
        title: 'Sampatti Home Services',
        category: 'mobile',
        typeLabel: 'Freelance · Cross-Platform App',
        // DUMMY — summary, description, features and stack are placeholders. Replace with real details.
        summary:
          'Home services app for booking verified professionals — cleaning, repairs, plumbing, electrical and more.',
        description:
          'A home services platform where customers browse service categories, book verified professionals for a time slot and track their bookings, with an admin side for managing services and providers.',
        features: [
          'Service categories & listings',
          'Slot-based booking',
          'Booking tracking & history',
          'Authentication & user profiles',
          'Push notifications',
          'Provider / admin management',
        ],
        technologies: ['Flutter', 'Dart', 'REST APIs', 'Firebase', 'Google Maps'],
        role: 'Freelance Flutter Developer',
        organization: 'Freelance',
      },
      {
        slug: 'ugo-fitness',
        title: 'UGO Fitness — Gym Discovery & Smart Check-In',
        category: 'mobile',
        typeLabel: 'Mobile Application',
        summary:
          'Gym discovery and membership app with QR / NFC smart check-in, subscriptions, attendance and payments.',
        description:
          'A fitness platform for discovering gyms and managing memberships, with QR- and NFC-based smart check-in, location-based services and integrated payments.',
        features: [
          'Gym discovery with Google Maps',
          'QR & NFC smart check-in',
          'Subscription and membership management',
          'Attendance tracking',
          'Payment gateway integration (Stripe)',
          'Push notifications',
          'Dark & light mode',
        ],
        technologies: ['Flutter', 'Dart', 'GetX', 'Firebase', 'QR / NFC', 'Google Maps', 'Stripe', 'REST APIs'],
        role: 'Flutter Developer',
        organization: 'Cserve Technologies',
      },
      {
        slug: 'xodox-crm-hrms',
        title: 'Xodox CRM / HRMS — Employee Management',
        category: 'mobile',
        typeLabel: 'Mobile Application',
        summary:
          'Employee management CRM with check-in / check-out, leave, projects, tasks, dashboards and real-time sync.',
        description:
          'A business management and workflow-automation application covering attendance with check-in / check-out, leave management, projects, tasks, dashboards and notifications, with real-time synchronisation of attendance and workflow data.',
        features: [
          'Attendance with check-in / check-out',
          'Leave management',
          'Projects and task tracking',
          'Dashboards',
          'Notifications',
          'Real-time sync for attendance & workflows',
        ],
        technologies: ['Flutter', 'Dart', 'BLoC', 'REST APIs', 'Real-time Sync'],
        role: 'Flutter Developer',
        organization: 'Cserve Technologies',
      },
      {
        slug: 'ott-hum',
        title: 'OTT Hum — Video Streaming Platform',
        category: 'mobile',
        typeLabel: 'Cross-Platform App',
        summary: 'Cross-platform OTT app with video playback, subscriptions, watch history and deep links.',
        description:
          'A cross-platform OTT streaming app supporting video playback, subscriptions and watch-history tracking, with dynamic content updates delivered through APIs.',
        features: [
          'Video playback',
          'Subscriptions',
          'Watch-history tracking',
          '~20% faster startup via optimised media loading & caching',
          'Native integration via MethodChannel',
          'Dynamic content via APIs',
          'Deep link handling',
        ],
        technologies: ['Flutter', 'Dart', 'REST APIs', 'MethodChannel', 'Deep Links', 'Firebase'],
        role: 'Flutter Developer',
      },
      {
        slug: 'tailoring-pos',
        title: 'POS — Custom Tailoring & Clothing Business App',
        category: 'mobile',
        typeLabel: 'Mobile Application',
        summary:
          'Multi-role POS for a tailoring business — billing, orders, progress tracking and raw-material distribution.',
        description:
          'A multi-role Point-of-Sale and management app for a custom tailoring and clothing business, supporting vendors, admins, employees and cutters with role-based access control.',
        features: [
          'Role-based access: vendors, admins, employees, cutters',
          'Billing and order creation',
          'Order progress tracking',
          'Raw-material distribution',
          'Task status workflows',
        ],
        technologies: ['Flutter', 'Dart', 'Provider', 'GetX', 'REST APIs', 'Role-Based Access Control'],
        role: 'Flutter Developer',
        organization: 'Bellway Infotech',
      },
      {
        slug: 'madebymaa-seller',
        title: 'MadeByMaa — Seller App',
        category: 'mobile',
        typeLabel: 'Mobile Application',
        summary: 'Seller app for managing product listings, orders and inventory, with push notifications.',
        description:
          'A seller app for managing product listings, orders and inventory, with a responsive UI for Android and iOS.',
        features: ['Product listing management', 'Order management & tracking', 'Inventory management', 'Authentication', 'Push notifications'],
        technologies: ['Flutter', 'Dart', 'REST APIs', 'Firebase'],
        role: 'Flutter Developer',
      },
      {
        slug: 'xodoxhelp',
        title: 'XodoxHelp',
        category: 'web',
        typeLabel: 'Web Application',
        summary: 'Support and knowledge-base platform with customer support and admin management.',
        description:
          'A support and knowledge-base platform providing customer support functionality alongside administrative management tools.',
        features: ['Knowledge base', 'Customer support functionality', 'Administrative management'],
        technologies: ['React', 'TypeScript', 'Laravel', 'MySQL'],
      },
    ],
    additionalTitle: 'Other projects',
    // Smaller projects listed by name. Add `description` to show a one-liner.
    additional: [
      { title: 'E-commerce App' },
      { title: 'Carnet', description: 'Car spare parts app' },
      { title: 'Multivendor Food Applications' },
      { title: 'Rent Management App', url: 'https://github.com/Sagar9098/rent_management' },
      { title: 'MV Grocery' },
      { title: 'Intrust Finance App' },
      { title: 'Online Store Web' },
      { title: 'Calculator', description: 'Khatabook-style billing app' },
      { title: 'Desigro', description: 'Dairy management app' },
    ],
  },

  services: {
    eyebrow: 'Services',
    title: 'How I can help',
    description: 'Available for full-time roles, freelance engagements and agency collaborations.',
    items: [
      {
        icon: 'server',
        title: 'Java Backend Development',
        description: 'Server-side applications in Java with a layered, maintainable structure.',
      },
      {
        icon: 'braces',
        title: 'Spring Boot REST API Development',
        description: 'REST APIs with Spring Boot, Spring Data JPA, validation and JWT authentication.',
      },
      {
        icon: 'workflow',
        title: 'Microservices Development',
        description: 'Independent, loosely coupled Spring Boot services with clear APIs, ready to build and deploy separately.',
      },
      {
        icon: 'layout',
        title: 'React Frontend Development',
        description: 'Responsive, accessible interfaces built with React, TypeScript and Tailwind CSS.',
      },
      {
        icon: 'smartphone',
        title: 'Flutter Android & iOS Development',
        description: 'Cross-platform mobile apps from a single Flutter codebase.',
      },
      {
        icon: 'layers',
        title: 'Full Stack Application Development',
        description: 'End-to-end features spanning database, API and user interface.',
      },
      {
        icon: 'plug',
        title: 'Third-Party API Integration',
        description: 'Payments, maps, push notifications and other external services.',
      },
      {
        icon: 'wrench',
        title: 'Application Maintenance & Bug Fixing',
        description: 'Diagnosing issues, fixing defects and keeping existing apps healthy.',
      },
    ],
  },

  // Open-source packages (source: github.com/Sagar9098 and pub.dev).
  // `packageUrl` is optional — omit it for repos that are not published.
  openSource: {
    eyebrow: 'Open Source',
    title: 'Open-source packages',
    description: 'Flutter / Dart packages and tools I have built and published for the developer community.',
    profileUrl: 'https://github.com/Sagar9098',
    profileLabel: 'View all repositories on GitHub',
    items: [
      {
        name: 'universal_file_handler',
        description:
          'Zero-dependency Flutter package to open, view, cache and share files in-app. Built-in viewers for images, PDF, Word, Excel, CSV, PowerPoint, text and ZIP.',
        tags: ['Flutter', 'Dart', 'File viewer', 'Caching'],
        githubUrl: 'https://github.com/Sagar9098/universal_file_handler',
        packageUrl: 'https://pub.dev/packages/universal_file_handler',
      },
      {
        name: 'clean_arch_builder',
        description:
          'Production-ready Dart CLI that generates scalable Flutter Clean Architecture feature modules — shared core, config and reusable modules with minimal boilerplate.',
        tags: ['Dart', 'CLI', 'Clean Architecture', 'Code generation'],
        githubUrl: 'https://github.com/Sagar9098/clean_arch_builder',
        packageUrl: 'https://pub.dev/packages/clean_arch_builder',
      },
      {
        name: 'flutter_x_unity',
        description:
          'Modular Flutter plugin for embedding Unity as a Library, with version-aware native adapters, robust lifecycle management and automated setup.',
        tags: ['Flutter', 'Plugin', 'Unity', 'Native'],
        githubUrl: 'https://github.com/Sagar9098/flutter_x_unity',
        packageUrl: 'https://pub.dev/packages/flutter_x_unity',
      },
      {
        name: 'xecosystem',
        description: 'Opinionated Flutter UI + API ecosystem. Zero boilerplate, full freedom.',
        tags: ['Flutter', 'UI kit', 'API layer'],
        githubUrl: 'https://github.com/Sagar9098/xecosystem',
        packageUrl: 'https://pub.dev/packages/xecosystem',
      },
      {
        name: 'GlassXios',
        description:
          'Flutter package bringing native iOS liquid-glass UI via UIVisualEffectView, with automatic fallback for Android and Web and adaptive widgets such as GlassXMaterialApp.',
        tags: ['Flutter', 'iOS', 'Glassmorphism', 'Native'],
        githubUrl: 'https://github.com/Sagar9098/GlassXios',
      },
    ],
  },

  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What people say',
    // Only add verified testimonials. The section stays hidden while empty.
    items: [],
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's build something together",
    description:
      'Have a role, a project or a question? Send a message and I will get back to you as soon as possible.',
    // Public contact details. Empty values are hidden.
    email: 'sagargurjar301@gmail.com',
    phone: '+91 90986 46918',
    endpoint: '/api/contact',
    successMessage: 'Thanks for reaching out — your message has been sent. I will reply soon.',
    fallbackErrorMessage: 'Something went wrong while sending your message. Please try again later.',
  },

  resume: {
    // Place your resume at /public/resume.pdf, or set an absolute URL.
    // If the file is missing, the download button is hidden automatically.
    url: '/resume.pdf',
    fileName: 'Sagar-Patel-Resume.pdf',
  },

  seo: {
    title: 'Sagar Patel — Software Developer | Java, Spring Boot, Microservices & Flutter',
    description:
      'Portfolio of Sagar Patel, a software developer in Indore building secure REST APIs and microservices with Java and Spring Boot, and cross-platform apps with Flutter. Open-source Flutter packages on pub.dev.',
    keywords: [
      'Sagar Patel',
      'Software Developer',
      'Java Developer',
      'Spring Boot Developer',
      'Microservices',
      'Flutter Developer',
      'Backend Developer Indore',
      'Portfolio',
    ],
    // TODO: set your production URL (no trailing slash), e.g. 'https://sagarpatel.dev'.
    // If empty, the Vercel production domain is used at build time.
    siteUrl: '',
    ogImage: '',
    twitterHandle: '',
    locale: 'en_US',
  },

  appearance: {
    // 'system' follows the visitor's OS setting; 'dark' or 'light' forces a default.
    // A visitor's own choice from the toggle is remembered in their browser.
    defaultMode: 'system',
    showToggle: true,
    themeColor: { dark: '#070b14', light: '#eef2f7' },
  },

  footer: {
    tagline: 'Java · Spring Boot · Microservices · Flutter · Dart',
  },
};
