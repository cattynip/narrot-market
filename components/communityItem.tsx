interface CommunityItemProps {
  type: string;
  question: string;
  author: string;
  curiouses: number;
  answers: number;
  createdAt: Date;
  id: number;
}

const CommunityItem = ({
  type,
  question,
  author,
  curiouses,
  answers,
  createdAt,
  id
}: CommunityItemProps) => {
  return (
    <a href={`/community/${id}`}>
      <div className="pt-3 border-b-2 border-b-gray-300 cursor-pointer">
        <div className="px-1.5 rounded-md w-fit bg-gray-300">
          <span className="text-xs">{type}</span>
        </div>
        <div className="py-3 space-x-1.5 flex items-center justify-start">
          <span className="text-orange-500 text-xl">Q.</span>
          <h3>{question}</h3>
        </div>
        <div className="flex justify-between items-center text-gray-500 text-sm  border-b-2 pb-1 px-1">
          <span>{author}</span>
          <span>{createdAt.toString()}</span>
        </div>
        <div className="flex justify-start space-x-5 items-center border-t-1 text-sm border-t-black py-2 px-1">
          <div className="flex justify-center items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="space-x-1">
              <span>궁금해요</span>
              <span>{curiouses}</span>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <div className="space-x-2">
              <span>답변</span>
              <span>{answers}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CommunityItem;
