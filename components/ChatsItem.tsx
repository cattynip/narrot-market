interface IChatsItem {
  opponent: {
    name: string;
    avatar: string;
  };
  lastChatTime: string;
  lastChatContent: string;
  isFirst: boolean;
}

const ChatsItem = ({
  opponent,
  lastChatTime,
  lastChatContent,
  isFirst
}: IChatsItem) => {
  return (
    <div
      className={`flex items-center justify-between ${
        isFirst ? '-mt-5' : 'border-t-2'
      } py-3`}
    >
      <div className="flex items-center justify-start space-x-3">
        <div className="h-12 w-12 rounded-full bg-slate-400" />
        <div>
          <h2 className="text-xl">{opponent.name}</h2>
          <p className="text-gray-600">{lastChatContent}</p>
        </div>
      </div>
      <span className="text-gray-500">{lastChatTime}</span>
    </div>
  );
};

export default ChatsItem;
