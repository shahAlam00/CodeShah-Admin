import { Submission } from '../../types/submission';

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-89342',
    userId: 'usr-101',
    userName: 'Aarav Patel',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    problemId: 'prob-001',
    problemTitle: 'Two Sum',
    language: 'TypeScript',
    status: 'Accepted',
    runtime: 58,
    memory: 44.2,
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
    testCaseResults: [
      {
        testCaseId: 'tc-1',
        passed: true,
        runtimeMs: 12,
        memoryMb: 38.4,
        input: '[2,7,11,15]\n9',
        expectedOutput: '[0,1]',
        actualOutput: '[0,1]'
      },
      {
        testCaseId: 'tc-2',
        passed: true,
        runtimeMs: 14,
        memoryMb: 39.1,
        input: '[3,2,4]\n6',
        expectedOutput: '[1,2]',
        actualOutput: '[1,2]'
      },
      {
        testCaseId: 'tc-3',
        passed: true,
        runtimeMs: 11,
        memoryMb: 38.6,
        input: '[3,3]\n6',
        expectedOutput: '[0,1]',
        actualOutput: '[0,1]'
      },
      {
        testCaseId: 'tc-4',
        passed: true,
        runtimeMs: 16,
        memoryMb: 41.2,
        input: '[-1,-2,-3,-4,-5]\n-8',
        expectedOutput: '[2,4]',
        actualOutput: '[2,4]'
      },
      {
        testCaseId: 'tc-5',
        passed: true,
        runtimeMs: 15,
        memoryMb: 44.2,
        input: '[1000000000,-1000000000,0]\n0',
        expectedOutput: '[0,1]',
        actualOutput: '[0,1]'
      }
    ],
    executionLogs: `[INFO] Container initialized on worker-node-03 (node-ip: 10.0.4.12)
[INFO] TypeScript compile target ES2020: OK (18ms)
[DEBUG] Running test suite: 5/5 test cases passed
[BENCHMARK] Total runtime: 58ms (beats 92.4% submissions)
[BENCHMARK] Memory: 44.2MB (beats 78.1% submissions)
[STATUS] Verification complete. Exit code 0.`,
    submittedAt: '12 mins ago'
  },
  {
    id: 'sub-89341',
    userId: 'usr-103',
    userName: 'David Miller',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    problemId: 'prob-002',
    problemTitle: 'LRU Cache',
    language: 'Python',
    status: 'Wrong Answer',
    runtime: 340,
    memory: 76.5,
    code: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key: int) -> int:
        if key in self.cache:
            self.order.remove(key)
            self.order.append(key)
            return self.cache[key]
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            oldest = self.order.pop(0)
            del self.cache[oldest]
        self.cache[key] = value
        self.order.append(key)`,
    testCaseResults: [
      {
        testCaseId: 'tc-lru-1',
        passed: false,
        runtimeMs: 180,
        memoryMb: 65.4,
        input: '["LRUCache","put","put","get","put","get","put","get","get","get"]',
        expectedOutput: '[null,null,null,1,null,-1,null,-1,3,4]',
        actualOutput: '[null,null,null,1,null,2,null,-1,3,4]',
        error: 'AssertionError: expected output index 5 was -1, got 2'
      }
    ],
    executionLogs: `[INFO] Container initialized on worker-node-01 (node-ip: 10.0.4.10)
[INFO] Python 3.11 sandbox started
[WARN] Test case 1 failed: Output mismatch at operation 5
[STATUS] Process finished with exit code 1. Status: WRONG_ANSWER`,
    submittedAt: '34 mins ago'
  },
  {
    id: 'sub-89340',
    userId: 'usr-104',
    userName: 'Sophia Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    problemId: 'prob-003',
    problemTitle: 'Median of Two Sorted Arrays',
    language: 'C++',
    status: 'Time Limit Exceeded',
    runtime: 2005,
    memory: 24.1,
    code: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int> merged;
        for (int x : nums1) merged.push_back(x);
        for (int y : nums2) merged.push_back(y);
        sort(merged.begin(), merged.end());
        int n = merged.size();
        if (n % 2 == 1) return merged[n / 2];
        return (merged[n / 2 - 1] + merged[n / 2]) / 2.0;
    }
};`,
    testCaseResults: [
      {
        testCaseId: 'tc-med-large',
        passed: false,
        runtimeMs: 2000,
        memoryMb: 24.1,
        input: 'Large arrays (size 10^5 each)',
        expectedOutput: 'N/A',
        actualOutput: 'N/A',
        error: 'Execution timed out after 2000ms threshold.'
      }
    ],
    executionLogs: `[INFO] Container initialized on worker-node-02 (node-ip: 10.0.4.11)
[INFO] g++ -O3 compilation: OK
[ERROR] SIGKILL dispatched: CPU execution time limit (2000ms) exceeded.
[STATUS] Status: TIME_LIMIT_EXCEEDED`,
    submittedAt: '1 hour ago'
  },
  {
    id: 'sub-89339',
    userId: 'usr-102',
    userName: 'Ananya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    problemId: 'prob-005',
    problemTitle: 'Trapping Rain Water',
    language: 'Java',
    status: 'Accepted',
    runtime: 2,
    memory: 44.8,
    code: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int ans = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else ans += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else ans += rightMax - height[right];
                right--;
            }
        }
        return ans;
    }
}`,
    testCaseResults: [],
    executionLogs: `[INFO] Container initialized on worker-node-04 (node-ip: 10.0.4.13)
[INFO] OpenJDK 21 execution: OK (2ms runtime, beats 99.8%)`,
    submittedAt: '2 hours ago'
  },
  {
    id: 'sub-89338',
    userId: 'usr-106',
    userName: 'Fatima Al-Mansoor',
    userAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80',
    problemId: 'prob-004',
    problemTitle: 'Course Schedule II',
    language: 'Go',
    status: 'Runtime Error',
    runtime: 18,
    memory: 12.2,
    code: `package main

func findOrder(numCourses int, prerequisites [][]int) []int {
    adj := make(map[int][]int)
    for _, p := range prerequisites {
        adj[p[1]] = append(adj[p[1]], p[0])
    }
    // nil pointer panic scenario
    var res []int
    return res
}`,
    testCaseResults: [
      {
        testCaseId: 'tc-cs-1',
        passed: false,
        runtimeMs: 18,
        memoryMb: 12.2,
        input: '2\n[[1,0]]',
        expectedOutput: '[0,1]',
        actualOutput: 'panic: runtime error: index out of range [0] with length 0',
        error: 'Exit code 2: panic'
      }
    ],
    executionLogs: `[INFO] Container initialized on worker-node-02
[ERROR] panic: runtime error: index out of range [0] with length 0
goroutine 1 [running]:
main.findOrder(0x2, 0x14000118040, 0x1, 0x1)
exit status 2`,
    submittedAt: '3 hours ago'
  }
];
