import Icon from './Icon';

interface ICommunityItem {
  question: string;
  ago: string;
  user: {
    avatar: string;
    name: string;
  };
  wondering: {
    value: number;
    isWondered: boolean;
  };
  answer: {
    value: number;
    isAnswered: boolean;
    participater: {
      avatar: string;
    }[];
  };
}

const CommunityItem = ({
  question,
  ago,
  user,
  wondering,
  answer
}: ICommunityItem) => {
  return (
    <div className="space-y-2 border-t-2 border-gray-300 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-2">
          <span className="text-2xl text-orange-500">Q.</span>
          <h2>{question}</h2>
        </div>
        <span className="text-gray-500">{ago}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-3">
          <div className="flex space-x-2">
            <div
              className="h-6 w-6
          rounded-full bg-slate-400"
            />
            <span className="text-gray-500">{user.name}</span>
          </div>
          <span className="text-gray-400">│</span>
          <div className="flex items-center -space-x-2">
            {answer.participater.map((_value, participaterValue) => (
              <div
                key={participaterValue}
                className="h-6 w-6 rounded-full bg-slate-400"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-start space-x-2">
          <div className="flex items-center justify-start space-x-2">
            <Icon d="question" size={5} isHighlighted={wondering.isWondered} />
            <span>{wondering.value}</span>
          </div>
          <div className="flex items-center justify-start space-x-2">
            <Icon d="answer" size={5} isHighlighted={answer.isAnswered} />
            <span>{answer.value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityItem;
