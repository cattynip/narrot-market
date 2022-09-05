import { useState } from 'react';

interface IUseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type TUseMutationReturn = [(data: any) => void, IUseMutationState];

const useMutation = (url: string): TUseMutationReturn => {
  const [state, setState] = useState<IUseMutationState>({
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
};

export default useMutation;
