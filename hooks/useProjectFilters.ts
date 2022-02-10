import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Project, Filter, SortType } from '@types';

interface ProjectFilterOptions {}

interface ProjectFilters {
  projects: Project[];
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sort: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
}

const defaultFilter: Filter = {
  featured: false,
  status: null,
};

const defaultSort: SortType = {
  field: null,
  order: 'asc',
};

type UseProjectFilters = (
  projects: Project[],
  options: ProjectFilterOptions
) => ProjectFilters;

export const useProjectFilters: UseProjectFilters = (
  initialProjects: Project[],
  options: ProjectFilterOptions
) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tempProjects, setTempProjects] = useState<Project[]>(projects);

  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<SortType>(defaultSort);

  useEffect(() => {
    // Filter projects
  }, [projects, filter, search, sort]);

  const values: ProjectFilters = {
    projects,
    filter,
    setFilter,
    search,
    setSearch,
    sort,
    setSort,
  };

  return values;
};
