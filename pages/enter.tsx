import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Enter: NextPage = props => {
  const router = useRouter();

  useEffect(() => {
    router.push('/welcome');
  }, [router]);

  return null;
};

export default Enter;
