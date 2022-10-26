import { joinClass } from '@libs/client/utils';

interface ChatsBubbleProps {
  content: string;
  authorName: string;
  authorAvatar: string;
  reserve?: boolean;
}

const ChatsBubble = ({ content, authorName, reserve }: ChatsBubbleProps) => {
  return (
    <div
      className={joinClass(
        'flex items-center space-x-3 mt-3 justify-start',
        reserve ? 'justify-end' : ''
      )}
    >
      {reserve ? null : (
        <>
          <div className="w-6 h-6 bg-gray-400 rounded-full" />
          <span className="text-gray-500 font-bold text-xs">{authorName}</span>
        </>
      )}
      <p className="text-md text-gray-800">{content}</p>
    </div>
  );
};

export default ChatsBubble;
