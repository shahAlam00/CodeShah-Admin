import { Company } from '../../types/taxonomy';

export const mockCompanies: Company[] = [
  {
    id: 'comp-1',
    name: 'Google',
    slug: 'google',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
    description: 'American multinational technology company focusing on search engine technology, cloud computing, and AI.',
    website: 'https://careers.google.com',
    problemCount: 310,
    assessmentCount: 8,
    interviewQuestionCount: 45,
    tier: 'FAANG/MAMAA',
    status: 'Active',
    difficultyDistribution: { easy: 45, medium: 185, hard: 80 }
  },
  {
    id: 'comp-2',
    name: 'Amazon',
    slug: 'amazon',
    logo: 'https://images.unsplash.com/photo-1523474255658-4af61b1c5d56?w=100&auto=format&fit=crop&q=80',
    description: 'Focusing on e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence.',
    website: 'https://amazon.jobs',
    problemCount: 420,
    assessmentCount: 12,
    interviewQuestionCount: 68,
    tier: 'FAANG/MAMAA',
    status: 'Active',
    difficultyDistribution: { easy: 80, medium: 260, hard: 80 }
  },
  {
    id: 'comp-3',
    name: 'Meta',
    slug: 'meta',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100&auto=format&fit=crop&q=80',
    description: 'Social technology company connecting people through Facebook, Instagram, WhatsApp, and virtual reality.',
    website: 'https://metacareers.com',
    problemCount: 290,
    assessmentCount: 6,
    interviewQuestionCount: 38,
    tier: 'FAANG/MAMAA',
    status: 'Active',
    difficultyDistribution: { easy: 40, medium: 190, hard: 60 }
  },
  {
    id: 'comp-4',
    name: 'Microsoft',
    slug: 'microsoft',
    logo: 'https://images.unsplash.com/photo-1642132652075-2b23a9d94fa2?w=100&auto=format&fit=crop&q=80',
    description: 'Developer of Windows, Azure cloud services, Office 365, and AI solutions.',
    website: 'https://careers.microsoft.com',
    problemCount: 280,
    assessmentCount: 9,
    interviewQuestionCount: 42,
    tier: 'FAANG/MAMAA',
    status: 'Active',
    difficultyDistribution: { easy: 65, medium: 165, hard: 50 }
  },
  {
    id: 'comp-5',
    name: 'Apple',
    slug: 'apple',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&auto=format&fit=crop&q=80',
    description: 'Consumer electronics, operating systems, hardware engineering, and online services.',
    website: 'https://apple.com/careers',
    problemCount: 175,
    assessmentCount: 4,
    interviewQuestionCount: 26,
    tier: 'FAANG/MAMAA',
    status: 'Active',
    difficultyDistribution: { easy: 35, medium: 105, hard: 35 }
  },
  {
    id: 'comp-6',
    name: 'Uber',
    slug: 'uber',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80',
    description: 'Global mobility service provider with massive scale real-time geospatial dispatch systems.',
    website: 'https://uber.com/careers',
    problemCount: 140,
    assessmentCount: 5,
    interviewQuestionCount: 31,
    tier: 'Tier 1',
    status: 'Active',
    difficultyDistribution: { easy: 20, medium: 85, hard: 35 }
  }
];
