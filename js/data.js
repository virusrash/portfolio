/**
 * Centralized Content Configuration
 * M. Sandaru Rashmika — Cyber Security Specialist | Full Stack Developer | IT Professional
 * 
 * All portfolio information is configured here. Easily editable and safe for dynamic DOM rendering.
 */

export const portfolioData = {
  personal: {
    name: "M. Sandaru Rashmika",
    firstName: "M. SANDARU",
    lastName: "RASHMIKA",
    role: "Cyber Security Specialist | Full Stack Developer | IT Professional",
    eyebrows: [
      "CYBER SECURITY",
      "FULL STACK DEVELOPMENT",
      "IT PROFESSIONAL"
    ],
    tagline: "SECURING SYSTEMS. BUILDING THE FUTURE.",
    shortBio: "Cybersecurity-focused IT professional and full stack developer passionate about building secure, modern, and user-friendly digital solutions.",
    fullBio: [
      "I am a passionate IT professional with a Bachelor's degree in IT and Cyber Security (Second Class Upper Division) and hands-on experience in IT operations, cybersecurity, networking, and software development.",
      "My expertise includes cybersecurity operations, vulnerability assessment, system administration, web application development, and database management. I enjoy building modern, secure, and user-friendly digital solutions while continuously exploring emerging technologies.",
      "I am passionate about solving real-world technical challenges, developing innovative software solutions, and contributing to a safer digital environment."
    ],
    philosophy: "Build with purpose. Secure by design. Keep learning.",
    location: "Sri Lanka",
    email: "srrashmika98@gmail.com",
    whatsapp: "+94764188538",
    whatsappUrl: "https://wa.me/94764188538",
    photoCutout: "assets/images/sandaru-cutout.png",
    photoOriginal: "assets/images/sandaru-original.png",
    cv: "", // Configure real CV path when available (e.g., 'assets/documents/sandaru-cv.pdf')
    introVideo: "", // Configure video URL or YouTube embed when available
    showreelUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Optional showreel / demo video
  },

  social: {
    github: "https://github.com/virusrash",
    linkedin: "https://lk.linkedin.com/in/sandaru-rashmika-072368188",
    facebook: "https://web.facebook.com/sandaru.rashmika.5220/",
    instagram: "" // Hidden as not provided
  },

  education: [
    {
      degree: "Bachelor's Degree in IT and Cyber Security",
      classification: "Second Class Upper Division",
      institution: "Degree Program in Information Technology & Cyber Security",
      year: "Completed",
      description: "Comprehensive focus on cybersecurity operations, defensive architectures, penetration testing, network infrastructure, and robust software engineering."
    }
  ],

  // Verified expertise highlights (replaces numerical vanity statistics)
  expertiseHighlights: [
    { label: "CYBER SECURITY", desc: "Vulnerability Assessment & Threat Hardening" },
    { label: "FULL STACK DEVELOPMENT", desc: "Modern Secure Web Architecture & REST APIs" },
    { label: "IT OPERATIONS", desc: "Linux & Windows Server Infrastructure" }
  ],

  // Verified technical skill categories
  securitySkills: [
    { title: "Vulnerability Assessment", code: "VA-01", desc: "Proactive identification, analysis, and prioritization of software and system vulnerabilities." },
    { title: "Penetration Testing", code: "PT-02", desc: "Simulated security assessments to uncover security weaknesses before adversaries exploit them." },
    { title: "Network Security", code: "NS-03", desc: "Firewalls, secure subnets, traffic analysis, and protocols for perimeter defense." },
    { title: "Linux Security", code: "LX-04", desc: "Access controls, SELinux, process isolation, SSH key hygiene, and hardened server configurations." },
    { title: "Windows Server Admin", code: "WS-05", desc: "Active Directory, Group Policy Objects, audit logging, and role-based access management." },
    { title: "System Administration", code: "SA-06", desc: "Fleet configuration, patch management, automated scripting, and system monitoring." },
    { title: "Networking & IT Ops", code: "NT-07", desc: "Routing, switching, DNS/DHCP topology, hardware troubleshooting, and 24/7 reliability." }
  ],

  techStack: {
    languages: ["Python", "Java", "C#", "JavaScript"],
    frontend: ["HTML5", "CSS3", "React.js", "Next.js"],
    backend: ["FastAPI", "Django", "REST APIs"],
    databases: ["MySQL", "PostgreSQL", "SQL Server"],
    tools: ["Git", "GitHub", "Linux", "Windows Server", "IT Support", "Hardware Troubleshooting", "Networking"]
  },

  itOperations: [
    {
      title: "IT Support & Diagnostics",
      icon: "wrench",
      desc: "Fast resolution of technical hurdles, workstation provisioning, and user support."
    },
    {
      title: "Hardware Troubleshooting",
      icon: "cpu",
      desc: "Component diagnostics, server hardware maintenance, and physical network testing."
    },
    {
      title: "Enterprise Networking",
      icon: "network",
      desc: "VLAN configuration, switches, routers, subnets, and secure routing architectures."
    },
    {
      title: "Linux & Windows Servers",
      icon: "server",
      desc: "Cross-platform operating system maintenance, daemon orchestration, and automated updates."
    },
    {
      title: "Database Administration",
      icon: "database",
      desc: "Relational integrity, backups, query optimization, and schema management across MySQL, PostgreSQL, and SQL Server."
    }
  ],

  approachSteps: [
    {
      step: "01",
      title: "UNDERSTAND",
      desc: "Analyze requirements, challenges, and objectives to establish a clear architectural threat model and feature scope."
    },
    {
      step: "02",
      title: "PLAN",
      desc: "Design a secure and maintainable technical approach, adhering to least-privilege principles and clean code patterns."
    },
    {
      step: "03",
      title: "BUILD",
      desc: "Develop and implement the solution with modern full stack standards, defensive coding, and efficient logic."
    },
    {
      step: "04",
      title: "TEST",
      desc: "Validate functionality, reliability, and security through comprehensive vulnerability assessments and test suites."
    },
    {
      step: "05",
      title: "DELIVER",
      desc: "Refine and deploy a usable, maintainable result backed by clean documentation and ongoing operational resilience."
    }
  ],

  // Structured Projects Showcase with verified categories
  // All repositories point to verified profile https://github.com/virusrash
  projects: [
    {
      id: "vuln-auditor",
      title: "Vulnerability Assessment Engine",
      category: "CYBER SECURITY",
      categoryKey: "cyber-security",
      year: "2024",
      description: "Automated security scanning framework analyzing service exposures, misconfigurations, and known CVE vulnerabilities across networked targets.",
      technologies: ["Python", "Linux", "Network Security", "CVE API"],
      thumbnail: "assets/projects/project-1.jpg",
      github: "https://github.com/virusrash",
      live: "",
      featured: true,
      caseStudy: {
        overview: "An automated security scanner built to streamline initial discovery and vulnerability mapping for local and remote infrastructure.",
        problem: "Manual scanning of multi-subnet setups is prone to omissions and requires excessive configuration overhead for repeatable audits.",
        approach: "Implemented asynchronous port inspection and signature-based banner analysis in Python with automated report generation.",
        architecture: "Modular Python CLI & daemon architecture running on Linux, generating clean JSON audit artifacts.",
        outcomes: "Accelerated assessment discovery phases while maintaining low packet drop rates."
      }
    },
    {
      id: "securepass-vault",
      title: "Enterprise Access & Identity Platform",
      category: "FULL STACK",
      categoryKey: "full-stack",
      year: "2024",
      description: "Full stack web application featuring role-based access control (RBAC), encrypted credential handling, and audit logging.",
      technologies: ["FastAPI", "React.js", "PostgreSQL", "REST APIs"],
      thumbnail: "assets/projects/project-2.jpg",
      github: "https://github.com/virusrash",
      live: "",
      featured: true,
      caseStudy: {
        overview: "A modern full stack platform engineered to demonstrate secure session handling, robust authentication, and relational data management.",
        problem: "Traditional administrative panels frequently exhibit vulnerabilities like privilege escalation and inadequate session timeouts.",
        approach: "Designed decoupled REST architecture with FastAPI backend, parameterized SQL queries, and reactive component state.",
        architecture: "React.js client communicating over secure REST endpoints with FastAPI and a normalized PostgreSQL database.",
        outcomes: "Strict isolation of administrative privileges with end-to-end encrypted data transit."
      }
    },
    {
      id: "network-defense-suite",
      title: "Network Perimeter Defense Monitor",
      category: "NETWORKING",
      categoryKey: "networking",
      year: "2024",
      description: "Network telemetry analyzer inspecting abnormal packet flows, port knocking behavior, and subnet firewall anomalies.",
      technologies: ["Python", "Networking", "Linux", "iptables"],
      thumbnail: "assets/projects/project-3.jpg",
      github: "https://github.com/virusrash",
      live: "",
      featured: true,
      caseStudy: {
        overview: "A packet-level traffic monitor created to alert administrators when suspicious connection bursts breach defined baseline thresholds.",
        problem: "High packet volumes obscure targeted reconnaissance probes on edge network gateways.",
        approach: "Utilized socket-level filtering and Linux packet capture hooks to track connection anomalies in real-time.",
        architecture: "Lightweight background service consuming interface streams and piping structured events to systemd journals.",
        outcomes: "Instant notification for unmapped port traversal and unexpected outbound connections."
      }
    },
    {
      id: "sysadmin-infra-toolkit",
      title: "Infrastructure & SysAdmin Operations Suite",
      category: "OTHER",
      categoryKey: "other",
      year: "2023",
      description: "Cross-platform automation scripts and diagnostic utilities for Linux system hardening and Windows Server Active Directory checks.",
      technologies: ["System Administration", "Linux", "Windows Server", "Bash"],
      thumbnail: "assets/projects/project-4.jpg",
      github: "https://github.com/virusrash",
      live: "",
      featured: true,
      caseStudy: {
        overview: "A centralized operational repository containing hardened deployment manifests and diagnostic health checks.",
        problem: "Repetitive system maintenance across mixed OS environments leads to configuration drift and security lag.",
        approach: "Built unified orchestration scripts enforcing consistent baseline configurations and automated backup routines.",
        architecture: "Modular shell and automation routines with automated health-check logging.",
        outcomes: "Reduced manual configuration time across newly provisioned test server environments."
      }
    },
    {
      id: "threat-intel-crawler",
      title: "Threat Intelligence Indicator Aggregator",
      category: "PYTHON",
      categoryKey: "python",
      year: "2023",
      description: "Python-driven data collector gathering published IOCs (Indicators of Compromise), malicious IP ranges, and security feeds.",
      technologies: ["Python", "REST APIs", "MySQL", "Cyber Security"],
      thumbnail: "assets/projects/project-5.jpg",
      github: "https://github.com/virusrash",
      live: "",
      featured: false,
      caseStudy: {
        overview: "Ingestion pipeline parsing open threat intelligence feeds into normalized blocklists.",
        problem: "Security teams often struggle to aggregate disparate feed formats into an actionable blacklist format.",
        approach: "Built scheduled collectors that normalize feed feeds into a centralized MySQL database.",
        architecture: "Asynchronous Python worker querying threat feeds and validating IP/domain syntax.",
        outcomes: "Consolidated multiple threat streams into unified firewall import rules."
      }
    },
    {
      id: "secure-db-portal",
      title: "Full Stack Database Management Dashboard",
      category: "WEB DEVELOPMENT",
      categoryKey: "web-development",
      year: "2023",
      description: "Responsive portal for structured database operations, automated backups, and schema verification.",
      technologies: ["HTML5", "CSS3", "JavaScript", "SQL Server", "Django"],
      thumbnail: "assets/projects/project-6.jpg",
      github: "https://github.com/virusrash",
      live: "",
      featured: false,
      caseStudy: {
        overview: "Administrative dashboard for managing relational databases with strict input sanitization.",
        problem: "Unsanitized administrative query forms present critical SQL injection risks.",
        approach: "Constructed an ORM-backed Django interface with parameterized query generators and CSP headers.",
        architecture: "Django application with multi-factor authentication layer communicating with SQL Server.",
        outcomes: "Seamless administrative workflow with verified protection against SQL injection."
      }
    }
  ],

  // Form handling configuration
  contactConfig: {
    endpoint: "", // e.g. Formspree or custom backend endpoint. If empty, uses mailto fallback.
    recipientEmail: "srrashmika98@gmail.com"
  },

  // Ecosystem Marquee ("Been part of the bigger picture")
  marquee: [
    "CYBER SECURITY", "LINUX KERNEL", "WINDOWS SERVER", "REACT.JS",
    "FASTAPI", "POSTGRESQL", "PYTHON", "NETWORKING TOPOLOGY",
    "PENETRATION TESTING", "DOCKER", "REST APIS", "SQL SERVER"
  ],

  // Awards & Recognition ("The Work. The Recognition.")
  awards: [
    {
      year: "2024",
      title: "Second Class Upper Division Honors",
      issuer: "Bachelor of Science in IT & Cyber Security",
      category: "Academic Excellence"
    },
    {
      year: "2024",
      title: "Best Technical Competency Assessment",
      issuer: "Cyber Operations & Vulnerability Auditing",
      category: "Defensive Security"
    },
    {
      year: "2023",
      title: "Excellence in Network Architecture & Routing",
      issuer: "Enterprise Networking Lab Defense",
      category: "Infrastructure"
    }
  ],

  // Little wins milestones
  milestones: [
    { title: "Defensive Security Specialization", desc: "Completed comprehensive hands-on threat models and penetration testing modules." },
    { title: "Full Stack REST Deployment", desc: "Architected decoupled web apps with FastAPI, React, and relational persistence." },
    { title: "Enterprise OS Hardening", desc: "Configured zero-trust access controls across Linux and Windows Server environments." }
  ],

  // Interactive Before/After Data ("From Raw. To Real.")
  beforeAfter: {
    beforeLabel: "RAW EXPOSURE",
    afterLabel: "HARDENED SECURITY",
    title: "Vulnerability Remediation & System Hardening",
    tools: "Linux • iptables • Python • CVE Remediation",
    beforeText: "Unencrypted endpoints, unpatched CVE ports (22, 80, 8080 exposed), default credentials, no audit logging.",
    afterText: "Zero-Trust policy enforced, strict firewall rules, end-to-end TLS 1.3 encryption, automated syslog ingestion."
  }
};

