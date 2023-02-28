import HelpButton from '@components/HelpButton';
import Icon from '@components/Icon';
import PageLayout from '@components/PageLayout';
import StreamItem from '@components/StreamItem';
import { IAPIGetAllStreamsReturn } from '@pages/api/streams';
import { NextPage } from 'next';
import useSWR from 'swr';

const Stream: NextPage = () => {
  const { data: foundData } = useSWR<IAPIGetAllStreamsReturn>('/api/streams/');

  return (
    <PageLayout title="Streams">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {foundData?.foundStreams.map((stream, streamIndex) => (
          <StreamItem
            key={streamIndex}
            id={stream.id}
            title={stream.title}
            price={stream.price}
            userName={stream.userName}
          />
        ))}
      </div>
      <HelpButton linkTo="/streams/create">
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
