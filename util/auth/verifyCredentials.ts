import { compare } from 'bcryptjs';

export const verifyPassword = async (password: string) => {
  const isValid = await compare(password, process.env.ADMIN_PASSWORD as string);
  return isValid;
};

export const verifyEmail = async (email: string) => {
  return email === process.env.ADMIN_EMAIL;
};
