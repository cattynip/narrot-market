import type { NextPage } from 'next';
import Layout from '@components/layout';
import BeautifulInput from '@components/beautifulInput';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { PostStreamBody, PostStreamReturn } from 'pages/api/streams';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import BeautifulButton from '@components/beautifulButton';

const StreamCreate: NextPage = () => {
  const router = useRouter();
  const [createStream, { data, loading, error }] =
    useMutation<PostStreamReturn>('/api/streams/');
  const { register, handleSubmit } = useForm<PostStreamBody>();

  const onValid = (validForm: PostStreamBody) => {
    if (loading) return;
    createStream({
      name: validForm.name,
      price: validForm.price,
      description: validForm.description
    });
  };

  useEffect(() => {
    if (data && data?.ok && !error) {
      router.push(`/stream/${data.createdStreamId}`);
    }
  }, [data, router, error]);

  return (
    <Layout title="Create Stream">
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <div>
            <BeautifulInput
              inputType="text"
              label="Name"
              placeholder="Name"
              register={register('name')}
              isRequired
            />
          </div>
          <div>
            <BeautifulInput
              inputType="number"
              label="Price"
              placeholder="$666"
              register={register('price', { valueAsNumber: true })}
              isRequired
            />
          </div>
          <div>
            <BeautifulInput
              inputType="description"
              label="Description"
              placeholder="Description"
              register={register('description')}
            />
          </div>
        </div>
        <div className="mt-4">
          <BeautifulButton
            buttonText={loading ? 'Creating...' : 'Create a New Stream'}
          />
        </div>
      </form>
    </Layout>
  );
};

export default StreamCreate;
