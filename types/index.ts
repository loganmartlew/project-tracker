export interface Project {
  name: string;
  description: string;
  featured: boolean;
  links?: Link[];
  startDate: Date | string;
  endDate?: Date | string;
  dueDate?: Date | string;
  status: Status;
  milestones: Milestone[];
}

export interface Link {
  name: string;
  url: string;
}

export interface Milestone {
  name: string;
  description: string | undefined;
  complete: boolean;
}

export enum Status {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  HOLD = 'On Hold',
  COMPLETE = 'Complete',
}
