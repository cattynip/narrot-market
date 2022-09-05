import { useState } from 'react';

interface IUseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

interface IUseMutationInput {
  data: any;
}

type TUseMutationReturn = [(data: any) => void, IUseMutationState]

const useMutation = (url: string): TUseMutationReturn => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  function mutation({ data }: IUseMutationInput) { }

  return [mutation, { loading, data, error }];
};

export default useMutation;
