import { server } from '@config';
import { useState, useEffect, FC, ChangeEvent } from 'react';
import { ContentWrapper } from '@components/pageStyles/HomeStyles';
import Header from '@components/layout/Header';
import ListFilters from '@components/ListFilters';
import { Project, Status } from '@types';
import ProjectList from '@components/ProjectList';

interface HomeProps {
  projects: Project[];
}

const Home: FC<HomeProps> = ({ projects }) => {
  const [allProjects, setProjects] = useState<Project[]>(projects);

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [search, setSearch] = useState<String>('');

  // Refetch projects client side
  useEffect(() => {
    fetch(`${server}/api/projects`)
      .then(res => res.json())
      .then(({ projects }) => setProjects(projects));
  }, []);

  // Filter on search
  useEffect(() => {
    const newProjects = allProjects.filter(
      project =>
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProjects(newProjects);
  }, [search, allProjects]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Header withNewProjectBtn />
      <ContentWrapper>
        <ListFilters setSearch={handleSearchChange} />
        <ProjectList projects={filteredProjects} />
      </ContentWrapper>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/projects`);
  const { projects } = await res.json();

  return {
    props: {
      projects,
    },
    revalidate: 43200, // 12 hrs
  };
};
