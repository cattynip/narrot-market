import type { NextPage } from 'next';
import Layout from '@components/layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { GetStreamReturn } from 'pages/api/streams/[id]';
import ChatsBubble from '@components/chatsBubble';
import BeautifulInput from '@components/beautifulInput';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { StreamMessageReturn } from 'pages/api/streams/[id]/message';
import useUser from '@libs/client/useUser';

interface SendMessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const user = useUser(true);
  const { data, mutate } = useSWR<GetStreamReturn>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000
    }
  );
  const {
    register,
    handleSubmit,
    reset: resetField
  } = useForm<SendMessageForm>();
  const [sendMessage] = useMutation<StreamMessageReturn>(
    `/api/streams/${router.query.id}/message`
  );

  const onValid = (validForm: SendMessageForm) => {
    resetField();
    mutate(
      prev =>
        prev &&
        ({
          ...prev,
          foundStream: {
            ...prev.foundStream,
            messages: [
              ...prev.foundStream.messages,
              {
                message: validForm.message,
                id: Date.now(),
                user: {
                  avatar: user.user?.avatar,
                  name: user.user?.name,
                  id: user.user?.id
                }
              }
            ]
          }
        } as any),
      false
    );
    sendMessage({ message: validForm.message });
  };

  return (
    <Layout
      title={`Stream - ${data?.foundStream?.name}`}
      canGoBack
      isNavbar={false}
    >
      <div>
        <div className="w-full shadow-sm bg-slate-300 aspect-video" />
        <div className="border-b-2">
          <div className="mt-5 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.foundStream?.name}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900 align-middle">
              ${data?.foundStream?.price}
            </h2>
          </div>
          <p className="my-3 text-gray-700">{data?.foundStream?.description}</p>
        </div>
        <div className="">
          <h2 className="text-2xl font-bold text-gray-901 my-2 mt-3">
            Live Chat
          </h2>
          <div className="h-[40vh] overflow-y-scroll space-y-4">
            {data?.foundStream?.messages?.map(message => (
              <ChatsBubble
                content={message.message}
                author={message.user}
                key={message.id}
                reserve={message.user.id === user.user?.id ? true : false}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit(onValid)}>
            <BeautifulInput
              inputType="text"
              placeholder="Hello~"
              isChatInput
              register={register('message', { required: true })}
              isRequired
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
