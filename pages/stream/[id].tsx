import type { NextPage } from 'next';
import Layout from '@components/layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { GetStreamReturn } from 'pages/api/streams/[id]';
import ChatsBubble from '@components/chatsBubble';

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<GetStreamReturn>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );

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
          <h2 className="text-2xl font-bold text-gray-901 my-2 mt-3">
            Live Chat
          </h2>
          <div className="h-[50vh] overflow-y-scroll space-y-4">
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
            <ChatsBubble
              authorName="Seol SO"
              authorAvatar="Hello"
              content="Hi how much are you selling them for?"
            />
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <div className="flex relative max-w-md items-center  w-full mx-auto">
              <input
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
