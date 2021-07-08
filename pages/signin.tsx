import { FormEventHandler, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signin } from 'next-auth/client';
import Header from '@components/layout/Header';
import Button from '@components/Button';
import {
  PageWrapper,
  Heading,
  SigninForm,
  FormField,
  FieldLabel,
  FieldInput,
} from '@components/pageStyles/SigninStyles';

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const submit: FormEventHandler = async e => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    const result = await signin('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result?.error) {
      router.replace('/');
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <Heading>Sign In</Heading>
        <SigninForm onSubmit={submit}>
          <FormField htmlFor='email'>
            <FieldLabel>Email: </FieldLabel>
            <FieldInput type='email' id='email' ref={emailRef} required />
          </FormField>
          <FormField htmlFor='password'>
            <FieldLabel>Password: </FieldLabel>
            <FieldInput
              type='password'
              id='password'
              ref={passwordRef}
              required
            />
          </FormField>
          <Button type='submit'>Sign In</Button>
        </SigninForm>
      </PageWrapper>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
