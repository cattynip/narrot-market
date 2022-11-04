import type { NextPage } from 'next';
import Layout from '@components/layout';
import StreamItem from '@components/streamItem';
import useSWR from 'swr';
import { GetStreamsReturn } from 'pages/api/streams';
import Badge from '@components/badge';

const Stream: NextPage = () => {
  const { data } = useSWR<GetStreamsReturn>('/api/streams?page=1');

  return (
    <Layout title="Stream">
      <div className="px-4 space-y-4 divide-y-2">
        {data?.foundStreams?.map(stream => (
          <StreamItem
            title={stream.name}
            videoId={stream.cloudflareId}
            streamId={stream.id}
            key={stream.id}
          />
        ))}

        <Badge href="/stream/create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </Badge>
      </div>
    </Layout>
  );
};

export default Stream;
