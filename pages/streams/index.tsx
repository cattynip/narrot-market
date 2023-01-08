import HelpButton from '@components/HelpButton';
import Icon from '@components/Icon';
import PageLayout from '@components/PageLayout';
import StreamItem from '@components/StreamItem';
import { NextPage } from 'next';

const Stream: NextPage = () => {
  return (
    <PageLayout title="Streams">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[...Array(20)].map((stream, streamIndex) => (
          <StreamItem key={streamIndex} title="New iPhone 23 Unboxing" />
        ))}
      </div>
      <HelpButton>
        <Icon
          d="stream"
          size={27}
          hightColor={{
            variable: true,
            highlightType: {
              true: 'whiteHightlight',
              false: 'whiteHightlight'
            }
          }}
        />
      </HelpButton>
    </PageLayout>
  );
};

export default Stream;
