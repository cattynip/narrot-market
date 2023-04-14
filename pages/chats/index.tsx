import { NextPage } from 'next';
import ChatsItem from '@components/ChatsItem';
import PageLayout from '@components/PageLayout';

const Chats: NextPage = () => {
  return (
    <PageLayout title="Chats">
      {[...Array(20)].map((_chat, chatIndex) => (
        <ChatsItem
          key={chatIndex}
          opponent={{ name: 'Cattynip', avatar: '/' }}
          lastChatTime="4min"
          lastChatContent="Hello, my name is Cattynip."
          isFirst={chatIndex === 0}
        />
      ))}
    </PageLayout>
  );
};

export default Chats;
