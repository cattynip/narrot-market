interface IChatsBubble {
  content: string;
  isOpponent: boolean;
}

const ChatsBubble = ({ content, isOpponent }: IChatsBubble) => {
  return (
    <div
      className={`my-1 flex items-center justify-${
        isOpponent ? 'start' : 'end'
      } space-x-2`}
    >
      <p
        className={`text-${
          isOpponent ? 'left' : 'right'
        } max-w-md rounded-3xl m${
          isOpponent ? 'r' : 'l'
        }-autorounded-3xl border-2 border-gray-400 py-3 px-4`}
      >
        {content}
      </p>
    </div>
  );
};

export default ChatsBubble;
