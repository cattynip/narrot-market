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
            userName={'Cattynip'}
            userAvatar={'62bb3846-2487-4396-6c7e-858e86bb7000'}
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
