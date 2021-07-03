import { Link } from '@types';
import { FC, MouseEventHandler, RefObject } from 'react';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
import {
  FormSection,
  FormLabel,
  TextInput,
  LinkSection,
  LinkList,
  LinkItem,
  LinkName,
  LinkURL,
  LinkBtn,
} from './ProjectFormStyles';

interface IProps {
  links: Link[];
  deleteLink: (idx: number) => void;
  linkNameRef: RefObject<HTMLInputElement>;
  linkUrlRef: RefObject<HTMLInputElement>;
  addLink: MouseEventHandler;
}

const ProjectLinks: FC<IProps> = props => {
  const { links, deleteLink, linkNameRef, linkUrlRef, addLink } = props;

  return (
    <FormSection>
      <FormLabel>Links</FormLabel>
      <LinkSection>
        <LinkList>
          {links.map((link, i) => (
            <LinkItem key={i}>
              <LinkName>{link.name}</LinkName>
              <LinkURL>{link.url}</LinkURL>
              <LinkBtn onClick={() => deleteLink(i)}>
                <AiFillDelete />
              </LinkBtn>
            </LinkItem>
          ))}

          <LinkItem>
            <TextInput type='text' placeholder='Name' ref={linkNameRef} small />
            <TextInput type='text' placeholder='URL' ref={linkUrlRef} small />
            <LinkBtn onClick={addLink} fill>
              <AiOutlinePlus />
            </LinkBtn>
          </LinkItem>
        </LinkList>
      </LinkSection>
    </FormSection>
  );
};

export default ProjectLinks;
