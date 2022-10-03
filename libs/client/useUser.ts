import { useRouter } from 'next/router';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then(response => response.json());

function useUser() {
  const { data, error } = useSwr('/api/users/me', fetcher);
  const router = useRouter();

  return data;
}

export default useUser;
