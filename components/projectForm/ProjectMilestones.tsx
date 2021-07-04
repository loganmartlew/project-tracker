import { FC, RefObject, MouseEventHandler, SetStateAction } from 'react';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import {
  FormSection,
  FormLabel,
  TextInput,
  TextArea,
  LinkBtn,
  MilestoneSection,
  MilestoneList,
  MilestoneItem,
  MilestoneTopRow,
  MilestoneMiddleRow,
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

  const toggleMilestoneComplete = (idx: number) => {
    const newMilestones = [...milestones];

    newMilestones[idx].complete = !newMilestones[idx].complete;

    setMilestones([...newMilestones]);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;

    const newMilestones = [...milestones];

    const currMilestone = newMilestones[idx];
    const prevMilestone = newMilestones[idx - 1];

    newMilestones[idx] = prevMilestone;
    newMilestones[idx - 1] = currMilestone;

    setMilestones([...newMilestones]);
  };

  const moveDown = (idx: number) => {
    if (milestones.length === idx + 1) return;

    const newMilestones = [...milestones];

    const currMilestone = newMilestones[idx];
    const nextMilestone = newMilestones[idx + 1];

    newMilestones[idx] = nextMilestone;
    newMilestones[idx + 1] = currMilestone;

    setMilestones([...newMilestones]);
  };

  return (
    <FormSection htmlFor='milestones'>
      <FormLabel>Milestones</FormLabel>
      <MilestoneSection>
        <MilestoneList>
          {milestones.map((milestone, i) => (
            <MilestoneItem key={i}>
              <MilestoneTopRow>
                <p>{milestone.name}</p>
                <LinkBtn onClick={() => moveUp(i)} sort>
                  <TiArrowSortedUp />
                </LinkBtn>
              </MilestoneTopRow>
              <MilestoneMiddleRow>
                <p>{milestone.description}</p>
                <LinkBtn onClick={() => moveDown(i)} sort>
                  <TiArrowSortedDown />
                </LinkBtn>
              </MilestoneMiddleRow>
              <MilestoneBottomRow>
                <p>
                  Complete:{' '}
                  <input
                    type='checkbox'
                    onChange={() => toggleMilestoneComplete(i)}
                    checked={milestone.complete}
                  />
                </p>
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
