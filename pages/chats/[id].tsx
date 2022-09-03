import type { NextPage } from 'next';
import ChatsBubble from '../../components/chatsBubble';
import ChatsInput from '../../components/chatsInput';
import Layout from '../../components/layout';

const ChatsDetail: NextPage = () => {
  return (
    <Layout title="Chat - {UserName}" canGoBack>
      <div>
        {[...Array(20)].map((_value, idx) => (
          <ChatsBubble content="Hello~!" key={idx} />
        ))}
      </div>
      <ChatsInput />
      <div className="h-24" />
    </Layout>
  );
};

export default ChatsDetail;
