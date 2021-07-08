import { useState, useEffect, FC, MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import { AiFillGithub, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { HiDocumentText } from 'react-icons/hi';
import { FiLink2 } from 'react-icons/fi';
import ProgressBar from '@ramonak/react-progress-bar';
import Header from '@components/layout/Header';
import Modal from '@components/Modal';
import Button from '@components/Button';
import FeaturedIcon from '@components/FeaturedIcon';
import {
  ProjectContainer,
  ModalText,
  ModalButtons,
  MainSection,
  TopRow,
  Name,
  ProjectButtons,
  Description,
  StatusContainer,
  StatusBadge,
  DateContainer,
  Date,
  LinksSection,
  MilestonesSection,
  MilestonesTop,
  MilestonesHeading,
  MilestoneList,
  Milestone,
  MilestoneBadge,
} from '@components/pageStyles/ProjectStyles';
import getProject from '@util/db/getProject';
import projStringToDate from '@util/project/projStringToDate';
import getProjectProgress from '@util/project/getProjectProgress';
import { Project, SerializedProject } from '@types';
import getProjects from '@util/db/getProjects';
import serializeProject from '@util/project/serializeProject';

interface IProps {
  project: SerializedProject;
}

const ProjectPage: FC<IProps> = ({ project: propsProject }) => {
  const [project, setProject] = useState<Project>(
    projStringToDate(propsProject)
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [session, loading] = useSession();

  const router = useRouter();

  const projectId = router.query.id;

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => {
        setProject(projStringToDate(data));
      });
  }, [propsProject, projectId]);

  const hasLinks = (project.links?.length &&
    project.links.length > 0) as boolean;

  const hasMilestones = (project.milestones?.length &&
    project.milestones.length > 0) as boolean;

  const getLinkIcon = (url: string) => {
    if (url.includes('github')) {
      return <AiFillGithub />;
    }

    const documentStrings = ['docs.google.com', 'document', '.pdf'];

    for (const value in documentStrings) {
      if (url.includes(value)) {
        return <HiDocumentText />;
      }
    }

    return <FiLink2 />;
  };

  const confirmDelete: MouseEventHandler = e => {
    e.preventDefault();
    setModalOpen(true);
  };

  const deleteProject: MouseEventHandler = e => {
    e.preventDefault();

    setModalOpen(false);

    fetch(`/api/projects/${project._id}`, {
      method: 'delete',
    })
      .then(res => {
        if (res.status !== 200) throw new Error();

        router.push('/');
      })
      .catch(() => {
        alert('Failed to delete project');
      });
  };

  return (
    <>
      <Header withNewProjectBtn />
      <ProjectContainer>
        <Modal show={modalOpen} setShow={setModalOpen}>
          <ModalText>
            You are attempting to delete the project{' '}
            <b>&apos;{project.name}&apos;</b>. This action cannot be undone. Do
            you wish to continue?
          </ModalText>
          <ModalButtons>
            <Button onClick={() => setModalOpen(false)} contentWidth>
              Cancel
            </Button>
            <Button onClick={deleteProject} color='danger' contentWidth>
              Delete
            </Button>
          </ModalButtons>
        </Modal>
        <MainSection>
          <TopRow>
            <Name>
              {project.name} {project.featured && <FeaturedIcon />}
            </Name>
            {session && (
              <ProjectButtons>
                <Link href={`/edit?id=${project._id}`} passHref>
                  <Button as='a' color='success' size='sm'>
                    Edit <AiFillEdit />
                  </Button>
                </Link>
                <Button onClick={confirmDelete} color='danger' size='sm'>
                  Delete <AiFillDelete />
                </Button>
              </ProjectButtons>
            )}
          </TopRow>
          <Description>{project.description}</Description>
          <StatusContainer>
            <p>
              <b>Status: </b>
            </p>
            <StatusBadge>{project.status}</StatusBadge>
          </StatusContainer>
          <DateContainer>
            <Date>
              <b>Start Date: </b>
              {(project.startDate as Date).toDateString()}
            </Date>
            {project.endDate && (
              <Date>
                <b>End Date: </b>
                {(project.endDate as Date).toDateString()}
              </Date>
            )}
            {project.dueDate && (
              <Date>
                <b>Due Date: </b>
                {(project.dueDate as Date).toDateString()}
              </Date>
            )}
          </DateContainer>
        </MainSection>
        {hasLinks ? (
          <LinksSection>
            {project.links?.map((link, i) => (
              <Link href={link.url} passHref key={i}>
                <Button as='a' color='success'>
                  {link.name}
                  {getLinkIcon(link.url)}
                </Button>
              </Link>
            ))}
          </LinksSection>
        ) : null}
        {hasMilestones ? (
          <MilestonesSection>
            <MilestonesTop>
              <MilestonesHeading>Milestones</MilestonesHeading>
              <ProgressBar
                completed={getProjectProgress(project)}
                bgColor='#2fce7e'
                baseBgColor='#E9BCAF'
                isLabelVisible={false}
              />
            </MilestonesTop>
            <MilestoneList>
              {project.milestones.map((milestone, i) => (
                <Milestone key={i}>
                  <h4>{milestone.name}</h4>
                  <p>{milestone.description}</p>
                  <MilestoneBadge complete={milestone.complete}>
                    {milestone.complete ? 'Complete' : 'Incomplete'}
                  </MilestoneBadge>
                </Milestone>
              ))}
            </MilestoneList>
          </MilestonesSection>
        ) : null}
      </ProjectContainer>
    </>
  );
};

export default ProjectPage;

export const getStaticProps: GetStaticProps = async ctx => {
  const projectId = ctx.params?.id;

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  const project = await getProject(projectId as string);

  if (!project) {
    return {
      notFound: true,
    };
  }

  const serializedProject = serializeProject(project);

  return {
    props: { project: serializedProject },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();

  const featuredProjects = projects.filter(project => project.featured);

  const paths = featuredProjects.map(project => {
    const serializedProject = serializeProject(project);

    return {
      params: { id: serializedProject._id },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};
