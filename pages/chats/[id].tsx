import ChatsBubble from '@components/ChatsBubble';
import GlobalInput from '@components/GlobalInput';
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
      <div className="fixed bottom-0 left-0 flex h-24 w-full items-center justify-center bg-gradient-to-t from-gray-400 to-transparent">
        <GlobalInput
          inputFor="text"
          className="mx-auto w-11/12"
          placeholder="Hello, I am Seol SO."
        />
      </div>
    </div>
  );
};

export default ChatsDetail;
