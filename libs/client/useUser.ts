import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IUseUserReturn {
  ok: boolean;
  message?: string;
  user: {
    id: number;
    phone?: string;
    email?: string;
    name?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const useUser = (): IUseUserReturn => {
  const [user, setUser] = useState({});
  const router = useRouter();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetch('/api/users/search', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (!data?.ok) {
          return router.replace('/welcome');
        }

        setUser(data);
      });
  }, []);

  return user;
};

export default useUser;
