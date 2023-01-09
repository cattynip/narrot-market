import { NextPage } from 'next';
import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import PageLayout from '@components/PageLayout';

const CommunityWrite: NextPage = () => {
  return (
    <PageLayout title="Write a new Post">
      <div className="space-y-2">
        <div>
          <GlobalLabel content="Title" isRequired />
          <GlobalInput inputFor="text" />
        </div>
        <div>
          <GlobalLabel content="Question" isRequired />
          <GlobalInput inputFor="description" />
        </div>
        <GlobalButton>Write Post</GlobalButton>
      </div>
    </PageLayout>
  );
};

export default CommunityWrite;
