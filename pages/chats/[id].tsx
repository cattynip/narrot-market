import type { NextPage } from 'next';
import ChatsBubble from '@components/chatsBubble';
import Layout from '@components/layout';

const ChatsDetail: NextPage = () => {
  return (
    <Layout title="Chat - {UserName}" canGoBack>
      <div>
        {[...Array(20)].map((_value, idx) => (
          <ChatsBubble
            content="Hello~!"
            author={{ name: '', avatar: '', id: 12 }}
            key={idx}
          />
        ))}
      </div>
      <div className="h-24" />
    </Layout>
  );
};

export default ChatsDetail;
