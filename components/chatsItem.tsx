interface ChatsItemProps {
  author: string;
  content: string;
  id: number;
}

const ChatsItem = ({ author, content, id }: ChatsItemProps) => {
  return (
    <a
      className="flex px-4 cursor-pointer py-3 items-center space-x-3"
      href={`/chats/${id}`}
    >
      <div className="w-12 h-12 rounded-full bg-slate-300" />
      <div>
        <p className="text-gray-700">{author}</p>
        <p className="text-sm  text-gray-500">{content}</p>
      </div>
    </a>
  );
};

export default ChatsItem;
