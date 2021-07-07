import { FormEventHandler, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signin } from 'next-auth/client';

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
    <form onSubmit={submit}>
      <label htmlFor='email'>
        <span>Email: </span>
        <input type='email' id='email' ref={emailRef} required />
      </label>
      <label htmlFor='password'>
        <span>Password: </span>
        <input type='password' id='password' ref={passwordRef} required />
      </label>
      <button type='submit'>Sign In</button>
    </form>
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
