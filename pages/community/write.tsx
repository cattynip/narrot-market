import { NextPage } from 'next';
import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import PageLayout from '@components/PageLayout';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { IAPICommunitiesWriteReturn } from '@pages/api/communities/write';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface IWritePostForm {
  title: string;
  question: string;
}

const CommunityWrite: NextPage = () => {
  const { register, handleSubmit } = useForm<IWritePostForm>();
  const [writePost, { data: writeData, loading }] =
    useMutation<IAPICommunitiesWriteReturn>('/api/communities/write');

  const router = useRouter();

  const onValid = (formData: IWritePostForm) => {
    writePost({
      ...formData
    });
  };

  useEffect(() => {
    if (writeData) {
      if (writeData.ok) {
        router.push(`/community/${writeData.id}`);
      }
    }
  }, [writeData, router]);

  return (
    <PageLayout title="Write a new Post">
      <form className="space-y-2" onSubmit={handleSubmit(onValid)}>
        <div>
          <GlobalLabel content="Title" isRequired />
          <GlobalInput inputFor="text" register={register('title')} />
        </div>
        <div>
          <GlobalLabel content="Question" isRequired />
          <GlobalInput inputFor="description" register={register('question')} />
        </div>
        <GlobalButton>
          {loading ? 'Writing Post...' : 'Write Post'}
        </GlobalButton>
      </form>
    </PageLayout>
  );
};

export default CommunityWrite;
