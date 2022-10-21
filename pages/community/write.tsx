import type { NextPage } from 'next';
import BeautifulButton from '@components/beautifulButton';
import Layout from '@components/layout';
import { useForm } from 'react-hook-form';
import BeautifulInput from '@components/beautifulInput';
import useMutation from '@libs/client/useMutation';
import { PostPostReponse } from 'pages/api/posts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useCoords from '@libs/client/useCoords';

interface WriteForm {
  question: string;
}

const CommunityWrite: NextPage = () => {
  const { latitude, longitude } = useCoords();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<WriteForm>();
  const [post, { data, loading, error }] =
    useMutation<PostPostReponse>('/api/posts');
  const router = useRouter();

  const onValid = (validForm: WriteForm) => {
    if (loading) return;
    post({
      ...validForm,
      latitude,
      longitude
    });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data?.createdPost.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="Write New Post">
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="flex flex-col">
            <BeautifulInput
              inputType="description"
              placeholder="Write a question"
              label="Question"
              register={register('question', {
                required: {
                  value: true,
                  message: 'Question is required.'
                },
                maxLength: {
                  value: 200,
                  message: 'Question is too long.'
                },
                minLength: {
                  value: 5,
                  message: 'Question is too short.'
                }
              })}
              error={errors.question?.message}
              isRequired
            />
            <BeautifulButton buttonText={loading ? 'Loading...' : 'Submit'} />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityWrite;
