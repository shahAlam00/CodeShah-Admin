import { Roadmap } from '../../types/roadmap';

export const mockRoadmaps: Roadmap[] = [
  {
    id: 'rdm-01',
    title: 'Full Stack Web Developer Career Track',
    slug: 'full-stack-web-developer',
    description: 'Master frontend, backend, database architectures, devops fundamentals, and production deployment from scratch to advanced.',
    category: 'Full Stack Engineering',
    difficulty: 'Intermediate',
    status: 'Published',
    enrolledUsers: 48200,
    completionRate: 38.4,
    totalHours: 120,
    updatedAt: '2024-03-01',
    phases: [
      {
        id: 'phase-1',
        title: 'Phase 1: Modern HTML5, Semantic Web & CSS3',
        description: 'Core building blocks of the web, accessibility, responsive flexbox and grid layouts.',
        order: 1,
        topics: [
          { id: 'top-1', title: 'HTML5 Semantics & Web Standards', description: 'SEO, Accessibility ARIA, Forms', estimatedHours: 8, isLocked: false, problemIds: [], articleCount: 12, quizCount: 3 },
          { id: 'top-2', title: 'Modern CSS, Flexbox & Grid Systems', description: 'CSS Variables, responsive fluid design, layout algorithms', estimatedHours: 12, isLocked: false, problemIds: [], articleCount: 15, quizCount: 4 },
          { id: 'top-3', title: 'Tailwind CSS & Utility-First Styling', description: 'Design tokens, dark mode, responsive modifiers', estimatedHours: 10, isLocked: false, problemIds: [], articleCount: 8, quizCount: 2 }
        ]
      },
      {
        id: 'phase-2',
        title: 'Phase 2: Deep Dive JavaScript & TypeScript',
        description: 'Prototypes, closures, event loop, asynchronous promises, strict type safety.',
        order: 2,
        topics: [
          { id: 'top-4', title: 'Execution Context & Event Loop', description: 'Call stack, microtasks vs macrotasks', estimatedHours: 14, isLocked: false, problemIds: ['prob-001'], articleCount: 18, quizCount: 5 },
          { id: 'top-5', title: 'TypeScript Fundamentals & Generics', description: 'Type narrowing, conditional types, mapped types', estimatedHours: 16, isLocked: false, problemIds: [], articleCount: 14, quizCount: 4 }
        ]
      },
      {
        id: 'phase-3',
        title: 'Phase 3: React 18 & Frontend Architecture',
        description: 'Component lifecycles, hooks, suspense, state machines, and rendering optimizations.',
        order: 3,
        topics: [
          { id: 'top-6', title: 'Core React Hooks & Custom Hook Design', description: 'useState, useEffect, useMemo, useCallback, useRef', estimatedHours: 18, isLocked: false, problemIds: [], articleCount: 20, quizCount: 6 },
          { id: 'top-7', title: 'Global State Management & Data Fetching', description: 'Zustand, TanStack Query, optimistic UI', estimatedHours: 14, isLocked: false, problemIds: [], articleCount: 10, quizCount: 3 }
        ]
      },
      {
        id: 'phase-4',
        title: 'Phase 4: Node.js, Express & Microservices',
        description: 'Server architectures, middleware design, JWT auth, stream processing.',
        order: 4,
        topics: [
          { id: 'top-8', title: 'Node.js Runtime & Streams', description: 'V8 engine, buffer management, piping streams', estimatedHours: 16, isLocked: true, problemIds: [], articleCount: 12, quizCount: 3 },
          { id: 'top-9', title: 'REST & GraphQL API Engineering', description: 'Rate limiting, validation schemas, error handling', estimatedHours: 14, isLocked: true, problemIds: [], articleCount: 14, quizCount: 4 }
        ]
      },
      {
        id: 'phase-5',
        title: 'Phase 5: Databases, Caching & Relational Modeling',
        description: 'PostgreSQL, Redis, indexing, transactions, ACID vs BASE.',
        order: 5,
        topics: [
          { id: 'top-10', title: 'PostgreSQL & Relational Schemas', description: 'Foreign keys, indexes, joins, query planner', estimatedHours: 18, isLocked: true, problemIds: [], articleCount: 16, quizCount: 4 },
          { id: 'top-11', title: 'Redis Caching & Pub/Sub Patterns', description: 'Cache invalidation strategies, TTL, sorted sets', estimatedHours: 12, isLocked: true, problemIds: ['prob-002'], articleCount: 10, quizCount: 3 }
        ]
      },
      {
        id: 'phase-6',
        title: 'Phase 6: High-Scale Distributed System Design',
        description: 'Load balancers, CDN, message queues, horizontal scaling, fault tolerance.',
        order: 6,
        topics: [
          { id: 'top-12', title: 'System Scalability & Microservices', description: 'Kafka queues, circuit breakers, idempotency', estimatedHours: 20, isLocked: true, problemIds: [], articleCount: 15, quizCount: 5 }
        ]
      }
    ]
  },
  {
    id: 'rdm-02',
    title: 'Data Structures & Algorithms Mastery (Zero to Hero)',
    slug: 'data-structures-and-algorithms-mastery',
    description: 'Structured roadmap covering Arrays, Hash Maps, Two Pointers, Trees, Graphs, and Dynamic Programming with curated LeetCode-style problems.',
    category: 'Competitive Programming',
    difficulty: 'Advanced',
    status: 'Published',
    enrolledUsers: 62400,
    completionRate: 42.1,
    totalHours: 90,
    updatedAt: '2024-02-28',
    phases: [
      {
        id: 'dsa-phase-1',
        title: 'Phase 1: Linear Data Structures',
        description: 'Arrays, Strings, Stacks, Queues, and Linked Lists.',
        order: 1,
        topics: [
          { id: 'dtop-1', title: 'Arrays & Two Pointer Techniques', description: 'Sliding window, prefix sum, Dutch national flag', estimatedHours: 15, isLocked: false, problemIds: ['prob-001', 'prob-005'], articleCount: 10, quizCount: 4 }
        ]
      }
    ]
  }
];
