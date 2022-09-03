import type { NextPage } from 'next';
import ChatsInput from '../../components/chatsInput';
import Layout from '../../components/layout';
import StreamBubble from '../../components/streamBubble';

const StreamDetail: NextPage = () => {
  return (
    <Layout title="Stream - {StreamName}" canGoBack>
      <div className="space-y-4">
        <div className="fixed top-12 left-0 p-4 w-full bg-white">
          <div className="w-full rounded-md shadow-sm bg-slate-500 aspect-video" />
          <h3 className="text-2xl text-gray-800 font-semibold mt-3 text-center">
            Let&apos;s try potatos
          </h3>
        </div>
        <div>
          <div className="pt-8">
            {[...Array(20)].map((value, idx) => (
              <StreamBubble content="Hello~!" isMe key={idx} />
            ))}
            {[...Array(20)].map((value, idx) => (
              <StreamBubble content="Hello~!" isMe={false} key={idx} />
            ))}
          </div>
          <ChatsInput />
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
