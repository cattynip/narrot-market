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
    if (data && !data.ok && isPublic) {
      router.replace('/enter');
    } else if (location.pathname === '/enter') {
      router.back();
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}

export default useUser;
