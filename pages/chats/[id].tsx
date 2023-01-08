import ChatsBubble from '@components/ChatsBubble';
import ChatsInput from '@components/ChatsInput';
import { NextPage } from 'next';

const ChatsDetail: NextPage = () => {
  return (
    <div>
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
    </div>
  );
};

export default ChatsDetail;
