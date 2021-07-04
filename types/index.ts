export interface Project {
  _id?: string;
  name: string;
  description: string;
  featured: boolean;
  links?: Link[];
  startDate: Date;
  endDate?: Date;
  dueDate?: Date;
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

export interface Filter {
  featured: boolean;
  status: Status | string | null;
}

export enum SortField {
  START_DATE = 'Start Date',
  END_DATE = 'End Date',
  DUE_DATE = 'Due Date',
  PROGRESS = 'Progress',
}

export interface SortType {
  field: SortField | string | null;
  order: 'asc' | 'desc';
}
