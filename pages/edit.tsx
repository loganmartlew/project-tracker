import { server } from '@config';
import {
  useState,
  useRef,
  FC,
  MouseEventHandler,
  FormEventHandler,
} from 'react';
import { useRouter } from 'next/router';
import Header from '@components/layout/Header';
import Button from '@components/Button';
import Modal from '@components/Modal';
import ProjectName from '@components/projectForm/ProjectName';
import ProjectDescription from '@components/projectForm/ProjectDescription';
import ProjectFeatured from '@components/projectForm/ProjectFeatured';
import ProjectLinks from '@components/projectForm/ProjectLinks';
import ProjectDate from '@components/projectForm/ProjectDate';
import ProjectStatus from '@components/projectForm/ProjectStatus';
import ProjectMilestones from '@components/projectForm/ProjectMilestones';
import { CreateForm } from '@components/pageStyles/NewStyles';
import { Link, Milestone, Project, Status } from '@types';

const New: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [missingField, setMissingField] = useState<string>('');

  const [featured, setFeatured] = useState<boolean>(false);

  const [links, setLinks] = useState<Link[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const [endDate, setEndDate] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const linkNameRef = useRef<HTMLInputElement>(null);
  const linkUrlRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const milestoneNameRef = useRef<HTMLInputElement>(null);
  const milestoneDescRef = useRef<HTMLTextAreaElement>(null);
  const milestoneCompleteRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const addLink: MouseEventHandler = e => {
    e.preventDefault();

    const name = linkNameRef.current?.value;
    const url = linkUrlRef.current?.value;

    if (!name || !url) return;

    linkNameRef.current!.value = '';
    linkUrlRef.current!.value = '';

    const link: Link = {
      name,
      url,
    };

    setLinks(prevLinks => [...prevLinks, link]);
  };

  const deleteLink = (idx: number) => {
    const newLinks = links.filter((_, i) => i !== idx);
    setLinks(newLinks);
  };

  const addMilestone: MouseEventHandler = e => {
    e.preventDefault();

    const name = milestoneNameRef.current?.value;
    const description = milestoneDescRef.current?.value;
    const complete = milestoneCompleteRef.current?.checked;

    if (!name) return;

    milestoneNameRef.current!.value = '';
    milestoneDescRef.current!.value = '';
    milestoneCompleteRef.current!.checked = false;

    const milestone: Milestone = {
      name,
      description,
      complete: complete || false,
    };

    setMilestones(prevMilestones => [...prevMilestones, milestone]);
  };

  const deleteMilestone = (idx: number) => {
    const newMilestones = milestones.filter((_, i) => i !== idx);
    setMilestones(newMilestones);
  };

  const showMissingField = (field: string) => {
    setMissingField(field);
    setModalOpen(true);
  };

  const submit: FormEventHandler = e => {
    e.preventDefault();

    if (!nameRef.current?.value) return showMissingField('Name');
    if (!descRef.current?.value) return showMissingField('Description');
    if (!startDateRef.current?.value) return showMissingField('Start Date');
    if (!statusRef.current?.value) return showMissingField('Status');

    const newProject: any = {};

    newProject.name = nameRef.current.value;
    newProject.description = descRef.current.value;
    if (links.length > 0) {
      newProject.links = links;
    }
    newProject.featured = featured;
    newProject.startDate = new Date(startDateRef.current.value);
    if (endDate && endDateRef.current) {
      newProject.endDate = endDateRef.current.value;
    }
    if (dueDate && dueDateRef.current) {
      newProject.dueDate = dueDateRef.current.value;
    }
    newProject.status = statusRef.current.value as Status;
    if (milestones.length > 0) {
      newProject.milestones = milestones;
    }

    const project: Project = { ...newProject };

    fetch(`${server}/api/projects`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(project),
    }).then(() => {
      router.push('/');
    });
  };

  return (
    <>
      <Header />
      <CreateForm onSubmit={submit}>
        <Modal show={modalOpen} setShow={setModalOpen}>
          <p>
            Field <b>&apos;{missingField}&apos;</b> is required.
          </p>
          <p>Please enter this field and resubmit.</p>
          <Button as='button' onClick={() => setModalOpen(false)} size='md'>
            Close
          </Button>
        </Modal>

        <ProjectName nameRef={nameRef} />

        <ProjectDescription descRef={descRef} />

        <ProjectFeatured featured={featured} setFeatured={setFeatured} />

        <ProjectLinks
          links={links}
          deleteLink={deleteLink}
          linkNameRef={linkNameRef}
          linkUrlRef={linkUrlRef}
          addLink={addLink}
        />

        <ProjectDate id='startdate' label='Start Date' dateRef={startDateRef} />

        <ProjectDate
          id='enddate'
          label='End Date'
          setDate={setEndDate}
          checked={endDate}
          dateRef={endDateRef}
          optional
        />

        <ProjectDate
          id='duedate'
          label='Due Date'
          setDate={setDueDate}
          checked={dueDate}
          dateRef={dueDateRef}
          optional
        />

        <ProjectStatus statusRef={statusRef} />

        <ProjectMilestones
          milestones={milestones}
          deleteMilestone={deleteMilestone}
          milestoneNameRef={milestoneNameRef}
          milestoneDescRef={milestoneDescRef}
          milestoneCompleteRef={milestoneCompleteRef}
          addMilestone={addMilestone}
        />

        <Button as='button' type='submit' color='success' block>
          Save Project
        </Button>
      </CreateForm>
    </>
  );
};

export default New;
