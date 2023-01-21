import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface IUseUserReturn {
  user: {
    id: number;
    phone?: string;
    email?: string;
    name?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  isLoading: boolean;
}

const useUser = (): IUseUserReturn => {
  const { data, isLoading } = useSWR('/api/users/search');
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.push('/welcome');
    }
  }, [data, router]);

  return { user: data?.user, isLoading: isLoading };
};

export default useUser;
