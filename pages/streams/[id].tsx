import ChatsBubble from '@components/ChatsBubble';
import ChatsInput from '@components/ChatsInput';
import PageLayout from '@components/PageLayout';
import useUser from '@libs/client/useUser';
import { IAPIGetStreamReturn } from '@pages/api/streams/[id]';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { id } = router.query;

  const { data: foundStreamData, mutate: messageMutate } =
    useSWR<IAPIGetStreamReturn>(id ? `/api/streams/${id}` : '');

  const sendMessageFn = (messageContent: string) => {
    if (!foundStreamData) return;

    messageMutate(
      {
        ...foundStreamData,
        foundStream: {
          ...foundStreamData.foundStream,
          messages: [
            ...foundStreamData.foundStream.messages,
            {
              content: messageContent,
              userName: user.name,
              userAvatar: user.avatar
            }
          ]
        }
      },
      false
    );
  };

  return (
    <PageLayout title={foundStreamData?.foundStream.title}>
      <div className="sticky top-0 w-full">
        <div className="mx-auto aspect-video w-full rounded-lg bg-slate-500" />
      </div>
      <div className="mt-5 border-b-2 border-t-2 p-2 pb-5">
        <h1 className="text-2xl font-semibold">
          {foundStreamData?.foundStream.title}
        </h1>
        <div className="flex items-center justify-around py-2">
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">Product</span>
            <p>{foundStreamData?.foundStream.productName}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">Price</span>
            <p>${foundStreamData?.foundStream.price}</p>
          </div>
        </div>
        <div>
          <span className="font-semibold">Description</span>
          <p className="cursor-default">
            {foundStreamData?.foundStream.description}
          </p>
        </div>
      </div>
      <div className="mb-20 pt-3">
        <h3 className="text-2xl font-semibold">Live Chats</h3>
        <div className="w-full overflow-hidden pb-16">
          {foundStreamData?.foundStream.messages.map(
            (message, messageIndex) => (
              <ChatsBubble
                key={messageIndex}
                userName={message.userName}
                userAvatar={message.userAvatar}
                isOpponent={Boolean(message.userName !== user?.name)}
                content={message.content}
              />
            )
          )}
        </div>
      </div>
      <ChatsInput
        streamId={id ? (typeof id === 'string' ? id : '') : ''}
        sendMessageFn={sendMessageFn}
      />
    </PageLayout>
  );
};

export default StreamDetail;
