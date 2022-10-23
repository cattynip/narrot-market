import type { NextPage } from 'next';
import ChatsInput from '@components/chatsInput';
import Layout from '@components/layout';
import StreamBubble from '@components/streamBubble';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { GetStreamReturn } from 'pages/api/streams/[id]';

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<GetStreamReturn>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );

  console.log(data);

  return (
    <Layout title={`Stream - ${data?.foundStream.name}`} canGoBack>
      <div className="space-y-4">
        <div className="fixed top-12 left-0 p-4 w-full bg-white">
          <div className="w-full rounded-md shadow-sm bg-slate-500 aspect-video" />
          <h3 className="text-2xl text-gray-800 font-semibold mt-3 text-center">
            {data?.foundStream.name}
          </h3>
        </div>
        <div>
          <div className="pt-8">
            <span>Mesasges</span>
          </div>
          <ChatsInput />
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
