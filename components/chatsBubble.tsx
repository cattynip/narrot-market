import { joinClass } from '../libs/client/utils';

interface ChatsBubbleProps {
  content: string;
  isMe?: boolean;
}

const ChatsBubble = ({ content, isMe }: ChatsBubbleProps) => {
  return (
    <div
      className={joinClass(
        'flex items-center space-x-3 my-3',
        isMe ? 'justify-end' : 'justify-start'
      )}
    >
      {!isMe ? <div className="w-11 h-11 bg-gray-400 rounded-full" /> : null}
      <div className="border-2 border-gray-300 px-3 py-1.5 rounded-lg shadow-lg max-w-md">
        <p className="text-sm">{content}</p>
      </div>
      {isMe ? <div className="w-11 h-11 bg-gray-400 rounded-full" /> : null}
    </div>
  );
};

export default ChatsBubble;
