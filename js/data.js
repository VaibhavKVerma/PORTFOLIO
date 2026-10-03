export const profile = {
    name: "Vaibhav Verma",
    shortName: "Vaibhav",
    mark: "Vaibhav",
    role: "Software Developer 2",
    company: "Birla Pivot",
    email: "vaibhavverma15062001@gmail.com",
    phone: "+91-9915073712",
    photo: "images/portrait.jpg",
    site: "https://vaibhavkumarverma.netlify.app",
    about: [
        "Backend engineer with around 3 years building scalable, high-availability server-side systems across payments, lead platforms, and media pipelines.",
        "I work on REST API design, event-driven architecture, idempotent workflows, and distributed systems patterns — Saga, Outbox, retry/DLQ, caching.",
        "Day to day that's Java/Spring Boot and Node.js with PostgreSQL, MongoDB, Redis, and Kafka at production scale. NIT Jalandhar, Electrical Engineering.",
    ],
    links: {
        github: "https://github.com/VaibhavKVerma",
        linkedin: "https://www.linkedin.com/in/vaibhav-kr-verma/",
        codeforces: "https://codeforces.com/profile/vaibhav_verma",
        leetcode: "https://leetcode.com/forsakencode",
    },
};

export const nav = [
    {id: "about", label: "About"},
    {id: "projects", label: "Projects"},
    {id: "experience", label: "Experience"},
    {id: "skills", label: "Skills"},
    {id: "education", label: "Education"},
];

export const pills = [
    {
        id: "about",
        label: "Who I am",
        reply: "Backend engineer. Payments, leads, and media pipelines.",
    },
    {
        id: "projects",
        label: "See my work",
        reply: "Distributed URL shortener, Spring Boot microservices, NestJS auth.",
    },
    {
        id: "experience",
        label: "Work history",
        reply: "Birla Pivot, Saathi, BYJU'S — the timeline is on the right.",
    },
    {
        id: "skills",
        label: "Skills & stack",
        reply: "Java, Spring Boot, Node, Kafka, Postgres — what I run in production.",
    },
    {
        id: "education",
        label: "Education",
        reply: "B.Tech, Electrical Engineering, NIT Jalandhar.",
    },
];

export const skills = [
    {title: "Languages", name: "Java, JavaScript/TypeScript, SQL, C++"},
    {
        title: "Backend & Frameworks",
        name: "Spring Boot, Spring MVC, Spring Data JPA, Spring Security, Node.js, Express, NestJS",
    },
    {
        title: "Databases & Caching",
        name: "PostgreSQL, MongoDB, Redis, MySQL, Snowflake",
    },
    {
        title: "Messaging & Streaming",
        name: "Kafka, RabbitMQ, BullMQ, Event-Driven Architecture",
    },
    {
        title: "Cloud & DevOps",
        name: "AWS (Lambda, EventBridge, EC2, S3), Docker, Kubernetes, Jenkins, CI/CD",
    },
    {
        title: "Architecture & Patterns",
        name: "Microservices, Distributed Systems, REST API Design, Idempotency, Caching Strategies",
    },
    {title: "Testing", name: "JUnit, Mockito, Jest, Integration Testing"},
    {
        title: "Observability & Security",
        name: "Prometheus, Grafana, New Relic, OAuth, JWT, RBAC, Monitoring & Alerting",
    },
];

