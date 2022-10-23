import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Enter: NextPage = props => {
  const router = useRouter();

  router.replace('/welcome');

  return null;
};

export default Enter;
