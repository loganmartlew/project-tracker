import { useState, useEffect, FC } from 'react';
import { ContentWrapper } from '@components/pageStyles/HomeStyles';
import Header from '@components/layout/Header';
import ListFilters from '@components/ListFilters';
import ProjectList from '@components/ProjectList';
import { Filter, Project, SerializedProject, SortType } from '@types';
import { GetStaticProps } from 'next';
import projStringToDate from '@util/project/projStringToDate';
import getProjectProgress from '@util/project/getProjectProgress';
import getProjects from '@util/db/getProjects';
import serializeProject from '@util/project/serializeProject';

interface IProps {
  projects: SerializedProject[];
}

const defaultFilter: Filter = {
  featured: false,
  status: null,
};

const defaultSort: SortType = {
  field: null,
  order: 'asc',
};

const Home: FC<IProps> = ({ projects: propsProjects }) => {
  const projects = propsProjects.map(project => projStringToDate(project));

  const [allProjects, setProjects] = useState<Project[]>(projects);

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [searchedProjects, setSearchedProjects] = useState<Project[]>(projects);
  const [sortedProjects, setSortedProjects] = useState<Project[]>(projects);

  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [sort, setSort] = useState<SortType>(defaultSort);

  // Refetch projects client side
  useEffect(() => {
    fetch(`/api/projects`)
      .then(res => res.json())
      .then(projects => {
        projects = projects.map((project: SerializedProject) =>
          projStringToDate(project)
        );
        setProjects(projects);
      });
  }, []);

  // Filter on filter change
  useEffect(() => {
    let newProjects = [...allProjects];

    if (filter.featured) {
      newProjects = newProjects.filter(project => project.featured);
    }

    if (filter.status) {
      newProjects = newProjects.filter(
        project => project.status === filter.status
      );
    }

    setFilteredProjects(newProjects);
  }, [filter, allProjects]);

  // Filter on search
  useEffect(() => {
    const newProjects = filteredProjects.filter(
      project =>
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
    );

    setSearchedProjects([...newProjects]);
  }, [search, filteredProjects]);

  // Sort on sort change
  useEffect(() => {
    let newProjects = [...searchedProjects];

    if (sort.field) {
      switch (sort.field) {
        case 'Start Date':
          newProjects.sort((a, b) => {
            if (sort.order === 'asc') {
              console.log('ascending');
              return a.startDate.getTime() - b.startDate.getTime();
            }

            if (sort.order === 'desc') {
              console.log('descending');
              return b.startDate.getTime() - a.startDate.getTime();
            }

            return 0;
          });
          break;
        case 'End Date':
          newProjects = newProjects.filter(project => project.endDate);

          newProjects.sort((a, b) => {
            if (sort.order === 'asc') {
              return a.endDate!.getTime() - b.endDate!.getTime();
            }

            if (sort.order === 'desc') {
              return b.endDate!.getTime() - a.endDate!.getTime();
            }

            return 0;
          });
          break;
        case 'Due Date':
          newProjects = newProjects.filter(project => project.dueDate);

          newProjects.sort((a, b) => {
            if (sort.order === 'asc') {
              return a.dueDate!.getTime() - b.dueDate!.getTime();
            }

            if (sort.order === 'desc') {
              return b.dueDate!.getTime() - a.dueDate!.getTime();
            }

            return 0;
          });
          break;
        case 'Progress':
          newProjects.sort((a, b) => {
            const progressA = getProjectProgress(a);
            const progressB = getProjectProgress(b);

            if (sort.order === 'asc') {
              return progressA - progressB;
            }

            if (sort.order === 'desc') {
              return progressB - progressA;
            }

            return 0;
          });
          break;
      }
    }

    setSortedProjects(newProjects);
  }, [sort, searchedProjects]);

  return (
    <>
      <Header withNewProjectBtn />
      <ContentWrapper>
        <ListFilters
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
        <ProjectList projects={sortedProjects} />
      </ContentWrapper>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects();

  const serializedProjects = projects.map((project: Project) =>
    serializeProject(project)
  );

  return {
    props: {
      projects: serializedProjects,
    },
    revalidate: 600,
  };
};
