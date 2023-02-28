import Link from 'next/link';

interface IChatsBubble {
  content: string;
  userName: string;
  userAvatar: string;
  isOpponent: boolean;
}

const ChatsBubble = ({
  content,
  userName,
  userAvatar,
  isOpponent
}: IChatsBubble) => {
  return (
    <div
      className={`my-1 flex items-center justify-${
        isOpponent ? 'start' : 'end'
      } space-x-2`}
    >
      {isOpponent ? (
        <Link href={`/users/${userName}`}>
          <div className="h-10 w-10 rounded-full bg-slate-400" />
        </Link>
      ) : null}
      <p
        className={`text-${
          isOpponent ? 'left' : 'right'
        } max-w-md rounded-2xl m${
          isOpponent ? 'r' : 'l'
        }-autorounded-3xl border-2 border-gray-400 py-3 px-4`}
      >
        {content}
      </p>
    </div>
  );
};

export default ChatsBubble;
