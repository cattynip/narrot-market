import { useState } from 'react';

interface IUseMutationState<T> {
  loading: boolean;
  error?: object;
  data?: T;
}

type TUseMutationReturn<T> = [(data: any) => void, IUseMutationState<T>];

function useMutation<T = any>(url: string): TUseMutationReturn<T> {
  const [state, setState] = useState<IUseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined
  });

  function mutation(data: any) {
    setState(prev => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().catch(() => {
          console.log('Error in response');
        })
      )
      .then(data => setState(prev => ({ ...prev, data })))
      .catch(error => setState(prev => ({ ...prev, error })))
      .finally(() => setState(prev => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}

export default useMutation;
