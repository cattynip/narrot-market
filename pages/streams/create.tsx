import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import PageLayout from '@components/PageLayout';
import useMutation from '@libs/client/useMutation';
import { IAPICreateStreamReturn } from '@pages/api/streams/create';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface CreateStreamForm {
  name: string;
  productName: string;
  price: number;
  description?: string;
}

const CreateStream: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateStreamForm>();
  const [
    createStream,
    { data: createStreamData, loading: createStreamLoading }
  ] = useMutation<IAPICreateStreamReturn>('/api/streams/create');

  const router = useRouter();

  const onValid = async (data: CreateStreamForm) => {
    if (!data) return;

    createStream(data);
  };

  useEffect(() => {
    if (createStreamData?.ok) {
      if (typeof createStreamData.id !== undefined) {
        router.push(`/streams/${createStreamData.id}`);
      }
    }
  }, [createStreamData, router]);

  return (
    <PageLayout title="Create a new Stream">
      <form className="space-y-3" onSubmit={handleSubmit(onValid)}>
        <div>
          <GlobalLabel content="Name" isRequired />
          <GlobalInput
            inputFor="text"
            placeholder="Super Mega Stream"
            register={register('name')}
          />
        </div>
        <div>
          <GlobalLabel content="Product Name" isRequired />
          <GlobalInput inputFor="text" register={register('productName')} />
        </div>
        <div>
          <GlobalLabel content="Price" isRequired />
          <GlobalInput
            inputFor="phone"
            extraInformation={{ supportText: 'USD' }}
            register={register('price')}
          />
        </div>
        <div>
          <GlobalLabel content="Description" isRequired={false} />
          <GlobalInput
            inputFor="description"
            register={register('description')}
          />
        </div>
        <GlobalButton>
          {createStreamLoading ? 'Creating a new stream...' : 'Upload'}
        </GlobalButton>
      </form>
    </PageLayout>
  );
};

export default CreateStream;
