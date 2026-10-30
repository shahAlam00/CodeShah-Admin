import { DSAVisualizer } from '../../types/visualizer';

export const mockVisualizers: DSAVisualizer[] = [
  {
    id: 'vis-01',
    name: 'Merge Sort Visualizer',
    slug: 'merge-sort',
    category: 'Sorting',
    description: 'Divide and conquer algorithm that splits arrays into halves, sorts them recursively, and merges them back in linear time.',
    algorithm: 'Merge Sort',
    pseudocode: `function mergeSort(arr):
  if length(arr) <= 1: return arr
  mid = length(arr) / 2
  left = mergeSort(arr[0...mid])
  right = mergeSort(arr[mid...end])
  return merge(left, right)`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    status: 'Published',
    viewCount: 38900,
    updatedAt: '2024-02-10',
    config: {
      defaultData: [45, 12, 89, 34, 70, 23, 6, 91, 55],
      animationSpeedMs: 400,
      allowStepByStep: true,
      highlightColors: {
        comparing: '#38bdf8',
        swapping: '#f59e0b',
        sorted: '#10b981',
        active: '#6366f1'
      }
    }
  },
  {
    id: 'vis-02',
    name: 'Binary Search Tree Operations',
    slug: 'binary-search-tree',
    category: 'Tree',
    description: 'Interactive visualization for node insertion, in-order traversal, searching, and AVL self-balancing rotations.',
    algorithm: 'Binary Search Tree / AVL',
    pseudocode: `function insert(root, val):
  if root is null: return new Node(val)
  if val < root.val: root.left = insert(root.left, val)
  else: root.right = insert(root.right, val)
  return balance(root)`,
    timeComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n) [Unbalanced]'
    },
    spaceComplexity: 'O(n)',
    status: 'Published',
    viewCount: 45200,
    updatedAt: '2024-02-14',
    config: {
      defaultData: [50, 30, 70, 20, 40, 60, 80],
      animationSpeedMs: 500,
      allowStepByStep: true,
      highlightColors: {
        comparing: '#38bdf8',
        swapping: '#f59e0b',
        sorted: '#10b981',
        active: '#6366f1'
      }
    }
  },
  {
    id: 'vis-03',
    name: 'Dijkstra Shortest Path Finder',
    slug: 'dijkstra-algorithm',
    category: 'Graph',
    description: 'Greedy algorithm for finding shortest paths between nodes in a weighted graph using priority queue min-heaps.',
    algorithm: 'Dijkstra Algorithm',
    pseudocode: `function dijkstra(graph, start):
  dist[start] = 0; pq.push({start, 0})
  while pq is not empty:
    u = pq.pop()
    for neighbor v of u:
      if dist[u] + weight(u, v) < dist[v]:
        dist[v] = dist[u] + weight(u, v)
        pq.push({v, dist[v]})`,
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)'
    },
    spaceComplexity: 'O(V)',
    status: 'Published',
    viewCount: 51200,
    updatedAt: '2024-02-19',
    config: {
      defaultData: [1, 2, 3, 4, 5, 6],
      animationSpeedMs: 600,
      allowStepByStep: true,
      highlightColors: {
        comparing: '#38bdf8',
        swapping: '#f59e0b',
        sorted: '#10b981',
        active: '#6366f1'
      }
    }
  }
];
