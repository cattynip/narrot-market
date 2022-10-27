import { joinClass } from '@libs/client/utils';
import Link from 'next/link';

interface ChatsBubbleUser {
  id: number;
  name: string;
  avatar: string;
}

interface ChatsBubbleProps {
  content: string;
  author: ChatsBubbleUser;
  reserve?: boolean;
}

const ChatsBubble = ({ content, author, reserve }: ChatsBubbleProps) => {
  return (
    <div
      className={joinClass(
        'flex items-center space-x-3 mt-3 justify-start',
        reserve ? 'justify-start flex-row-reverse' : ' '
      )}
    >
      <Link href={`/profile/${author.name}`}>
        <a>
          <div
            className={joinClass(
              'flex justify-center items-center',
              reserve ? 'flex-row-reverse' : ''
            )}
          >
            <div className={joinClass('w-6 h-6 bg-gray-400 rounded-full')} />
            <span className="text-gray-500 font-bold text-xs">
              {author.name}
            </span>
          </div>
        </a>
      </Link>
      <p className="text-md text-gray-800">{content}</p>
    </div>
  );
};

export default ChatsBubble;
