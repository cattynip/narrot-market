interface CommunityAnswerProps {
  author: string;
  createdAtValue: number;
  createdAtType: string;
  answer: string;
}

const CommunityAnswer = ({
  author,
  createdAtValue,
  createdAtType,
  answer
}: CommunityAnswerProps) => {
  return (
    <div className="border-b-2">
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-400" />
          <div>
            <p className="text-sm font-medium">{author}</p>
            <p className="text-gray-500 text-xs">
              {createdAtValue} {createdAtType}
            </p>
          </div>
        </div>
      </div>
      <div className="px-12 py-2">{answer}</div>
    </div>
  );
};

export default CommunityAnswer;