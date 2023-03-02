import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import GlobalInput from './GlobalInput';

interface IChatsInputProps {
  streamId: string;
  sendMessageFn: (messageContent: string) => void;
}

interface MessageForm {
  content: string;
}

const ChatsInput = ({ streamId, sendMessageFn }: IChatsInputProps) => {
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage] = useMutation(`/api/streams/${streamId}/message`);

  const onValid = (formData: MessageForm) => {
    if (!formData) return;

    sendMessage({
      content: formData.content
    });

    sendMessageFn(formData.content);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="fixed bottom-16 left-0 flex h-24 w-full items-center justify-center"
    >
      <GlobalInput
        inputFor="text"
        className="mx-auto w-11/12"
        placeholder="Hello"
        register={register('content')}
      />
    </form>
  );
};

export default ChatsInput;
