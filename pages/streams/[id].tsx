import ChatsBubble from '@components/ChatsBubble';
import ChatsInput from '@components/ChatsInput';
import PageLayout from '@components/PageLayout';
import { NextPage } from 'next';

const StreamDetail: NextPage = () => {
  return (
    <PageLayout title="New iPhone 23 Unboxing">
      <div className="sticky top-0 w-full">
        <div className="mx-auto aspect-video w-full rounded-lg bg-slate-500" />
      </div>
      <div className="mt-5 border-b-2 border-t-2 p-2 pb-5">
        <h1 className="text-2xl font-semibold">New iPhone 23 Unboxing</h1>
        <div className="flex items-center justify-around py-2">
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">Product</span>
            <p>iPhone 23</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">Price</span>
            <p>$300</p>
          </div>
        </div>
        <div>
          <span className="font-semibold">Description</span>
          <p className="cursor-default">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
            auctor erat, ut pulvinar arcu. Etiam accumsan enim in enim
            elementum, sed mattis mi feugiat. Integer justo diam, porttitor vel
            posuere quis, euismod vitae est. Donec accumsan tristique mauris ut
            finibus. Nunc sodales justo id justo varius, in blandit augue
            dapibus. Donec orci ex, lobortis at dignissim eu, auctor nec urna.
            Donec vitae mi pretium, tincidunt ligula in, ornare odio. Mauris
            turpis metus, fermentum ut pellentesque ac, hendrerit vel purus.
            Maecenas lobortis consectetur felis ut egestas. Nullam feugiat eu
            augue eget facilisis. Mauris in dapibus nisi.
          </p>
        </div>
      </div>
      <div className="mb-20 pt-3">
        <h3 className="text-2xl font-semibold">Live Chats</h3>
        <div className="w-full overflow-hidden">
          {[...Array(30)].map((chat, chatIndex) => (
            <ChatsBubble
              key={chatIndex}
              content="Hello, I am Seol SO."
              isOpponent={chatIndex % 2 == 1 ? true : false}
            />
          ))}
        </div>
      </div>
      <ChatsInput />
    </PageLayout>
  );
};

export default StreamDetail;
