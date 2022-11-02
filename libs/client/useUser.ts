import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { GetUsersMeResponse } from 'pages/api/users/me';
import { useEffect } from 'react';
import useSWR from 'swr';

export interface UseUserResponse {
  user: User | undefined;
  isLoading: boolean;
}

export const fetcher = (url: string) =>
  fetch(url).then(response => response.json());

function useUser(isPublic: boolean): UseUserResponse {
  const { data, error } = useSWR<GetUsersMeResponse>('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if (data?.ok === false && router.pathname !== '/welcome') {
      router.replace('/welcome');
    } else if (router.pathname === '/welcome') {
      router.back();
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}

export default useUser;
