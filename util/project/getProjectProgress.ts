import { Project } from '@types';

const getProjectProgress = (project: Project) => {
  if (project.milestones.length === 0) return 0;

  const completedMilestones = project.milestones.reduce((count, curr) => {
    if (curr.complete) return count + 1;
    return count;
  }, 0);

  const progress = (completedMilestones / project.milestones.length) * 100;

  return progress;
};

export default getProjectProgress;
