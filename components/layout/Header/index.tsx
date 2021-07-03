import { FC } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { StyledHeader, Heading } from './HeaderStyles';
import Button from '@components/Button';

interface HeaderProps {
  withNewProjectBtn?: Boolean;
}

const Header: FC<HeaderProps> = ({ withNewProjectBtn }) => {
  return (
    <StyledHeader>
      <Link href='/' passHref>
        <Heading>Project Tracker</Heading>
      </Link>
      {withNewProjectBtn && (
        <Link href='/edit' passHref>
          <Button as='a' href='/edit' size='md'>
            <FaPlus />
            New Project
          </Button>
        </Link>
      )}
    </StyledHeader>
  );
};

export default Header;
