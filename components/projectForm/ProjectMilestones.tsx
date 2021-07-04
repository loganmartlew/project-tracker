import { FC, RefObject, MouseEventHandler, SetStateAction } from 'react';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
import {
  FormSection,
  FormLabel,
  TextInput,
  TextArea,
  LinkBtn,
  MilestoneSection,
  MilestoneList,
  MilestoneItem,
  MilestoneBottomRow,
  MilestoneForm,
} from './ProjectFormStyles';
import { Milestone } from '@types';

interface IProps {
  milestones: Milestone[];
  setMilestones: (value: SetStateAction<Milestone[]>) => void;
  milestoneNameRef: RefObject<HTMLInputElement>;
  milestoneDescRef: RefObject<HTMLTextAreaElement>;
  milestoneCompleteRef: RefObject<HTMLInputElement>;
}

const ProjectMilestones: FC<IProps> = props => {
  const {
    milestones,
    setMilestones,
    milestoneNameRef,
    milestoneDescRef,
    milestoneCompleteRef,
  } = props;

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

  return (
    <FormSection htmlFor='milestones'>
      <FormLabel>Milestones</FormLabel>
      <MilestoneSection>
        <MilestoneList>
          {milestones.map((milestone, i) => (
            <MilestoneItem key={i}>
              <p>{milestone.name}</p>
              <p>{milestone.description}</p>
              <MilestoneBottomRow>
                <p>Status: {milestone.complete ? 'Complete' : 'Incomplete'}</p>
                <LinkBtn onClick={() => deleteMilestone(i)} milestone>
                  <AiFillDelete />
                </LinkBtn>
              </MilestoneBottomRow>
            </MilestoneItem>
          ))}
          <MilestoneForm>
            <TextInput
              type='text'
              placeholder='Name'
              ref={milestoneNameRef}
              small
              block
            />
            <TextArea
              placeholder='Description'
              ref={milestoneDescRef}
              small
            ></TextArea>
            <label htmlFor='milestonecomplete'>
              <span>Complete: </span>
              <input
                type='checkbox'
                id='milestonecomplete'
                ref={milestoneCompleteRef}
              />
            </label>
            <LinkBtn onClick={addMilestone} $fill>
              <AiOutlinePlus />
            </LinkBtn>
          </MilestoneForm>
        </MilestoneList>
      </MilestoneSection>
    </FormSection>
  );
};

export default ProjectMilestones;
