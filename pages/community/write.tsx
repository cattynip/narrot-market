import { NextPage } from 'next';
import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';

const CommunityWrite: NextPage = () => {
  return (
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
  );
};

export default CommunityWrite;
