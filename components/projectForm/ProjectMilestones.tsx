import { FC, RefObject, MouseEventHandler } from 'react';
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
  deleteMilestone: (idx: number) => void;
  milestoneNameRef: RefObject<HTMLInputElement>;
  milestoneDescRef: RefObject<HTMLTextAreaElement>;
  milestoneCompleteRef: RefObject<HTMLInputElement>;
  addMilestone: MouseEventHandler;
}

const ProjectMilestones: FC<IProps> = props => {
  const {
    milestones,
    deleteMilestone,
    milestoneNameRef,
    milestoneDescRef,
    milestoneCompleteRef,
    addMilestone,
  } = props;

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
