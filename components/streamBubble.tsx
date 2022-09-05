import { joinClass } from '../libs/client/utils';

interface StreamBubbleProps {
  content: string;
  isMe: boolean;
}

const StreamBubble = ({ content, isMe }: StreamBubbleProps) => {
  return (
    <div
      className={joinClass(
        'flex items-start space-x-3',
        isMe ? 'justify-end' : 'justify-start'
      )}
    >
      <div className="border-2 border-gray-300 px-3 py-1.5 rounded-lg shadow-lg max-w-md mb-4">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default StreamBubble;
