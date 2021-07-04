import { Schema, model, models } from 'mongoose';
import { Project } from '@types';

export const ProjectSchema = new Schema<Project>({
  name: {
    type: String,
    required: [true, 'Project name required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Project description required'],
  },
  featured: {
    type: Boolean,
    required: [true, 'Featured status required'],
  },
  startDate: Date,
  endDate: Date,
  dueDate: Date,
  links: [{ name: String, url: String }],
  status: {
    type: String,
    required: [true, 'Project status required'],
  },
  milestones: [
    {
      name: {
        type: String,
        required: [true, 'Milestone name required'],
      },
      description: String,
      complete: {
        type: Boolean,
        required: [true, 'Milestone completion status required'],
      },
    },
  ],
});

export const ProjectModel =
  models.Project || model<Project>('Project', ProjectSchema);
