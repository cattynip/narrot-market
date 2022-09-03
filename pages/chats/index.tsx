import type { NextPage } from 'next';
import ChatsItem from '../../components/chatsItem';
import Layout from '../../components/layout';

const Chats: NextPage = () => {
  return (
    <Layout title="Chats">
      <div className="divide-y-[1px] ">
        {[...Array(10)].map((value, idx) => (
          <ChatsItem
            author="Steve Jebs"
            content="See you tomorrow in the corner at 2pm!"
            key={idx}
            id={123}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
