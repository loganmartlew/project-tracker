import { FC } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import {
  StyledHeader,
  Heading,
  ButtonWrapper,
  AuthButton,
} from './HeaderStyles';
import Button from '@components/Button';
import { useSession } from 'next-auth/client';

interface HeaderProps {
  withNewProjectBtn?: Boolean;
}

const Header: FC<HeaderProps> = ({ withNewProjectBtn }) => {
  const [session, loading] = useSession();

  return (
    <StyledHeader>
      <Link href='/' passHref>
        <Heading>Project Tracker</Heading>
      </Link>
      <ButtonWrapper>
        {!session && !loading && (
          <Link href='/signin' passHref>
            <AuthButton>Sign In</AuthButton>
          </Link>
        )}

        {withNewProjectBtn && (
          <Link href='/edit' passHref>
            <Button as='a' href='/edit' size='md'>
              <FaPlus />
              New Project
            </Button>
          </Link>
        )}
      </ButtonWrapper>
    </StyledHeader>
  );
};

export default Header;
