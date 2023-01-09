import ChatsBubble from '@components/ChatsBubble';
import ChatsInput from '@components/ChatsInput';
import PageLayout from '@components/PageLayout';
import { NextPage } from 'next';

const ChatsDetail: NextPage = () => {
  return (
    <PageLayout title="Cattynip">
      <div className="mb-20">
        {[...Array(30)].map((chat, chatIndex) => (
          <ChatsBubble
            key={chatIndex}
            content="Hello, I am Seol SO."
            isOpponent={chatIndex % 3 == 1 ? true : false}
          />
        ))}
      </div>
      <ChatsInput />
    </PageLayout>
  );
};

export default ChatsDetail;
