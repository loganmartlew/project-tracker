import { NextApiRequest, NextApiResponse } from 'next';

interface ProjectData {
  name: string;
  description: string;
  featured: boolean;
  links?: Link[];
  status: Status;
  milestones: Milestone[];
}

export interface Project extends ProjectData {
  _id?: Date;
  startDate: Date;
  endDate?: Date;
  dueDate?: Date;
}

export interface SerializedProject extends ProjectData {
  _id?: string;
  startDate: string;
  endDate?: string;
  dueDate?: string;
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

export type MethodHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;
