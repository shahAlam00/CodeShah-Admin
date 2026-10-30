import { Topic } from '../../types/taxonomy';

export const mockTopics: Topic[] = [
  { id: 'top-1', name: 'Arrays', slug: 'arrays', description: 'Contiguous memory allocations, prefix sums, two pointers, sliding window', icon: 'Layers', color: '#0ea5e9', problemCount: 142, roadmapCount: 5, status: 'Active', category: 'Data Structures' },
  { id: 'top-2', name: 'Strings', slug: 'strings', description: 'String manipulation, KMP, Rabin-Karp, palindrome substrings', icon: 'Type', color: '#6366f1', problemCount: 98, roadmapCount: 4, status: 'Active', category: 'Data Structures' },
  { id: 'top-3', name: 'Linked List', slug: 'linked-list', description: 'Singly, doubly linked lists, fast and slow pointers, cycle detection', icon: 'GitCommit', color: '#10b981', problemCount: 65, roadmapCount: 3, status: 'Active', category: 'Data Structures' },
  { id: 'top-4', name: 'Stack & Queue', slug: 'stack-queue', description: 'LIFO and FIFO implementations, monotonic stacks, deque operations', icon: 'SquareStack', color: '#f59e0b', problemCount: 78, roadmapCount: 4, status: 'Active', category: 'Data Structures' },
  { id: 'top-5', name: 'Trees & BST', slug: 'trees-bst', description: 'Binary trees, BST operations, DFS/BFS traversals, LCA, AVL balancing', icon: 'Network', color: '#8b5cf6', problemCount: 120, roadmapCount: 6, status: 'Active', category: 'Data Structures' },
  { id: 'top-6', name: 'Graphs', slug: 'graphs', description: 'Adjacency list, BFS/DFS, topological sort, Dijkstra, union-find', icon: 'Share2', color: '#ec4899', problemCount: 110, roadmapCount: 5, status: 'Active', category: 'Data Structures' },
  { id: 'top-7', name: 'Dynamic Programming', slug: 'dynamic-programming', description: 'Memoization, tabulation, knapsack, LCS, bitmask DP, interval DP', icon: 'Boxes', color: '#ef4444', problemCount: 185, roadmapCount: 8, status: 'Active', category: 'Algorithms' },
  { id: 'top-8', name: 'Greedy', slug: 'greedy', description: 'Locally optimal choices, interval scheduling, Huffman coding', icon: 'Zap', color: '#14b8a6', problemCount: 74, roadmapCount: 3, status: 'Active', category: 'Algorithms' },
  { id: 'top-9', name: 'Backtracking', slug: 'backtracking', description: 'Permutations, subsets, N-Queens, Sudoku solver constraint satisfaction', icon: 'RotateCcw', color: '#f97316', problemCount: 54, roadmapCount: 3, status: 'Active', category: 'Algorithms' },
  { id: 'top-10', name: 'Binary Search', slug: 'binary-search', description: 'Search on monotonic space, answer binary search, peak finding', icon: 'Search', color: '#06b6d4', problemCount: 82, roadmapCount: 4, status: 'Active', category: 'Algorithms' },
];
