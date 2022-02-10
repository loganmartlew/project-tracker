const fetchProjects = () => {
  return fetch(`/api/projects`).then(res => res.json());
};

export default fetchProjects;
