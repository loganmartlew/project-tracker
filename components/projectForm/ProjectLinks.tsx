import { FC, MouseEventHandler, RefObject, SetStateAction } from 'react';
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
import { Link } from '@types';

interface IProps {
  links: Link[];
  setLinks: (value: SetStateAction<Link[]>) => void;
  linkNameRef: RefObject<HTMLInputElement>;
  linkUrlRef: RefObject<HTMLInputElement>;
}

const ProjectLinks: FC<IProps> = props => {
  const { links, setLinks, linkNameRef, linkUrlRef } = props;

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
            <LinkBtn onClick={addLink} $fill>
              <AiOutlinePlus />
            </LinkBtn>
          </LinkItem>
        </LinkList>
      </LinkSection>
    </FormSection>
  );
};

export default ProjectLinks;
