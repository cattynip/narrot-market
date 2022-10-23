interface ChatsBubbleProps {
  content: string;
  authorName: string;
  authorAvatar: string;
}

const ChatsBubble = ({ content, authorName }: ChatsBubbleProps) => {
  return (
    <div className="flex items-center space-x-3 mt-3 justify-start">
      <div className="w-6 h-6 bg-gray-400 rounded-full" />
      <span className="text-gray-500 font-bold text-xs">{authorName}</span>
      <p className="text-md text-gray-800">{content}</p>
    </div>
  );
};

export default ChatsBubble;
