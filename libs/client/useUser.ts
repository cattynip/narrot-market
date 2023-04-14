import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface IUseUserReturn {
  user: {
    id: number;
    phone?: string;
    email?: string;
    name: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
  };
  isLoading: boolean;
  error: boolean;
}

const useUser = (moveRouter?: boolean): IUseUserReturn => {
  const { data, isLoading, error } = useSWR('/api/users/search');
  const router = useRouter();

  return { user: data?.user, isLoading: isLoading, error };
};

export default useUser;
