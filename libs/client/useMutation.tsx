import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const useMutation = <T = any,>(
  link: string
): [(data?: any) => void, { loading: boolean; error: boolean; data: T }] => {
  const [data, setData] = useState<undefined | any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | any>(false);

  const mutate = (body?: any) => {
    setLoading(true);
    fetch(link, {
      method: 'POST',
      body: JSON.stringify(body ? body : {}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response =>
        response.json().catch(() => {
          return;
        })
      )
      .then(fetchData => {
        setData(fetchData);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return [mutate, { loading, data, error }];
};

export default useMutation;
