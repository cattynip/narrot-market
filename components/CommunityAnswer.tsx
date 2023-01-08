import ActivityMarks from './ActivityMarks';
import ParticipaterList from './ParticipaterList';

interface ICommunityAnswer {
  user: {
    name: string;
    avatar: string;
  };
  ago: string;
  answer: string;
  liked: {
    value: number;
    isLiked: boolean;
  };
  helped: {
    value: number;
    isHelped: boolean;
  };
}

const CommunityAnswer = ({
  user,
  ago,
  answer,
  liked,
  helped
}: ICommunityAnswer) => {
  return (
    <div className="border-b-2 pt-4">
      <div className="flex items-center justify-between border-b-2 pb-3">
        <div className="flex items-center justify-start space-x-2">
          <div className="h-9 w-9 rounded-full bg-slate-400" />
          <span>{user.name}</span>
        </div>
        <span className="text-gray-500">{ago}</span>
      </div>
      <div className="border-b-2 pt-2.5 pl-1 pb-3">
        <p>{answer}</p>
      </div>
      <div className="flex items-center justify-between py-2">
        <ParticipaterList
          participaters={[
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
              type: 'like',
              value: liked.value,
              isHighlighted: liked.isLiked
            },
            {
              type: 'help',
              value: helped.value,
              isHighlighted: helped.isHelped
            }
          ]}
        />
      </div>
    </div>
  );
};

export default CommunityAnswer;
