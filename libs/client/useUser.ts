import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSwr from 'swr';

export const fetcher = (url: string) =>
  fetch(url).then(response => response.json());

function useUser() {
  const { data, error } = useSwr('/api/users/me', fetcher);
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    } else if (location.pathname === '/enter') {
      router.replace('/');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}

export default useUser;
