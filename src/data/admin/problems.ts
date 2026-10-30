import { Problem } from '../../types/problem';

export const mockProblems: Problem[] = [
  {
    id: 'prob-001',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    status: 'Published',
    category: 'Algorithms',
    topics: ['Arrays', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        id: 'ex-1',
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        id: 'ex-2',
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be O(N^2).',
      'Can we use extra space? What if we stored each element into a hash map as we iterate?'
    ],
    followUp: 'Can you come up with an algorithm that is less than O(n^2) time complexity?',
    testCases: [
      {
        id: 'tc-1',
        input: '[2,7,11,15]\n9',
        expectedOutput: '[0,1]',
        isSample: true,
        weight: 10,
        explanation: 'Basic standard pair'
      },
      {
        id: 'tc-2',
        input: '[3,2,4]\n6',
        expectedOutput: '[1,2]',
        isSample: true,
        weight: 10
      },
      {
        id: 'tc-3',
        input: '[3,3]\n6',
        expectedOutput: '[0,1]',
        isSample: true,
        weight: 10
      },
      {
        id: 'tc-4',
        input: '[-1,-2,-3,-4,-5]\n-8',
        expectedOutput: '[2,4]',
        isSample: false,
        weight: 35,
        explanation: 'Negative numbers edge case'
      },
      {
        id: 'tc-5',
        input: '[1000000000,-1000000000,0]\n0',
        expectedOutput: '[0,1]',
        isSample: false,
        weight: 35,
        explanation: 'Large 32-bit integer boundaries'
      }
    ],
    solutions: [
      {
        language: 'typescript',
        code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        explanation: 'Using a single-pass hash map to store previous seen values and lookup the complement in O(1) time.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      },
      {
        language: 'python',
        code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, val in enumerate(nums):
            diff = target - val
            if diff in seen:
                return [seen[diff], i]
            seen[val] = i
        return []`,
        explanation: 'Dictionary mapping value to index during linear scan.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      }
    ],
    totalSubmissions: 342150,
    acceptedSubmissions: 174500,
    acceptanceRate: 51.0,
    likes: 4210,
    dislikes: 124,
    author: 'CodeForge Editorial',
    createdAt: '2023-01-10',
    updatedAt: '2024-02-15'
  },
  {
    id: 'prob-002',
    title: 'LRU Cache',
    slug: 'lru-cache',
    difficulty: 'Medium',
    status: 'Published',
    category: 'Data Structures',
    topics: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'Apple'],
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
* \`LRUCache(int capacity)\` Initialize the LRU cache with **positive** size \`capacity\`.
* \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
* \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    examples: [
      {
        id: 'ex-1',
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache lRUCache = new LRUCache(2);\\nlRUCache.put(1, 1);\\nlRUCache.put(2, 2);\\nlRUCache.get(1);    // returns 1\\nlRUCache.put(3, 3); // evicts key 2\\nlRUCache.get(2);    // returns -1 (not found)'
      }
    ],
    hints: [
      'Doubly linked list allows removing a node in O(1) given its pointer.',
      'Combine a doubly linked list with a hash map pointing to nodes.'
    ],
    followUp: 'Can both operations be strictly O(1) without hash collisions?',
    testCases: [
      {
        id: 'tc-lru-1',
        input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
        expectedOutput: '[null,null,null,1,null,-1,null,-1,3,4]',
        isSample: true,
        weight: 20
      },
      {
        id: 'tc-lru-2',
        input: '["LRUCache","put","get"]\n[[1],[2,1],[2]]',
        expectedOutput: '[null,null,1]',
        isSample: false,
        weight: 40
      }
    ],
    solutions: [
      {
        language: 'typescript',
        code: `class DNode {
  key: number;
  val: number;
  prev: DNode | null = null;
  next: DNode | null = null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

class LRUCache {
  private capacity: number;
  private map: Map<number, DNode> = new Map();
  private head: DNode = new DNode(0, 0);
  private tail: DNode = new DNode(0, 0);

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key)!;
    this.remove(node);
    this.insertHead(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      this.remove(this.map.get(key)!);
    }
    const node = new DNode(key, value);
    this.insertHead(node);
    this.map.set(key, node);
    if (this.map.size > this.capacity) {
      const lru = this.tail.prev!;
      this.remove(lru);
      this.map.delete(lru.key);
    }
  }

  private remove(node: DNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insertHead(node: DNode) {
    node.next = this.head.next;
    node.next!.prev = node;
    this.head.next = node;
    node.prev = this.head;
  }
}`,
        explanation: 'Combined hash map and doubly-linked list with dummy head and tail nodes.',
        timeComplexity: 'O(1) for both get and put',
        spaceComplexity: 'O(capacity)'
      }
    ],
    totalSubmissions: 198400,
    acceptedSubmissions: 81300,
    acceptanceRate: 41.0,
    likes: 3890,
    dislikes: 85,
    author: 'CodeForge Editorial',
    createdAt: '2023-02-14',
    updatedAt: '2024-01-20'
  },
  {
    id: 'prob-003',
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    status: 'Published',
    category: 'Algorithms',
    topics: ['Array', 'Binary Search', 'Divide and Conquer'],
    companies: ['Google', 'Amazon', 'Meta', 'Goldman Sachs'],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6'
    ],
    examples: [
      {
        id: 'ex-1',
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        id: 'ex-2',
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    hints: [
      'The problem requires O(log(m+n)) complexity, which strongly suggests Binary Search.',
      'Can you binary search for a partition index on the smaller array?'
    ],
    testCases: [
      {
        id: 'tc-med-1',
        input: '[1,3]\n[2]',
        expectedOutput: '2.00000',
        isSample: true,
        weight: 25
      },
      {
        id: 'tc-med-2',
        input: '[1,2]\n[3,4]',
        expectedOutput: '2.50000',
        isSample: true,
        weight: 25
      }
    ],
    solutions: [],
    totalSubmissions: 142000,
    acceptedSubmissions: 48300,
    acceptanceRate: 34.0,
    likes: 2190,
    dislikes: 310,
    author: 'CodeForge Editorial',
    createdAt: '2023-03-01',
    updatedAt: '2024-01-11'
  },
  {
    id: 'prob-004',
    title: 'Course Schedule II',
    slug: 'course-schedule-ii',
    difficulty: 'Medium',
    status: 'Review',
    category: 'Algorithms',
    topics: ['Graph', 'Depth-First Search', 'Breadth-First Search', 'Topological Sort'],
    companies: ['Amazon', 'Meta', 'Uber'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.`,
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= numCourses * (numCourses - 1)',
      'prerequisites[i].length == 2',
      '0 <= a_i, b_i < numCourses',
      'a_i != b_i',
      'All the pairs [a_i, b_i] are distinct.'
    ],
    examples: [
      {
        id: 'ex-1',
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: '[0,1]'
      }
    ],
    hints: ['This problem is equivalent to finding if a cycle exists in a directed graph.'],
    testCases: [],
    solutions: [],
    totalSubmissions: 94000,
    acceptedSubmissions: 42100,
    acceptanceRate: 44.8,
    likes: 1840,
    dislikes: 42,
    author: 'Priya Sharma',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-12'
  },
  {
    id: 'prob-005',
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    status: 'Published',
    category: 'Algorithms',
    topics: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
    companies: ['Google', 'Amazon', 'Apple', 'Adobe', 'Bloomberg'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    examples: [
      {
        id: 'ex-1',
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      }
    ],
    hints: ['Can you precompute the left max and right max boundaries for each element?'],
    testCases: [],
    solutions: [],
    totalSubmissions: 280000,
    acceptedSubmissions: 168000,
    acceptanceRate: 60.0,
    likes: 5400,
    dislikes: 110,
    author: 'CodeForge Editorial',
    createdAt: '2023-01-25',
    updatedAt: '2024-02-18'
  },
  {
    id: 'prob-006',
    title: 'Implement Prefix Tree (Trie)',
    slug: 'implement-trie-prefix-tree',
    difficulty: 'Medium',
    status: 'Draft',
    category: 'Data Structures',
    topics: ['Hash Table', 'String', 'Design', 'Trie'],
    companies: ['Google', 'Microsoft', 'Amazon'],
    description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.`,
    constraints: [
      '1 <= word.length, prefix.length <= 2000',
      'word and prefix consist only of lowercase English letters.',
      'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'
    ],
    examples: [],
    hints: [],
    testCases: [],
    solutions: [],
    totalSubmissions: 61000,
    acceptedSubmissions: 38400,
    acceptanceRate: 63.0,
    likes: 1200,
    dislikes: 30,
    author: 'Priya Sharma',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15'
  }
];