export const projects = [
    {
        name: "TinyURL — Distributed URL Shortener",
        summary:
            "Spring Boot URL shortener with collision-free token ranges across instances, Zookeeper coordination, Redis lookup cache, MongoDB persistence, and consistent hashing. Docker Compose runs multiple token-service replicas with load-test scripts.",
        url: "https://github.com/VaibhavKVerma/tinyurl",
        stack: ["Spring Boot", "MongoDB", "Redis", "Zookeeper", "Docker"],
    },
    {
        name: "E-commerce Platform (Microservices)",
        summary:
            "Spring Boot microservices with database-per-service: product catalog, orders, and inventory over gRPC (PostgreSQL), plus a Kafka notification worker on MongoDB for email, SMS, and WhatsApp.",
        url: "https://github.com/VaibhavKVerma/E-commerce",
        stack: ["Spring Boot", "gRPC", "Kafka", "PostgreSQL", "MongoDB"],
    },
    // {
    //     name: "Patient Management",
    //     summary:
    //         "Spring Boot patient and billing services talking over gRPC. REST + validation on the patient API, protobuf billing, Dockerized Java 21 services.",
    //     url: "https://github.com/VaibhavKVerma/Patient-Management",
    //     stack: ["Spring Boot", "gRPC", "Protobuf", "Docker"],
    // },
    // {
    //     name: "Auth & User Service",
    //     summary:
    //         "NestJS auth service: JWT access + refresh tokens, RBAC (admin / moderator / user), PostgreSQL + TypeORM, Swagger, rate limiting, and email/OTP verification.",
    //     url: "https://github.com/VaibhavKVerma/user-service",
    //     stack: ["NestJS", "PostgreSQL", "JWT", "RBAC", "TypeORM"],
    // },
    {
        name: "Rate Limiter Proxy",
        summary:
            "Express + TypeScript API with Redis-backed rate limiting, JWT auth, and MongoDB. Built as a gateway-style service, not a tutorial snippet.",
        url: "https://github.com/VaibhavKVerma/Rate-Limiter",
        stack: ["TypeScript", "Express", "Redis", "MongoDB", "JWT"],
    },
];

export const experience = [
    {
        company: "Birla Pivot",
        location: "Bangalore",
        role: "Software Developer 1 & 2",
        dates: "Oct 2025 — Present",
        points: [
            "Lead Management Service: Architected a multi-source lead ingestion, enrichment, and engagement platform from scratch — 10L+ leads, event-driven transactional workflows, intent classification, and prioritized outreach over cold-calling.",
            "Sales Task Management & AI Outreach: Deadline-driven calling/meeting tasks for sales teams; call recording ingestion, transcription, and AI pitch recommendations that turn engagement into structured enquiries.",
            "Tender247 & RERA Integration: Government tender intelligence that routes project signals into enquiries for existing and net-new buyers — 40% new buyer acquisition and higher enquiry-to-order conversion.",
            "Technical Leadership: Design discussions and PR reviews for 3 interns on production systems; mentored API design, code quality, and distributed workflows — 100% full-time conversion.",
        ],
        tags: ["Event-driven", "Spring Boot", "Java", "Kafka", "PostgreSQL", "Redis", "Microservices", "Elastic Search", "Distributed workflows"],
    },
    {
        company: "Saathi",
        location: "Gurgaon, India",
        role: "Software Developer - 1",
        dates: "May 2024 — Oct 2025",
        points: [
            "Payment Orchestration: Owned event-driven payment orchestration with Juspay UPI mandates — idempotent APIs, webhook reconciliation, retry-safe execution; 50K+ orders/day at 99.8% success including refunds.",
            "Payouts: Idempotent payout processing with distributed retry queues for referral payouts — millions of transactions at 99.8% success.",
            "Media Processing Pipeline: Distributed video workers on Kafka (partitioning, consumer groups) and BullMQ with controlled parallelism, backpressure, and DLQ recovery — thousands of media jobs/day.",
            "Evaluation Reuse System: Deduplicated evaluation with content hashing and cache reuse — 7× lower compute, about $100K annually.",
        ],
        tags: ["Kafka", "BullMQ", "Idempotency", "Juspay", "Node.js"],
    },
    {
        company: "BYJU'S",
        location: "Gurgaon, India",
        role: "Member of Technical Staff - 1",
        dates: "Jan 2023 — Apr 2024",
        points: [
            "AWS Cost Optimization: Scheduled scaling of non-production RDS and EC2 via Lambda and EventBridge — $1,100/month less idle infra.",
            "Data Ingestion Migration: MongoDB → S3 → Snowflake service that replaced 70% of Fivetran — $5,000/month saved, better pipeline observability.",
        ],
        tags: ["AWS", "Lambda", "EventBridge", "MongoDB", "Snowflake"],
    },
];

export const education = [
    {
        title: "Bachelor of Technology — Electrical Engineering",
        place: "National Institute of Technology, Jalandhar",
        dates: "July 2019 — July 2023",
        points: [],
        tags: ["Electrical Engineering"],
    },
];
