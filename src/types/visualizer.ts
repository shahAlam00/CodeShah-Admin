export type VisualizerCategory = 
  | 'Sorting'
  | 'Searching'
  | 'Array'
  | 'Linked List'
  | 'Stack'
  | 'Queue'
  | 'Tree'
  | 'Graph'
  | 'Dynamic Programming';

export interface VisualizerConfig {
  defaultData: number[] | string[];
  animationSpeedMs: number;
  allowStepByStep: boolean;
  highlightColors: {
    comparing: string;
    swapping: string;
    sorted: string;
    active: string;
  };
}

export interface DSAVisualizer {
  id: string;
  name: string;
  slug: string;
  category: VisualizerCategory;
  description: string;
  algorithm: string;
  pseudocode: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  status: 'Published' | 'Beta' | 'Draft';
  viewCount: number;
  config: VisualizerConfig;
  updatedAt: string;
}
