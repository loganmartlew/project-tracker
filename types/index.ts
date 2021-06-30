export interface Project {
  name: string;
  description: string;
  featured: boolean;
  links?: Link[];
  startDate: Date | string;
  endDate?: Date | string;
  dueDate?: Date | string;
  status: Status;
  progress: number;
  milestones: Milestone[];
}

export interface Link {
  name: string;
  url: string;
}

export interface Milestone {
  name: string;
  description: string;
}

export enum Status {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  HOLD = 'On Hold',
  COMPLETE = 'Complete',
}
