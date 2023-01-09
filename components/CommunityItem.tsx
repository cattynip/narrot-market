import ActivityMarks from './ActivityMarks';
import ParticipaterList from './ParticipaterList';

interface ICommunityItem {
  question: string;
  ago: string;
  isFirst: boolean;
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
  isFirst,
  user,
  wondering,
  answer
}: ICommunityItem) => {
  return (
    <div
      className={`space-y-2 ${
        isFirst ? '-mt-5' : 'border-t-2 border-gray-300'
      } py-3`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-2">
          <span className="text-2xl text-orange-500">Q.</span>
          <h2>{question}</h2>
        </div>
        <span className="text-gray-500">{ago}</span>
      </div>
      <div className="flex items-center justify-between">
        <ParticipaterList
          mainUser={user}
          participaters={[
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' }
          ]}
        />
        <ActivityMarks
          activities={[
            {
              ...wondering,
              type: 'wondering',
              isMarked: wondering.isWondered
            },
            {
              ...answer,
              type: 'answer',
              isMarked: answer.isAnswered
            }
          ]}
        />
      </div>
    </div>
  );
};

export default CommunityItem;
