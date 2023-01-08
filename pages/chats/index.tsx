import { NextPage } from 'next';
import ChatsItem from '@components/ChatsItem';

const Chats: NextPage = () => {
  return (
    <div>
      {[...Array(20)].map((chat, chatIndex) => (
        <ChatsItem
          key={chatIndex}
          opponent={{ name: 'Cattynip', avatar: '/' }}
          lastChatTime="4min"
          lastChatContent="Hello, my name is Cattynip."
        />
      ))}
    </div>
  );
};

export default Chats;
